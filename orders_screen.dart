import 'package:flutter/material.dart';
import 'language_manager.dart';

class OrdersScreen extends StatelessWidget {
  const OrdersScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final lang = LanguageManager.of(context);

    // Mock order data based on user request
    final orders = [
      {
        'orderId': 'ORD-2026-001',
        'handymanName': 'İlkin',
        'serviceType': 'Elektrik',
        'date': '25 Mart',
        'timeSlot': '12:00 - 16:00',
        'amount': 30,
        'currency': 'AZN',
        'status': 'pending'
      },
      {
        'orderId': 'ORD-2026-002',
        'handymanName': 'Anar',
        'serviceType': 'Santexnik',
        'date': '26 Mart',
        'timeSlot': '10:00 - 14:00',
        'amount': 45,
        'currency': 'AZN',
        'status': 'completed'
      }
    ];

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: Text(lang.translate('orders'), style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF1A2A47))),
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: Color(0xFF1A2A47)),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(24),
        itemCount: orders.length,
        itemBuilder: (context, index) {
          final order = orders[index];
          return Container(
            margin: const EdgeInsets.only(bottom: 16),
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10)],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(order['orderId'] as String, style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF1A2A47))),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                      decoration: BoxDecoration(
                        color: order['status'] == 'pending' ? Colors.orange.shade50 : Colors.green.shade50,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        order['status'] as String,
                        style: TextStyle(
                          color: order['status'] == 'pending' ? Colors.orange : Colors.green,
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                _buildInfoRow(Icons.person_rounded, order['handymanName'] as String),
                const SizedBox(height: 8),
                _buildInfoRow(Icons.build_rounded, order['serviceType'] as String),
                const SizedBox(height: 8),
                _buildInfoRow(Icons.calendar_today_rounded, '${order['date']} | ${order['timeSlot']}'),
                const Divider(height: 32),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('${order['amount']} ${order['currency']}', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF1A2A47))),
                    if (order['status'] == 'pending')
                      ElevatedButton(
                        onPressed: () {
                          Navigator.pushNamed(
                            context,
                            '/payment',
                            arguments: {
                              'orderId': order['orderId'],
                              'handymanName': order['handymanName'],
                              'serviceType': order['serviceType'],
                              'date': order['date'],
                              'timeSlot': order['timeSlot'],
                              'amount': order['amount'],
                              'currency': order['currency'],
                            },
                          );
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFFF5821F),
                          foregroundColor: Colors.white,
                          elevation: 0,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        ),
                        child: Text(lang.translate('pay_now')),
                      ),
                  ],
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildInfoRow(IconData icon, String text) {
    return Row(
      children: [
        Icon(icon, size: 16, color: const Color(0xFFA0A0A0)),
        const SizedBox(width: 8),
        Text(text, style: const TextStyle(color: Color(0xFF1A2A47))),
      ],
    );
  }
}
