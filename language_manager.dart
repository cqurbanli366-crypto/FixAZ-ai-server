import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'translations.dart';

class LanguageManager extends StatefulWidget {
  final Widget child;
  const LanguageManager({super.key, required this.child});

  static _LanguageManagerState of(BuildContext context) {
    return context.findAncestorStateOfType<_LanguageManagerState>()!;
  }

  @override
  State<LanguageManager> createState() => _LanguageManagerState();
}

class _LanguageManagerState extends State<LanguageManager> {
  String _currentLanguage = 'az';

  String get currentLanguage => _currentLanguage;

  @override
  void initState() {
    super.initState();
    _loadLanguage();
  }

  Future<void> _loadLanguage() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _currentLanguage = prefs.getString('language_code') ?? 'az';
    });
  }

  Future<void> changeLanguage(String langCode) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('language_code', langCode);
    setState(() {
      _currentLanguage = langCode;
    });
  }

  String translate(String key) {
    return AppTranslations.translate(key, _currentLanguage);
  }

  void showLanguageBottomSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) {
        return Container(
          padding: const EdgeInsets.symmetric(vertical: 20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
                child: Text(
                  translate('select_language'),
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF1A2A47),
                  ),
                ),
              ),
              const Divider(),
              _buildLanguageItem(context, 'az', 'Azərbaycan dili', '🇦🇿'),
              _buildLanguageItem(context, 'en', 'English', '🇺🇸'),
              _buildLanguageItem(context, 'ru', 'Русский', '🇷🇺'),
              _buildLanguageItem(context, 'tr', 'Türkçe', '🇹🇷'),
            ],
          ),
        );
      },
    );
  }

  Widget _buildLanguageItem(BuildContext context, String code, String name, String flag) {
    final bool isSelected = _currentLanguage == code;
    return ListTile(
      leading: Text(flag, style: const TextStyle(fontSize: 24)),
      title: Text(
        name,
        style: TextStyle(
          color: isSelected ? const Color(0xFFF5821F) : const Color(0xFF1A2A47),
          fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
        ),
      ),
      trailing: isSelected ? const Icon(Icons.check_circle, color: Color(0xFFF5821F)) : null,
      onTap: () {
        changeLanguage(code);
        Navigator.pop(context);
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return widget.child;
  }
}
