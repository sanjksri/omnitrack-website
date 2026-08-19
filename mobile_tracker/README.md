# Device Tracking App (Version 1.0.3 Build 6)

Complete Flutter source code for the **Device Tracking App** designed to transmit GPS coordinates to Firebase Firestore (`fleetmonitor-2026`).

## 📱 Features

1. **Pixel-Perfect UI matching Screenshots**:
   - **Login Screen**: `Tracking ID`, `Passcode`, consent checkbox (*"I give my consent to track my location all time and disable battery optimisation"*), `Start Tracking` blue button, top-right `Exit` button, and website link (`www.easyomnitracker.in`).
   - **Paused Dashboard**: `Status: Paused`, Tracking ID card, last logged coordinates/timestamp, pause notification box, `Start Tracking` blue button, and `Logout` button.
   - **Running Dashboard**: `Status: Running`, live location coordinates, timestamp, blue background location notice, `Pause tracking` red button, and `Logout` button.

2. **Background Location Transmission**:
   - Uses `flutter_background_service` & `geolocator` with an Android Foreground Service notification.
   - Continuously transmits GPS location updates to Firebase Firestore even when the app is closed or removed from recent apps.
   - Automatically stops transmitting when `Pause tracking` or `Logout` is pressed.

3. **Firebase Firestore Database (`fleetmonitor-2026`)**:
   - Validates `Tracking ID` and `Passcode` against document `/trackers/{trackingId}` (e.g. `100000`, `100015`).
   - Updates `latitude`, `longitude`, `lastLocation`, `lastUpdated`, and `status` in `/trackers/{trackingId}`.
   - Reads sequence counter from `/counters/trackerSequence`.

---

## 🛠️ How to Build the APK

### Step 1: Firebase Configuration Setup
1. Go to your Firebase Console: [fleetmonitor-2026](https://console.firebase.google.com/project/fleetmonitor-2026)
2. Add an Android app with Package Name: `in.easyomnitracker.app`
3. Download `google-services.json` and place it in the `android/app/` folder:
   ```bash
   cp google-services.json mobile_tracker/android/app/
   ```

### Step 2: Build APK via Flutter CLI
Run the following command inside the `mobile_tracker` folder:
```bash
cd mobile_tracker
flutter pub get
flutter build apk --release
```

The compiled release APK will be generated at:
`mobile_tracker/build/app/outputs/flutter-apk/app-release.apk`

---

## 📁 Source Code Directory Structure

```
mobile_tracker/
├── pubspec.yaml                        # Package dependencies
├── android/
│   └── app/src/main/AndroidManifest.xml # Android background service & location permissions
├── lib/
│   ├── main.dart                       # App entry point & session router
│   ├── constants/
│   │   └── app_colors.dart             # Dark slate theme color tokens
│   ├── models/
│   │   └── tracker_session.dart        # Session state & coordinate formatting
│   ├── services/
│   │   ├── firebase_service.dart       # Firestore read/write operations
│   │   └── background_location_service.dart # Android Foreground Location Service
│   └── screens/
│       ├── login_screen.dart           # Opening screen UI
│       └── tracking_dashboard_screen.dart # Paused & Running dashboard UI
└── google-services.json.template       # Firebase config template
```
