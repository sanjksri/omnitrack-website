import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';

class FirebaseService {
  static final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  /// Ensure Firebase is initialized
  static Future<void> initialize() async {
    try {
      await Firebase.initializeApp();
    } catch (e) {
      debugPrint('Firebase initialization note: $e');
    }
  }

  /// Send crash report directly to Firebase Firestore collection /crash_reports
  static Future<void> logCrashReport({
    required String error,
    required String stackTrace,
    String trackingId = 'unknown',
  }) async {
    try {
      final nowMs = DateTime.now().millisecondsSinceEpoch;
      final docId = 'crash-$nowMs';
      final payload = {
        'crashId': docId,
        'trackingId': trackingId,
        'error': error,
        'stackTrace': stackTrace,
        'timestamp': nowMs,
        'createdAtIso': DateTime.now().toIso8601String(),
        'appVersion': '1.0.3 (Build 6)',
        'platform': defaultTargetPlatform.toString(),
      };

      await _firestore.collection('crash_reports').doc(docId).set(payload);

      if (trackingId != 'unknown' && trackingId.isNotEmpty) {
        await _firestore
            .collection('trackers')
            .doc(trackingId)
            .collection('crash_reports')
            .doc(docId)
            .set(payload);
      }
      debugPrint('Crash report sent to Firebase Firestore: $docId');
    } catch (e) {
      debugPrint('Error sending crash report to Firebase: $e');
    }
  }

  /// Verify driver login against Firestore /trackers/{trackingId}
  static Future<Map<String, dynamic>> loginDriver({
    required String trackingId,
    required String passcode,
  }) async {
    final cleanId = trackingId.trim();
    final cleanPass = passcode.trim();

    if (cleanId.isEmpty || cleanPass.isEmpty) {
      return {'success': false, 'message': 'Please enter both Tracking ID and Passcode.'};
    }

    try {
      final docRef = _firestore.collection('trackers').doc(cleanId);
      final docSnap = await docRef.get();

      if (!docSnap.exists) {
        return {'success': false, 'message': 'Invalid Tracking ID or Passcode.'};
      }

      final data = docSnap.data();
      if (data == null) {
        return {'success': false, 'message': 'Invalid Tracking ID or Passcode.'};
      }

      final storedPasscode = data['passcode']?.toString() ?? '';
      final isActive = data['isActive'] == true || data['isActive'] == null;
      final expiresAt = data['expiresAt'] is num ? (data['expiresAt'] as num).toInt() : null;
      final now = DateTime.now().millisecondsSinceEpoch;

      if (storedPasscode != cleanPass) {
        return {'success': false, 'message': 'Invalid Tracking ID or Passcode.'};
      }

      if (!isActive) {
        return {'success': false, 'message': 'This tracker is currently inactive.'};
      }

      if (expiresAt != null && now > expiresAt) {
        return {'success': false, 'message': 'Tracker subscription has expired.'};
      }

      return {'success': true, 'message': 'Login successful'};
    } catch (e, stack) {
      debugPrint('Error verifying driver login in Firestore: $e');
      logCrashReport(error: e.toString(), stackTrace: stack.toString(), trackingId: cleanId);
      return {'success': false, 'message': 'Unable to connect to database. Check network.'};
    }
  }

  /// Transmit location update every 30s matching app.easyomnitracker.in/driver logic
  static Future<bool> pushLocation({
    required String trackingId,
    required String passcode,
    required double latitude,
    required double longitude,
  }) async {
    final cleanId = trackingId.trim();
    final cleanPass = passcode.trim();
    if (cleanId.isEmpty) return false;

    try {
      final trackerDoc = _firestore.collection('trackers').doc(cleanId);
      final docSnap = await trackerDoc.get();

      if (docSnap.exists) {
        final data = docSnap.data();
        if (data != null) {
          final storedPasscode = data['passcode']?.toString() ?? '';
          final isActive = data['isActive'] == true || data['isActive'] == null;
          if (storedPasscode != cleanPass || !isActive) {
            return false;
          }
        }
      }

      final nowMs = DateTime.now().millisecondsSinceEpoch;
      final logId = 'log-$cleanId-$nowMs';

      await trackerDoc.set({
        'trackingId': cleanId,
        'passcode': cleanPass,
        'lastActiveAt': nowMs,
        'status': 'Running',
        'latitude': latitude,
        'longitude': longitude,
        'lastUpdated': FieldValue.serverTimestamp(),
      }, SetOptions(merge: true));

      await _firestore.collection('locations').doc(logId).set({
        'logId': logId,
        'trackingId': cleanId,
        'lat': latitude,
        'lng': longitude,
        'timestamp': nowMs,
      });

      return true;
    } catch (e, stack) {
      debugPrint('Error pushing location to Firestore: $e');
      logCrashReport(error: e.toString(), stackTrace: stack.toString(), trackingId: cleanId);
      return false;
    }
  }

  /// Update tracker status ('Paused' or 'Running')
  static Future<void> updateStatus({
    required String trackingId,
    required String passcode,
    required String status,
  }) async {
    final cleanId = trackingId.trim();
    if (cleanId.isEmpty) return;

    try {
      await _firestore.collection('trackers').doc(cleanId).set({
        'trackingId': cleanId,
        'status': status,
        'lastActiveAt': DateTime.now().millisecondsSinceEpoch,
      }, SetOptions(merge: true));
    } catch (e, stack) {
      debugPrint('Error updating status in Firestore: $e');
      logCrashReport(error: e.toString(), stackTrace: stack.toString(), trackingId: cleanId);
    }
  }
}
