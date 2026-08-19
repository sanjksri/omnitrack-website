import 'dart:async';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_background_service/flutter_background_service.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:geolocator/geolocator.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'firebase_service.dart';

class BackgroundLocationService {
  static const String notificationChannelId = 'easyomnitracker_service';
  static const int notificationId = 888;

  /// Initialize background location service
  static Future<void> initializeService() async {
    final service = FlutterBackgroundService();

    const AndroidNotificationChannel channel = AndroidNotificationChannel(
      notificationChannelId,
      'easyomnitracker Foreground Service',
      description: 'Continuous 30-second background location logging service',
      importance: Importance.low,
    );

    final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
        FlutterLocalNotificationsPlugin();

    await flutterLocalNotificationsPlugin
        .resolvePlatformSpecificImplementation<
            AndroidFlutterLocalNotificationsPlugin>()
        ?.createNotificationChannel(channel);

    await service.configure(
      androidConfiguration: AndroidConfiguration(
        onStart: onStart,
        autoStart: false,
        isForegroundMode: true,
        notificationChannelId: notificationChannelId,
        initialNotificationTitle: 'easyomnitracker Active',
        initialNotificationContent: 'GPS location tracking active (30s interval)',
        foregroundServiceNotificationId: notificationId,
      ),
      iosConfiguration: IosConfiguration(
        autoStart: false,
        onForeground: onStart,
        onBackground: onIosBackground,
      ),
    );
  }

  /// Start background location service
  static Future<void> startTracking() async {
    final service = FlutterBackgroundService();
    final isRunning = await service.isRunning();
    if (!isRunning) {
      await service.startService();
    }
  }

  /// Stop background location service
  static Future<void> stopTracking() async {
    final service = FlutterBackgroundService();
    final isRunning = await service.isRunning();
    if (isRunning) {
      service.invoke('stopService');
    }
  }

  @pragma('vm:entry-point')
  static Future<bool> onIosBackground(ServiceInstance service) async {
    WidgetsFlutterBinding.ensureInitialized();
    DartPluginRegistrant.ensureInitialized();
    return true;
  }

  @pragma('vm:entry-point')
  static void onStart(ServiceInstance service) async {
    DartPluginRegistrant.ensureInitialized();
    WidgetsFlutterBinding.ensureInitialized();

    final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
        FlutterLocalNotificationsPlugin();

    if (service is AndroidServiceInstance) {
      service.on('setAsForeground').listen((event) {
        service.setAsForegroundService();
      });

      service.on('setAsBackground').listen((event) {
        service.setAsBackgroundService();
      });
    }

    service.on('stopService').listen((event) {
      service.stopSelf();
    });

    Future<void> fetchAndPushLocation() async {
      final prefs = await SharedPreferences.getInstance();
      final trackingId = prefs.getString('trackingId');
      final passcode = prefs.getString('passcode') ?? '';
      final isLoggedOut = prefs.getBool('isLoggedOut') ?? false;
      final isPaused = prefs.getBool('isPaused') ?? false;

      if (isLoggedOut || isPaused || trackingId == null || trackingId.isEmpty) {
        service.stopSelf();
        return;
      }

      Position? position;

      try {
        position = await Geolocator.getCurrentPosition(
          desiredAccuracy: LocationAccuracy.high,
          timeLimit: const Duration(seconds: 8),
        );
      } catch (e) {
        debugPrint('getCurrentPosition timeout/error, falling back to lastKnownPosition: $e');
      }

      // Fallback to last known position if current position fetch timed out
      position ??= await Geolocator.getLastKnownPosition();

      if (position != null) {
        try {
          // Save latest coordinates in SharedPreferences
          await prefs.setDouble('lastLatitude', position.latitude);
          await prefs.setDouble('lastLongitude', position.longitude);
          await prefs.setString('lastUpdatedIso', DateTime.now().toIso8601String());

          // Transmit location payload to Firestore /locations/log-{trackingId}-{timestamp} every 30s
          await FirebaseService.pushLocation(
            trackingId: trackingId,
            passcode: passcode,
            latitude: position.latitude,
            longitude: position.longitude,
          );

          // Update foreground notification status
          if (service is AndroidServiceInstance) {
            flutterLocalNotificationsPlugin.show(
              notificationId,
              'easyomnitracker Active',
              'Transmitting location every 30s: ${position.latitude.toStringAsFixed(4)}°, ${position.longitude.toStringAsFixed(4)}°',
              const NotificationDetails(
                android: AndroidNotificationDetails(
                  notificationChannelId,
                  'easyomnitracker Foreground Service',
                  icon: 'ic_launcher',
                  ongoing: true,
                ),
              ),
            );
          }
        } catch (e) {
          debugPrint('Error pushing location to Firebase: $e');
        }
      }
    }

    // Execute immediately on service startup
    await fetchAndPushLocation();

    // Background timer to get and transmit location every 30 seconds
    Timer.periodic(const Duration(seconds: 30), (timer) async {
      final prefs = await SharedPreferences.getInstance();
      final isLoggedOut = prefs.getBool('isLoggedOut') ?? false;
      final isPaused = prefs.getBool('isPaused') ?? false;
      final trackingId = prefs.getString('trackingId');

      if (isLoggedOut || isPaused || trackingId == null || trackingId.isEmpty) {
        service.stopSelf();
        timer.cancel();
        return;
      }

      await fetchAndPushLocation();
    });
  }
}
