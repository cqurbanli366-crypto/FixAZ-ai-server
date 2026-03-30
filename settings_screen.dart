import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'language_manager.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool _notificationsEnabled = true;

  @override
  void initState() {
    super.initState();
    _loadSettings();
  }

  Future<void> _loadSettings() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _notificationsEnabled = prefs.getBool('notifications_enabled') ?? true;
    });
  }

  Future<void> _toggleNotifications(bool value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('notifications_enabled', value);
    setState(() {
      _notificationsEnabled = value;
    });
  }

  @override
  Widget build(BuildContext context) {
    final lang = LanguageManager.of(context);

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: Text(
          lang.translate('settings'),
          style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF1A2A47)),
        ),
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: Color(0xFF1A2A47)),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.05),
                    blurRadius: 10,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Column(
                children: [
                  _buildSettingItem(
                    context,
                    icon: Icons.language_rounded,
                    iconColor: const Color(0xFF3B82F6),
                    title: lang.translate('language'),
                    subtitle: _getLanguageName(lang.currentLanguage),
                    onTap: () => lang.showLanguageBottomSheet(context),
                  ),
                  const Divider(height: 1, indent: 64),
                  _buildToggleItem(
                    icon: Icons.notifications_rounded,
                    iconColor: const Color(0xFFEA580C),
                    title: lang.translate('notifications'),
                    subtitle: _notificationsEnabled ? lang.translate('active') : lang.translate('inactive'),
                    value: _notificationsEnabled,
                    onChanged: _toggleNotifications,
                  ),
                  const Divider(height: 1, indent: 64),
                  _buildSettingItem(
                    context,
                    icon: Icons.privacy_tip_rounded,
                    iconColor: const Color(0xFF14B8A6),
                    title: lang.translate('privacy'),
                    subtitle: lang.translate('account_security'),
                    onTap: () {
                      // Action for privacy
                    },
                  ),
                  const Divider(height: 1, indent: 64),
                  _buildSettingItem(
                    context,
                    icon: Icons.support_agent_rounded,
                    iconColor: const Color(0xFFDC2626),
                    title: lang.translate('support'),
                    subtitle: lang.translate('contact_us'),
                    onTap: () {
                      // Action for support
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),
            _buildLogoutButton(lang),
          ],
        ),
      ),
    );
  }

  String _getLanguageName(String code) {
    switch (code) {
      case 'az':
        return 'Azərbaycan dili';
      case 'en':
        return 'English';
      case 'ru':
        return 'Русский';
      case 'tr':
        return 'Türkçe';
      default:
        return 'Azərbaycan dili';
    }
  }

  Widget _buildSettingItem(
    BuildContext context, {
    required IconData icon,
    required Color iconColor,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    return ListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
      leading: Container(
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: iconColor.withOpacity(0.1),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Icon(icon, color: iconColor),
      ),
      title: Text(
        title,
        style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF1A2A47)),
      ),
      subtitle: Text(
        subtitle,
        style: const TextStyle(color: Color(0xFFA0A0A0), fontSize: 13),
      ),
      trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 16, color: Color(0xFFA0A0A0)),
      onTap: onTap,
    );
  }

  Widget _buildToggleItem({
    required IconData icon,
    required Color iconColor,
    required String title,
    required String subtitle,
    required bool value,
    required Function(bool) onChanged,
  }) {
    return ListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
      leading: Container(
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: iconColor.withOpacity(0.1),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Icon(icon, color: iconColor),
      ),
      title: Text(
        title,
        style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF1A2A47)),
      ),
      subtitle: Text(
        subtitle,
        style: const TextStyle(color: Color(0xFFA0A0A0), fontSize: 13),
      ),
      trailing: Switch(
        value: value,
        onChanged: onChanged,
        activeColor: const Color(0xFFF5821F),
      ),
    );
  }

  Widget _buildLogoutButton(LanguageManager lang) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        leading: Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: const Color(0xFFDC2626).withOpacity(0.1),
            borderRadius: BorderRadius.circular(12),
          ),
          child: const Icon(Icons.logout_rounded, color: Color(0xFFDC2626)),
        ),
        title: Text(
          lang.translate('logout'),
          style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFFDC2626)),
        ),
        onTap: () {
          // Action for logout
        },
      ),
    );
  }
}
