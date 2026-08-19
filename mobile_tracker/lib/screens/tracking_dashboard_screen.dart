import 'dart:async';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';
import '../constants/app_colors.dart';
import '../models/tracker_session.dart';
import '../services/background_location_service.dart';
import '../services/firebase_service.dart';
import 'login_screen.dart';

class TrackingDashboardScreen extends StatefulWidget {
  final String trackingId;
  final String passcode;

  const TrackingDashboardScreen({
    Key? key,
    required this.trackingId,
    required this.passcode,
  }) : super(key: key);

  @override
  State<TrackingDashboardScreen> createState() => _TrackingDashboardScreenState();
}

class _TrackingDashboardScreenState extends State<TrackingDashboardScreen> {
  late TrackerSession _session;
  Timer? _uiRefreshTimer;

  @override
  void initState() {
    super.initState();
    _session = TrackerSession(
      trackingId: widget.trackingId,
      passcode: widget.passcode,
      consentGiven: true,
      isTrackingRunning: false,
    );

    _loadStoredState();

    // Refresh UI coordinates every 5 seconds
    _uiRefreshTimer = Timer.periodic(const Duration(seconds: 5), (_) {
      _refreshLocationData();
    });
  }

  @override
  void dispose() {
    _uiRefreshTimer?.cancel();
    super.dispose();
  }

  Future<void> _loadStoredState() async {
    final prefs = await SharedPreferences.getInstance();
    final isPaused = prefs.getBool('isPaused') ?? true;
    final lat = prefs.getDouble('lastLatitude');
    final lon = prefs.getDouble('lastLongitude');
    final lastUpdatedIso = prefs.getString('lastUpdatedIso');

    setState(() {
      _session.isTrackingRunning = !isPaused;
      _session.lastLatitude = lat;
      _session.lastLongitude = lon;
      if (lastUpdatedIso != null) {
        _session.lastUpdated = DateTime.tryParse(lastUpdatedIso);
      }
    });

    if (!_session.isTrackingRunning) {
      _refreshLocationData();
    }
  }

  Future<void> _refreshLocationData() async {
    final prefs = await SharedPreferences.getInstance();
    final lat = prefs.getDouble('lastLatitude');
    final lon = prefs.getDouble('lastLongitude');
    final lastUpdatedIso = prefs.getString('lastUpdatedIso');

    if (lat != null && lon != null) {
      setState(() {
        _session.lastLatitude = lat;
        _session.lastLongitude = lon;
        if (lastUpdatedIso != null) {
          _session.lastUpdated = DateTime.tryParse(lastUpdatedIso);
        }
      });
    }
  }

  Future<void> _toggleTracking() async {
    final prefs = await SharedPreferences.getInstance();

    if (_session.isTrackingRunning) {
      // Pause tracking
      await BackgroundLocationService.stopTracking();
      await prefs.setBool('isPaused', true);
      await FirebaseService.updateStatus(
        trackingId: widget.trackingId,
        passcode: widget.passcode,
        status: 'Paused',
      );

      setState(() {
        _session.isTrackingRunning = false;
      });
    } else {
      // Start tracking
      await prefs.setBool('isPaused', false);
      await prefs.setBool('isLoggedOut', false);
      await BackgroundLocationService.startTracking();
      await FirebaseService.updateStatus(
        trackingId: widget.trackingId,
        passcode: widget.passcode,
        status: 'Running',
      );

      setState(() {
        _session.isTrackingRunning = true;
      });

      // Get immediate current position to transmit and update display
      try {
        final position = await Geolocator.getCurrentPosition(
          desiredAccuracy: LocationAccuracy.high,
        );
        await prefs.setDouble('lastLatitude', position.latitude);
        await prefs.setDouble('lastLongitude', position.longitude);
        await prefs.setString('lastUpdatedIso', DateTime.now().toIso8601String());

        setState(() {
          _session.lastLatitude = position.latitude;
          _session.lastLongitude = position.longitude;
          _session.lastUpdated = DateTime.now();
        });

        await FirebaseService.pushLocation(
          trackingId: widget.trackingId,
          passcode: widget.passcode,
          latitude: position.latitude,
          longitude: position.longitude,
        );
      } catch (e) {
        debugPrint('Error getting initial position: $e');
      }
    }
  }

