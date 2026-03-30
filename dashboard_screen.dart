import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'profile_screen.dart';
import 'settings_screen.dart';
import 'orders_screen.dart';
import 'language_manager.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  String _userName = 'Kamran Abbasov';

  @override
  void initState() {
    super.initState();
    _loadUserData();
  }

  Future<void> _loadUserData() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _userName = prefs.getString('name') ?? 'Kamran Abbasov';
    });
  }

  @override
  Widget build(BuildContext context) {
    bool isDesktop = MediaQuery.of(context).size.width > 900;
    final lang = LanguageManager.of(context);

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      drawer: !isDesktop ? AppSidebar(userName: _userName, onProfileUpdate: _loadUserData) : null,
      body: Row(
        children: [
          if (isDesktop) AppSidebar(userName: _userName, onProfileUpdate: _loadUserData),
          Expanded(
            child: Column(
              children: [
                AppHeader(userName: _userName),
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.all(24.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const WelcomeSection(),
                        const SizedBox(height: 32),
                        const CategoriesGrid(),
                        const SizedBox(height: 40),
                        const TopRatedProsSection(),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class AppSidebar extends StatelessWidget {
  final String userName;
  final VoidCallback onProfileUpdate;

  const AppSidebar({
    super.key,
    required this.userName,
    required this.onProfileUpdate,
  });

  @override
  Widget build(BuildContext context) {
    final lang = LanguageManager.of(context);

    return Container(
      width: 280,
      color: Colors.white,
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(
                lang.translate('app_title'),
                style: const TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w900,
                  color: Color(0xFF1A2A47),
                  letterSpacing: -1.5,
                ),
              ),
            ],
          ),
          const SizedBox(height: 48),
          Text(lang.translate('welcome_back'), style: const TextStyle(color: Color(0xFFA0A0A0))),
          Text(userName, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF1A2A47))),
          const SizedBox(height: 32),
          _buildMenuItem(context, Icons.dashboard_rounded, lang.translate('home'), true),
          _buildMenuItem(context, Icons.person_rounded, lang.translate('profile'), false, onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const ProfileScreen()),
            ).then((_) => onProfileUpdate());
          }),
          _buildMenuItem(context, Icons.history_rounded, lang.translate('orders'), false, onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const OrdersScreen()),
            );
          }),
          _buildMenuItem(context, Icons.wallet_rounded, lang.translate('balance'), false),
          _buildMenuItem(context, Icons.settings_rounded, lang.translate('settings'), false, onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const SettingsScreen()),
            ).then((_) => onProfileUpdate());
          }),
          _buildMenuItem(context, Icons.language_rounded, lang.translate('language'), false, onTap: () {
            lang.showLanguageBottomSheet(context);
          }),
          const Spacer(),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(0xFF1A2A47),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(lang.translate('current_balance'), style: const TextStyle(color: Colors.white70, fontSize: 12)),
                const Text('1,240 AZN', style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFF5821F),
                    foregroundColor: Colors.white,
                    elevation: 0,
                    minimumSize: const Size(double.infinity, 40),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: Text(lang.translate('top_up')),
                )
              ],
            ),
          )
        ],
      ),
    );
  }

  Widget _buildMenuItem(BuildContext context, IconData icon, String title, bool active, {VoidCallback? onTap}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: Icon(icon, color: active ? const Color(0xFFF5821F) : const Color(0xFFA0A0A0)),
        title: Text(title, style: TextStyle(color: active ? const Color(0xFF1A2A47) : const Color(0xFFA0A0A0), fontWeight: active ? FontWeight.bold : FontWeight.normal)),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        tileColor: active ? const Color(0xFFF5821F).withOpacity(0.1) : null,
        onTap: onTap ?? () {},
      ),
    );
  }
}

class AppHeader extends StatelessWidget {
  final String userName;
  const AppHeader({super.key, required this.userName});

  @override
  Widget build(BuildContext context) {
    final lang = LanguageManager.of(context);

    return Container(
      height: 80,
      color: Colors.white,
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              decoration: InputDecoration(
                hintText: lang.translate('search_hint'),
                prefixIcon: const Icon(Icons.search, color: Color(0xFFA0A0A0)),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                filled: true,
                fillColor: const Color(0xFFF1F5F9),
              ),
            ),
          ),
          const SizedBox(width: 16),
          IconButton(onPressed: () {}, icon: const Icon(Icons.notifications_none_rounded, color: Color(0xFF1A2A47))),
          const SizedBox(width: 8),
          Text(
            userName,
            style: const TextStyle(
              color: Color(0xFF1A2A47),
              fontWeight: FontWeight.w600,
              fontSize: 14,
            ),
          ),
          const SizedBox(width: 12),
          CircleAvatar(
            backgroundImage: NetworkImage('https://api.dicebear.com/7.x/avataaars/svg?seed=$userName'),
          ),
        ],
      ),
    );
  }
}

class CategoriesGrid extends StatelessWidget {
  const CategoriesGrid({super.key});

  @override
  Widget build(BuildContext context) {
    final lang = LanguageManager.of(context);
    final categories = [
      {'name': lang.translate('category_electric'), 'icon': Icons.electrical_services},
      {'name': lang.translate('category_plumbing'), 'icon': Icons.plumbing},
      {'name': lang.translate('category_paint'), 'icon': Icons.format_paint},
      {'name': lang.translate('category_laminate'), 'icon': Icons.layers},
      {'name': lang.translate('category_ac'), 'icon': Icons.ac_unit},
      {'name': lang.translate('category_furniture'), 'icon': Icons.chair},
      {'name': lang.translate('category_cleaning'), 'icon': Icons.cleaning_services},
      {'name': lang.translate('category_boiler'), 'icon': Icons.hot_tub},
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(lang.translate('categories'), style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF1A2A47))),
        const SizedBox(height: 16),
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 4,
            crossAxisSpacing: 16,
            mainAxisSpacing: 16,
          ),
          itemCount: categories.length,
          itemBuilder: (context, index) {
            return Card(
              elevation: 0,
              color: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: Colors.grey.shade200)),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(categories[index]['icon'] as IconData, color: const Color(0xFFF5821F), size: 32),
                  const SizedBox(height: 8),
                  Text(categories[index]['name'] as String, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Color(0xFF1A2A47))),
                ],
              ),
            );
          },
        ),
      ],
    );
  }
}

class WelcomeSection extends StatelessWidget {
  const WelcomeSection({super.key});

  @override
  Widget build(BuildContext context) {
    final lang = LanguageManager.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(lang.translate('help_today'), style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold, letterSpacing: -1, color: Color(0xFF1A2A47))),
        Text(lang.translate('pros_available'), style: const TextStyle(color: Color(0xFFA0A0A0))),
      ],
    );
  }
}

class TopRatedProsSection extends StatelessWidget {
  const TopRatedProsSection({super.key});

  @override
  Widget build(BuildContext context) {
    final lang = LanguageManager.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(lang.translate('top_rated'), style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        const SizedBox(height: 16),
      ],
    );
  }
}
