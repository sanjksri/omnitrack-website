import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:geolocator/geolocator.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';
import '../constants/app_colors.dart';
import '../services/background_location_service.dart';
import '../services/firebase_service.dart';
import 'tracking_dashboard_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _trackingIdController = TextEditingController();
  final _passcodeController = TextEditingController();
  bool _consentGiven = false;
  bool _isLoading = false;
  String? _errorMessage;

  Future<void> _handleStartTracking() async {
    setState(() {
      _errorMessage = null;
    });

    final trackingId = _trackingIdController.text.trim();
    final passcode = _passcodeController.text.trim();

    if (trackingId.isEmpty || passcode.isEmpty) {
      setState(() {
        _errorMessage = 'Please enter both Tracking ID and Passcode.';
      });
      return;
    }

    if (!_consentGiven) {
      setState(() {
        _errorMessage = 'Please check the consent box to proceed.';
      });
      return;
    }

    setState(() {
      _isLoading = true;
    });

    // Request Location Permissions
    final locationStatus = await Permission.location.request();
    if (locationStatus.isDenied || locationStatus.isPermanentlyDenied) {
      setState(() {
        _isLoading = false;
        _errorMessage = 'Location permission is required for device tracking.';
      });
      return;
    }

    if (await Permission.locationAlways.isDenied) {
      await Permission.locationAlways.request();
    }

    // Request Ignore Battery Optimizations to prevent Android Doze mode throttling
    if (await Permission.ignoreBatteryOptimizations.isDenied) {
      await Permission.ignoreBatteryOptimizations.request();
    }

    // Verify Tracking ID and Passcode combination in Firestore /trackers/{trackingId}
    final loginResult = await FirebaseService.loginDriver(
      trackingId: trackingId,
      passcode: passcode,
    );

    if (loginResult['success'] != true) {
      setState(() {
        _isLoading = false;
        _errorMessage = loginResult['message'] ?? 'Invalid Tracking ID or Passcode.';
      });
      return;
    }

    // Store persistent session and activate tracking immediately
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('trackingId', trackingId);
    await prefs.setString('passcode', passcode);
    await prefs.setBool('consentGiven', true);
    await prefs.setBool('isLoggedOut', false);
    await prefs.setBool('isPaused', false); // MUST be false to run location service

    // Start background tracking service
    await BackgroundLocationService.startTracking();
    await FirebaseService.updateStatus(
      trackingId: trackingId,
      passcode: passcode,
      status: 'Running',
    );

    // Capture initial position and push to Firestore immediately
    try {
      Position? position;
      try {
        position = await Geolocator.getCurrentPosition(
          desiredAccuracy: LocationAccuracy.high,
          timeLimit: const Duration(seconds: 8),
        );
      } catch (_) {}
      position ??= await Geolocator.getLastKnownPosition();

      if (position != null) {
        await prefs.setDouble('lastLatitude', position.latitude);
        await prefs.setDouble('lastLongitude', position.longitude);
        await prefs.setString('lastUpdatedIso', DateTime.now().toIso8601String());

        await FirebaseService.pushLocation(
          trackingId: trackingId,
          passcode: passcode,
          latitude: position.latitude,
          longitude: position.longitude,
        );
      }
    } catch (e) {
      debugPrint('Initial position push note: $e');
    }

    setState(() {
      _isLoading = false;
    });

    if (!mounted) return;

    // Navigate to Tracking Dashboard
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(
        builder: (_) => TrackingDashboardScreen(
          trackingId: trackingId,
          passcode: passcode,
        ),
      ),
    );
  }

  void _handleExit() {
    SystemNavigator.pop();
  }

  Future<void> _launchWebsite() async {
    final uri = Uri.parse('https://www.easyomnitracker.in');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
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
                  // Exit Button Top Right
                  Align(
                    alignment: Alignment.centerRight,
                    child: OutlinedButton.icon(
                      onPressed: _handleExit,
                      style: OutlinedButton.styleFrom(
                        foregroundColor: AppColors.exitRed,
                        side: const BorderSide(color: AppColors.exitRed, width: 1.2),
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      icon: const Icon(Icons.exit_to_app, size: 16, color: AppColors.exitRed),
                      label: const Text(
                        'Exit',
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w600,
                          color: AppColors.exitRed,
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 8),

                  // App Logo & Header
                  Center(
                    child: Column(
                      children: [
                        Image.asset(
                          'assets/logo.png',
                          height: 70,
                          errorBuilder: (context, error, stackTrace) => Container(
                            height: 60,
                            width: 60,
                            decoration: const BoxDecoration(
                              shape: BoxShape.circle,
                              color: AppColors.primaryBlue,
                            ),
                            child: const Icon(Icons.location_on, color: Colors.white, size: 36),
                          ),
                        ),
                        const SizedBox(height: 12),
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
                      ],
                    ),
                  ),

                  const SizedBox(height: 16),

                  const Text(
                    'Enter your credentials to begin transmitting GPS coordinates.',
                    style: TextStyle(
                      fontSize: 14,
                      color: AppColors.textSecondary,
                      height: 1.4,
                    ),
                  ),

                  const SizedBox(height: 24),

                  // Tracking ID Field
                  TextField(
                    controller: _trackingIdController,
                    keyboardType: TextInputType.number,
                    style: const TextStyle(color: AppColors.textPrimary, fontSize: 15),
                    decoration: InputDecoration(
                      hintText: 'TRACKING ID',
                      hintStyle: const TextStyle(color: AppColors.textMuted, fontSize: 14, letterSpacing: 1),
                      filled: true,
                      fillColor: AppColors.inputBg,
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: const BorderSide(color: AppColors.border),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: const BorderSide(color: AppColors.border),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: const BorderSide(color: AppColors.primaryBlue, width: 1.5),
                      ),
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Passcode Field
                  TextField(
                    controller: _passcodeController,
                    obscureText: true,
                    style: const TextStyle(color: AppColors.textPrimary, fontSize: 15),
                    decoration: InputDecoration(
                      hintText: 'PASSCODE',
                      hintStyle: const TextStyle(color: AppColors.textMuted, fontSize: 14, letterSpacing: 1),
                      filled: true,
                      fillColor: AppColors.inputBg,
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: const BorderSide(color: AppColors.border),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: const BorderSide(color: AppColors.border),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: const BorderSide(color: AppColors.primaryBlue, width: 1.5),
                      ),
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Consent Checkbox
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(
                        height: 24,
                        width: 24,
                        child: Checkbox(
                          value: _consentGiven,
                          onChanged: (val) {
                            setState(() {
                              _consentGiven = val ?? false;
                            });
                          },
                          activeColor: AppColors.primaryBlue,
                          side: const BorderSide(color: AppColors.textMuted, width: 1.5),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(4),
                          ),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: GestureDetector(
                          onTap: () {
                            setState(() {
                              _consentGiven = !_consentGiven;
                            });
                          },
                          child: const Text(
                            'I give my consent to track my location all time and disable battery optimisation',
                            style: TextStyle(
                              fontSize: 13,
                              color: AppColors.textSecondary,
                              height: 1.4,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),

                  if (_errorMessage != null) ...[
                    const SizedBox(height: 16),
                    Text(
                      _errorMessage!,
                      style: const TextStyle(
                        color: AppColors.pauseRed,
                        fontSize: 13,
                        fontWeight: FontWeight.w500,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ],

                  const SizedBox(height: 24),

                  // Start Tracking Button
                  SizedBox(
                    height: 50,
                    child: ElevatedButton(
                      onPressed: _isLoading ? null : _handleStartTracking,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primaryBlue,
                        foregroundColor: Colors.white,
                        elevation: 0,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      child: _isLoading
                          ? const SizedBox(
                              width: 20,
                              height: 20,
                              child: CircularProgressIndicator(
                                strokeWidth: 2,
                                color: Colors.white,
                              ),
                            )
                          : const Text(
                              'Start Tracking',
                              style: TextStyle(
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
}