  Future<void> _handleLogout() async {
    // Stop background location service
    await BackgroundLocationService.stopTracking();

    // Clear session state
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('isLoggedOut', true);
    await prefs.setBool('isPaused', true);
    await prefs.remove('trackingId');
    await prefs.remove('passcode');

    await FirebaseService.updateStatus(
      trackingId: widget.trackingId,
      passcode: widget.passcode,
      status: 'Logged Out',
    );

    if (!mounted) return;

    // Return to Login screen
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(builder: (_) => const LoginScreen()),
    );
  }

  Future<void> _launchWebsite() async {
    final uri = Uri.parse('https://www.easyomnitracker.in');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isRunning = _session.isTrackingRunning;

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
            child: Container(
              constraints: const BoxConstraints(maxWidth: 400),
              decoration: BoxDecoration(
                color: AppColors.cardBackground,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.border.withOpacity(0.5)),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.4),
                    blurRadius: 20,
                    offset: const Offset(0, 10),
                  ),
                ],
              ),
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Header Row with Logout Button
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Image.asset(
                        'assets/logo.png',
                        height: 36,
                        errorBuilder: (context, error, stackTrace) => const Icon(
                          Icons.location_on,
                          color: AppColors.primaryBlue,
                          size: 32,
                        ),
                      ),
                      OutlinedButton.icon(
                        onPressed: _handleLogout,
                        style: OutlinedButton.styleFrom(
                          foregroundColor: AppColors.logoutOrange,
                          side: const BorderSide(color: AppColors.logoutOrange, width: 1.2),
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        icon: const Icon(Icons.logout, size: 16, color: AppColors.logoutOrange),
                        label: const Text(
                          'Logout',
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w600,
                            color: AppColors.logoutOrange,
                          ),
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 12),

                  // Header Title
                  const Text(
                    'Device tracking app',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'Version 1.0.3 (Build 6)',
                    style: TextStyle(
                      fontSize: 13,
                      color: AppColors.textSecondary,
                    ),
                  ),

                  const SizedBox(height: 20),

                  // Status Badge Card
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                    decoration: BoxDecoration(
                      color: AppColors.innerBox,
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: AppColors.border.withOpacity(0.4)),
                    ),
                    child: Row(
                      children: [
                        Container(
                          width: 12,
                          height: 12,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: isRunning ? AppColors.statusRunning : AppColors.statusPaused,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Text(
                          'Status: ${isRunning ? 'Running' : 'Paused'}',
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: AppColors.textPrimary,
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Tracking Info Card (ID, Location, Update Time)
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppColors.innerBox,
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: AppColors.border.withOpacity(0.4)),
                    ),
                    child: Column(
                      children: [
                        // Tracking ID
                        _buildInfoRow(
                          icon: Icons.badge_outlined,
                          iconColor: AppColors.primaryBlue,
                          label: 'Tracking ID:',
                          value: _session.trackingId,
                        ),
                        const Divider(color: AppColors.border, height: 24),

                        // Last Logged Location
                        _buildInfoRow(
                          icon: Icons.location_on,
                          iconColor: AppColors.primaryBlue,
                          label: 'Last Logged Location:',
                          value: _session.formattedLocation,
                        ),
                        const Divider(color: AppColors.border, height: 24),

                        // Last Update Time
                        _buildInfoRow(
                          icon: Icons.access_time,
                          iconColor: AppColors.primaryBlue,
                          label: 'Last Update Time:',
                          value: _session.formattedLastUpdated,
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Info Notice Box
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppColors.infoBoxBg.withOpacity(0.6),
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: AppColors.infoBoxBorder),
                    ),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Icon(
                          Icons.info_outline,
                          color: AppColors.infoBoxIcon,
                          size: 20,
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                isRunning
                                    ? 'The app will keep logging your location in the background every 30 seconds even if closed.'
                                    : 'Location tracking is currently paused.',
                                style: const TextStyle(
                                  fontSize: 13,
                                  color: AppColors.textPrimary,
                                  height: 1.4,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                isRunning
                                    ? 'To pause logging, click "Pause tracking" or logout.'
                                    : 'To resume tracking, click "Start Tracking".',
                                style: const TextStyle(
                                  fontSize: 13,
                                  color: AppColors.textSecondary,
                                  height: 1.4,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 24),

                  // Start Tracking / Pause Tracking Action Button
                  SizedBox(
                    height: 50,
                    child: ElevatedButton(
                      onPressed: _toggleTracking,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: isRunning ? AppColors.pauseRed : AppColors.primaryBlue,
                        foregroundColor: Colors.white,
                        elevation: 0,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      child: Text(
                        isRunning ? 'Pause tracking' : 'Start Tracking',
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 24),

                  // Footer Link
                  GestureDetector(
                    onTap: _launchWebsite,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: const [
                        Icon(Icons.language, size: 18, color: AppColors.primaryBlue),
                        SizedBox(width: 8),
                        Text(
                          'www.easyomnitracker.in',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                            color: AppColors.primaryBlue,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildInfoRow({
    required IconData icon,
    required Color iconColor,
    required String label,
    required String value,
  }) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(icon, color: iconColor, size: 20),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: const TextStyle(
                  fontSize: 13,
                  color: AppColors.textSecondary,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                value,
                style: const TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.bold,
                  color: AppColors.textPrimary,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
