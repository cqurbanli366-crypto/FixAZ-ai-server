import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'language_manager.dart';
import 'dart:io';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _phoneController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  
  String _nameDisplay = "Alex Johnson";
  String? _avatarPath;

  @override
  void initState() {
    super.initState();
    _loadProfileData();
  }

  Future<void> _loadProfileData() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _nameController.text = prefs.getString('fixaz_full_name') ?? "Alex Johnson";
      _phoneController.text = prefs.getString('fixaz_phone') ?? "+994 50 123 45 67";
      _nameDisplay = _nameController.text;
      _avatarPath = prefs.getString('fixaz_avatar');
    });
  }

  Future<void> _saveProfileData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('fixaz_full_name', _nameController.text);
    await prefs.setString('fixaz_phone', _phoneController.text);
    if (_avatarPath != null) {
      await prefs.setString('fixaz_avatar', _avatarPath!);
    }

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Məlumatlar yadda saxlandı"),
          backgroundColor: Color(0xFFFF9800),
          duration: Duration(milliseconds: 2500),
        ),
      );
      Navigator.pop(context);
    }
  }

  String _getInitials(String name) {
    if (name.isEmpty) return "??";
    List<String> words = name.trim().split(' ');
    String initials = words.map((w) => w.isNotEmpty ? w[0] : "").join('').toUpperCase();
    if (initials.length > 2) return initials.substring(0, 2);
    return initials;
  }

  Future<void> _pickImage() async {
    // Mocking image picker since we can't add native dependencies easily here
    // In a real app: final ImagePicker picker = ImagePicker();
    // final XFile? image = await picker.pickImage(source: ImageSource.gallery);
    // if (image != null) setState(() => _avatarPath = image.path);
    
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text("Şəkil seçimi funksiyası aktivləşdirilməlidir")),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF0F4F8),
      appBar: AppBar(
        title: const Text("Profil", style: TextStyle(color: Color(0xFF1A1A1A), fontWeight: FontWeight.bold)),
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Color(0xFF1A1A1A)),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              Card(
                color: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                elevation: 0,
                child: Padding(
                  padding: const EdgeInsets.all(28.0),
                  child: Column(
                    children: [
                      // Avatar Section
                      Center(
                        child: Stack(
                          children: [
                            CircleAvatar(
                              radius: 48,
                              backgroundColor: const Color(0xFFE8EEF5),
                              backgroundImage: _avatarPath != null ? FileImage(File(_avatarPath!)) : null,
                              child: _avatarPath == null 
                                ? Text(_getInitials(_nameDisplay), style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Color(0xFF1A1A1A)))
                                : null,
                            ),
                            Positioned(
                              bottom: 0,
                              right: 0,
                              child: GestureDetector(
                                onTap: _pickImage,
                                child: Container(
                                  width: 28,
                                  height: 28,
                                  decoration: const BoxDecoration(
                                    color: Color(0xFFFF9800),
                                    shape: BoxShape.circle,
                                  ),
                                  child: const Icon(Icons.add, color: Colors.white, size: 18),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 16),
                      Text(_nameDisplay, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700, color: Color(0xFF1A1A1A))),
                      const Text("Ev sahibi", style: TextStyle(fontSize: 14, color: Color(0xFF888888))),
                      const SizedBox(height: 32),
                      
                      // Form Fields
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            child: _buildTextField(
                              _nameController, 
                              "Tam Adınız", 
                              "Adınızı daxil edin", 
                              TextInputType.text,
                              onChanged: (val) => setState(() => _nameDisplay = val),
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: _buildTextField(
                              _phoneController, 
                              "Telefon Nömrəsi", 
                              "+994 50 123 45 67", 
                              TextInputType.phone,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),
                      _buildTextField(
                        _passwordController, 
                        "Yeni Şifrə", 
                        "Şifrəni dəyişmək üçün daxil edin", 
                        TextInputType.text,
                        obscureText: true,
                        optional: true,
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          children: [
            Expanded(
              child: OutlinedButton(
                onPressed: () => Navigator.pop(context),
                style: OutlinedButton.styleFrom(
                  backgroundColor: const Color(0xFFEEEEEE),
                  foregroundColor: const Color(0xFF1A1A1A),
                  side: BorderSide.none,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  minimumSize: const Size(0, 54),
                ),
                child: const Text("Ləğv et", style: TextStyle(fontWeight: FontWeight.w600)),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: ElevatedButton(
                onPressed: _saveProfileData,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFFF9800),
                  foregroundColor: Colors.white,
                  elevation: 0,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  minimumSize: const Size(0, 54),
                ),
                child: const Text("Yadda saxla", style: TextStyle(fontWeight: FontWeight.w600)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTextField(
    TextEditingController controller, 
    String label, 
    String hint, 
    TextInputType inputType, 
    {bool obscureText = false, bool optional = false, Function(String)? onChanged}
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Color(0xFF1A1A1A)),
        ),
        const SizedBox(height: 8),
        TextFormField(
          controller: controller,
          keyboardType: inputType,
          obscureText: obscureText,
          onChanged: onChanged,
          style: const TextStyle(color: Color(0xFF1A1A1A)),
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: const TextStyle(color: Color(0xFFAAAAAA)),
            filled: true,
            fillColor: Colors.white,
            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: const BorderSide(color: Color(0xFFE0E0E0)),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: const BorderSide(color: Color(0xFFFF9800)),
            ),
          ),
        ),
      ],
    );
  }

  @override
  void dispose() {
    _nameController.dispose();
    _phoneController.dispose();
    _passwordController.dispose();
    super.dispose();
  }
}
