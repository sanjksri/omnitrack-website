import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'constants/app_colors.dart';
import 'screens/login_screen.dart';
import 'screens/tracking_dashboard_screen.dart';
import 'services/background_location_service.dart';
import 'services/firebase_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Setup Global Crash Exception Logger to send all errors to Firebase Firestore
  FlutterError.onError = (FlutterErrorDetails details) {
    FlutterError.presentError(details);
    FirebaseService.logCrashReport(
      error: details.exceptionAsString(),
      stackTrace: details.stack?.toString() ?? '',
    );
  };

  PlatformDispatcher.instance.onError = (error, stack) {
    FirebaseService.logCrashReport(
      error: error.toString(),
      stackTrace: stack.toString(),
    );
    return true;
  };

  // Initialize Firebase and Background Services
  await FirebaseService.initialize();
  await BackgroundLocationService.initializeService();

  // Read stored session
  final prefs = await SharedPreferences.getInstance();
  final storedTrackingId = prefs.getString('trackingId');
  final storedPasscode = prefs.getString('passcode');
  final isLoggedOut = prefs.getBool('isLoggedOut') ?? false;

  final bool isLoggedIn = storedTrackingId != null &&
      storedTrackingId.isNotEmpty &&
      storedPasscode != null &&
      !isLoggedOut;

  runApp(EasyOmniTrackerApp(
    isLoggedIn: isLoggedIn,
    trackingId: storedTrackingId ?? '',
    passcode: storedPasscode ?? '',
  ));
}

class EasyOmniTrackerApp extends StatelessWidget {
  final bool isLoggedIn;
  final String trackingId;
  final String passcode;

  const EasyOmniTrackerApp({
    Key? key,
    required this.isLoggedIn,
    required this.trackingId,
    required this.passcode,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'easyomnitracker',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: AppColors.background,
        primaryColor: AppColors.primaryBlue,
        colorScheme: const ColorScheme.dark(
          primary: AppColors.primaryBlue,
          surface: AppColors.cardBackground,
          background: AppColors.background,
        ),
      ),
      home: isLoggedIn
          ? TrackingDashboardScreen(
              trackingId: trackingId,
              passcode: passcode,
            )
          : const LoginScreen(),
    );
  }
}
