import 'package:flutter/material.dart';

class AppColors {
  // Slate Dark Theme matching screenshots
  static const Color background = Color(0xFF0E131F); // Dark slate outer background
  static const Color cardBackground = Color(0xFF182032); // Inner card container
  static const Color innerBox = Color(0xFF111726); // Text fields and sub-containers
  
  // Status & Buttons
  static const Color primaryBlue = Color(0xFF3B82F6); // Start Tracking button
  static const Color primaryBlueHover = Color(0xFF2563EB);
  static const Color pauseRed = Color(0xFFEF4444); // Pause tracking button
  static const Color pauseRedHover = Color(0xFFDC2626);
  static const Color logoutOrange = Color(0xFFD97706); // Logout button text/border
  static const Color exitRed = Color(0xFFDC2626); // Exit button

  // Status Indicators
  static const Color statusPaused = Color(0xFFF59E0B); // Amber / Orange dot
  static const Color statusRunning = Color(0xFF10B981); // Emerald / Green dot

  // Text & Icons
  static const Color textPrimary = Color(0xFFF9FAFB);
  static const Color textSecondary = Color(0xFF9CA3AF);
  static const Color textMuted = Color(0xFF6B7280);
  
  // Info Notice Card (Blue outline container)
  static const Color infoBoxBg = Color(0xFF1E293B);
  static const Color infoBoxBorder = Color(0xFF334155);
  static const Color infoBoxIcon = Color(0xFF3B82F6);

  // Border & Inputs
  static const Color border = Color(0xFF374151);
  static const Color inputBg = Color(0xFF1F2937);
}
