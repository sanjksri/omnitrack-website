class TrackerSession {
  final String trackingId;
  final String passcode;
  final bool consentGiven;
  bool isTrackingRunning;
  double? lastLatitude;
  double? lastLongitude;
  DateTime? lastUpdated;

  TrackerSession({
    required this.trackingId,
    required this.passcode,
    required this.consentGiven,
    this.isTrackingRunning = false,
    this.lastLatitude,
    this.lastLongitude,
    this.lastUpdated,
  });

  String get formattedLocation {
    if (lastLatitude == null || lastLongitude == null) {
      return 'None';
    }
    final latDir = lastLatitude! >= 0 ? 'N' : 'S';
    final lonDir = lastLongitude! >= 0 ? 'E' : 'W';
    return '${lastLatitude!.abs().toStringAsFixed(4)}° $latDir, ${lastLongitude!.abs().toStringAsFixed(4)}° $lonDir';
  }

  String get formattedLastUpdated {
    if (lastUpdated == null) return 'None';
    final dt = lastUpdated!;
    return '${dt.day.toString().padLeft(2, '0')} ${_monthName(dt.month)} ${dt.year}, ${dt.hour.toString().padLeft(2, '0')}:${dt.minute.toString().padLeft(2, '0')}:${dt.second.toString().padLeft(2, '0')}';
  }

  static String _monthName(int month) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1];
  }
}
