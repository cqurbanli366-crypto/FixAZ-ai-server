import 'package:flutter/material.dart';
import 'language_manager.dart';

class PaymentScreen extends StatefulWidget {
  final Map<String, dynamic> arguments;

  const PaymentScreen({super.key, required this.arguments});

  @override
  State<PaymentScreen> createState() => _PaymentScreenState();
}

class _PaymentScreenState extends State<PaymentScreen> {
  final _formKey = GlobalKey<FormState>();
  final _cardNumberController = TextEditingController();
  final _cardHolderController = TextEditingController();
  final _expiryDateController = TextEditingController();
  final _cvvController = TextEditingController();

  void _processPayment(LanguageManager lang) {
    if (_formKey.currentState!.validate()) {
      // Simulate payment processing
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (context) => const Center(child: CircularProgressIndicator(color: Color(0xFF00897B))),
      );

      Future.delayed(const Duration(seconds: 2), () {
        Navigator.pop(context); // Pop loading
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(lang.translate('payment_success')),
            backgroundColor: const Color(0xFF00897B),
          ),
        );
        Navigator.pop(context); // Return to orders
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final lang = LanguageManager.of(context);
    final amount = widget.arguments['amount'] ?? 30;
    final currency = widget.arguments['currency'] ?? 'AZN';

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: Text(lang.translate('payment'), style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF1A2A47))),
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: Color(0xFF1A2A47)),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Order Summary Card
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10)],
                ),
                child: Column(
                  children: [
                    _buildSummaryRow(lang.translate('handyman'), widget.arguments['handymanName'] ?? ''),
                    const Divider(height: 24),
                    _buildSummaryRow(lang.translate('service'), widget.arguments['serviceType'] ?? ''),
                    const Divider(height: 24),
                    _buildSummaryRow(lang.translate('date_time'), '${widget.arguments['date']} | ${widget.arguments['timeSlot']}'),
                  ],
                ),
              ),
              const SizedBox(height: 32),
              
              // Payment Fields
              _buildTextField(lang.translate('card_number'), _cardNumberController, '0000 0000 0000 0000', TextInputType.number, 19),
              _buildTextField(lang.translate('card_holder'), _cardHolderController, 'AD SOYAD', TextInputType.text, null),
              Row(
                children: [
                  Expanded(child: _buildTextField(lang.translate('expiry_date'), _expiryDateController, 'MM/YY', TextInputType.number, 5)),
                  const SizedBox(width: 16),
                  Expanded(child: _buildTextField(lang.translate('cvv'), _cvvController, '***', TextInputType.number, 3, obscureText: true)),
                ],
              ),
              
              const SizedBox(height: 32),
              
              // Total Amount
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(lang.translate('total_amount'), style: const TextStyle(fontSize: 16, color: Color(0xFFA0A0A0))),
                  Text('$amount $currency', style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Color(0xFF1A2A47))),
                ],
              ),
              
              const SizedBox(height: 40),
              
              // Actions
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: () => Navigator.pop(context),
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        side: const BorderSide(color: Color(0xFF1A2A47)),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                      child: Text(lang.translate('cancel'), style: const TextStyle(color: Color(0xFF1A2A47), fontWeight: FontWeight.bold)),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () => _processPayment(lang),
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        backgroundColor: const Color(0xFF00897B),
                        foregroundColor: Colors.white,
                        elevation: 0,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                      child: Text(lang.translate('confirm'), style: const TextStyle(fontWeight: FontWeight.bold)),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSummaryRow(String label, String value) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: const TextStyle(color: Color(0xFFA0A0A0))),
        Text(value, style: const TextStyle(fontWeight: FontWeight.w600, color: Color(0xFF1A2A47))),
      ],
    );
  }

  Widget _buildTextField(String label, TextEditingController controller, String hint, TextInputType inputType, int? maxLength, {bool obscureText = false}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Color(0xFF1A2A47))),
          const SizedBox(height: 8),
          TextFormField(
            controller: controller,
            keyboardType: inputType,
            maxLength: maxLength,
            obscureText: obscureText,
            decoration: InputDecoration(
              hintText: hint,
              counterText: '',
              filled: true,
              fillColor: Colors.white,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide(color: Colors.grey.shade200)),
              enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide(color: Colors.grey.shade200)),
              focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: Color(0xFF00897B))),
            ),
            validator: (value) {
              if (value == null || value.isEmpty) return '';
              return null;
            },
          ),
        ],
      ),
    );
  }
}
