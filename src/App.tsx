import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  ChevronRight,
  Hammer,
  LayoutDashboard,
  ShoppingBag,
  Wallet,
  Settings,
  Menu,
  Plus,
  Bell,
  HelpCircle,
  MapPin,
  User as UserIcon,
  X,
  LogOut,
  Wrench,
  Droplets,
  Paintbrush,
  Layers,
  Wind,
  DoorOpen,
  Armchair,
  Box,
  Trash2,
  Flame,
  Home,
  Grid,
  AirVent,
  Flower2,
  Truck,
  Mail,
  Phone,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Clock,
  ChevronLeft,
  ClipboardList,
  ArrowUpCircle,
  ArrowDownCircle,
  CreditCard,
  Lock as LockIcon,
  Globe as GlobeIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data from Request
const mockData = [
  { id: 1, fullName: "Kamil", categoryId: "c2", profession: "Santexnik", rating: 4.8, price: "40 AZN", image: "/kamil.png" },
  { id: 2, fullName: "İlkin", categoryId: "c1", profession: "Elektrik", rating: 4.9, price: "30 AZN", image: "/elektrik.png" },
  { id: 3, fullName: "Rüfət", categoryId: "c3", profession: "Boya", rating: 4.7, price: "25 AZN", image: "/rəng.png" },
  { id: 4, fullName: "Rüstəm", categoryId: "c4", profession: "Laminat", rating: 4.6, price: "35 AZN", image: "/ev_üçün_laminat_202603250203.png" },
  { id: 5, fullName: "Azər", categoryId: "c5", profession: "Kondisioner", rating: 4.9, price: "50 AZN", image: "/ev_üçün_kondisoner_202603250206.png" },
  { id: 6, fullName: "Emil", categoryId: "c7", profession: "Qapı pəncərə", rating: 4.5, price: "45 AZN", image: "/qapı_pəncərə_üçün_202603250316.png" },
  { id: 7, fullName: "Nihat", categoryId: "c6", profession: "Mebel", rating: 4.8, price: "60 AZN", image: "/yaşlı.png" },
  { id: 8, fullName: "Orxan", categoryId: "c8", profession: "Alçıpan", rating: 4.7, price: "55 AZN", image: "/alçıpan_üçün_usta_202603250317.png" },
  { id: 9, fullName: "Tofiq", categoryId: "c6", profession: "Mebel", rating: 4.0, price: "20 AZN", image: "/gənc.png" },
  { id: 10, fullName: "Elşən", categoryId: "c1", profession: "Elektrik", rating: 4.2, price: "15 AZN", image: "/ev_ustası_elektrik_202603250247.png" },
  { id: 11, fullName: "Emil", categoryId: "c2", profession: "Santexnik", rating: 4.1, price: "15 AZN", image: "/santexnik_ustası_daha_202603250250.png" }
];

const allCategories = [
  { id: "c1", name: "Elektrik", icon: <Wrench className="w-6 h-6" /> },
  { id: "c2", name: "Santexnik", icon: <Droplets className="w-6 h-6" /> },
  { id: "c3", name: "Boya", icon: <Paintbrush className="w-6 h-6" /> },
  { id: "c4", name: "Laminat", icon: <Layers className="w-6 h-6" /> },
  { id: "c5", name: "Kondisioner", icon: <Wind className="w-6 h-6" /> },
  { id: "c6", name: "Qapı pəncərə", icon: <DoorOpen className="w-6 h-6" /> },
  { id: "c7", name: "Mebel", icon: <Armchair className="w-6 h-6" /> },
  { id: "c8", name: "Alçıpan", icon: <Grid className="w-6 h-6" /> },
  { id: "c9", name: "Digər", icon: <Plus className="w-6 h-6" /> },
];

type Screen = 'login' | 'register' | 'dashboard' | 'profile' | 'search' | 'create_order' | 'payment' | 'otp' | 'payment_success' | 'professional_profile' | 'orders' | 'wallet' | 'forgot_password' | 'otp_verification' | 'reset_password' | 'settings';

interface Order {
  id: string;
  handyman: any;
  date: string;
  time: string;
  price: string;
  status: 'Ödəniş gözlənilir' | 'Tamamlanıb' | 'Ödənildi';
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedHandyman, setSelectedHandyman] = useState<any>(null);
  const [globalOrders, setGlobalOrders] = useState<Order[]>([]);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [recoveryError, setRecoveryError] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regError, setRegError] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [userBalance, setUserBalance] = useState(1240.00);
  const [rememberMe, setRememberMe] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('10.00');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handlePayOrder = (order: Order) => {
    const price = parseFloat(order.price.replace(' AZN', ''));
    if (userBalance >= price) {
      setUserBalance(prev => prev - price);
      setGlobalOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'Ödənildi' } : o));
      showToast('Ödəniş uğurla tamamlandı!', 'success');
    } else {
      showToast('Balansınız kifayət deyil. Zəhmət olmasa balansı artırın.', 'error');
      setCurrentScreen('payment');
      setPaymentAmount(price.toFixed(2));
    }
  };

  const categories = showAllCategories ? allCategories : allCategories.slice(0, 8);

  const filteredHandymen = mockData.filter(h => {
    const matchesCategory = selectedCategoryId ? h.categoryId === selectedCategoryId : true;
    const matchesSearch = h.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         h.profession.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (currentScreen === 'wallet') {
    const transactions = [
      { id: 1, title: "Balans artırımı", date: "Bu gün, 14:30", amount: "+10.00 AZN", isPositive: true },
      { id: 2, title: "Santexnik Kamil - Ödəniş", date: "Dünən, 10:15", amount: "-40.00 AZN", isPositive: false },
      { id: 3, title: "Boya ustası Rüfət - Ödəniş", date: "20 Mart, 16:45", amount: "-25.00 AZN", isPositive: false }
    ];

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentScreen('dashboard')}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-slate-600" />
            </button>
            <h1 className="text-xl font-bold text-slate-900">Pul Kisəsi</h1>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 max-w-4xl mx-auto w-full space-y-8">
          {/* Balance Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden"
          >
            <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-slate-400 text-sm font-medium">Cari Balans</p>
                  <h2 className="text-4xl lg:text-5xl font-black tracking-tight">{userBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} AZN</h2>
                </div>
                <CreditCard className="w-10 h-10 text-white/20" />
              </div>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setCurrentScreen('payment')}
                  className="flex-1 bg-secondary text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-orange-900/20"
                >
                  <Plus className="w-5 h-5" /> Balansı Artır
                </button>
                <button 
                  onClick={() => alert('Çıxarış funksiyası tezliklə aktiv olacaq.')}
                  className="flex-1 bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
                >
                  <ArrowUpCircle className="w-5 h-5" /> Çıxarış
                </button>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary/20 rounded-full blur-[80px]"></div>
            <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-teal-500/10 rounded-full blur-[60px]"></div>
          </motion.div>

          {/* Transactions List */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 px-2">Son Əməliyyatlar</h3>
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              {transactions.map((tx, index) => (
                <div 
                  key={tx.id}
                  className={`flex items-center justify-between p-6 hover:bg-slate-50 transition-colors ${index !== transactions.length - 1 ? 'border-b border-slate-50' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.isPositive ? 'bg-teal-50 text-teal-600' : 'bg-red-50 text-red-600'}`}>
                      {tx.isPositive ? <ArrowDownCircle className="w-6 h-6" /> : <ArrowUpCircle className="w-6 h-6" />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{tx.title}</p>
                      <p className="text-xs text-slate-400">{tx.date}</p>
                    </div>
                  </div>
                  <span className={`font-black ${tx.isPositive ? 'text-teal-600' : 'text-red-600'}`}>
                    {tx.amount}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (currentScreen === 'orders') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative">
        {/* Custom Confirmation Dialog */}
        <AnimatePresence>
          {orderToCancel && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl space-y-6"
              >
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">Sifarişi Ləğv Et</h3>
                  <p className="text-slate-500">Bu sifarişi ləğv etmək istədiyinizə əminsiniz?</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setOrderToCancel(null)}
                    className="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
                  >
                    Xeyr
                  </button>
                  <button 
                    onClick={() => {
                      setGlobalOrders(globalOrders.filter(o => o.id !== (orderToCancel as any)));
                      setOrderToCancel(null);
                      showToast('Sifariş ləğv edildi.', 'success');
                    }}
                    className="flex-1 py-3 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition-all"
                  >
                    Bəli, Ləğv Et
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {toast && <Toast message={toast.message} type={toast.type} />}
        </AnimatePresence>

        <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentScreen('dashboard')}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-slate-600" />
            </button>
            <h1 className="text-xl font-bold text-slate-900">Sifarişlərim</h1>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 max-w-4xl mx-auto w-full">
          {globalOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4 text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                <ClipboardList className="w-12 h-12" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Hələ heç bir sifarişiniz yoxdur.</h2>
              <p className="text-slate-500 max-w-xs">Xidmət kataloqundan usta seçərək ilk sifarişinizi yerləşdirin.</p>
              <button 
                onClick={() => setCurrentScreen('search')}
                className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all"
              >
                Usta Axtar
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {globalOrders.map((order) => (
                <motion.div 
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-6 rounded-3xl shadow-md border border-slate-100 flex flex-col md:flex-row gap-6 items-center"
                >
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={order.handyman.image} alt={order.handyman.fullName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-center md:text-left space-y-1">
                    <h3 className="text-lg font-bold text-slate-900">{order.handyman.fullName}</h3>
                    <p className="text-secondary text-sm font-semibold">{order.handyman.profession}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-slate-500 pt-2">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {order.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {order.time}</span>
                      <span className="font-bold text-slate-900">{order.price}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
                    <span className={`px-4 py-1 text-xs font-bold rounded-full border ${
                      order.status === 'Ödənildi' 
                        ? 'bg-teal-50 text-teal-600 border-teal-100' 
                        : 'bg-orange-50 text-orange-600 border-orange-100'
                    }`}>
                      {order.status}
                    </span>
                    <div className="flex gap-2 w-full md:w-auto">
                      <button 
                        onClick={() => setOrderToCancel(order.id)}
                        className="flex-1 md:flex-none border border-red-500 text-red-500 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-red-50 transition-all"
                      >
                        Ləğv et
                      </button>
                      {order.status !== 'Ödənildi' && (
                        <button 
                          onClick={() => handlePayOrder(order)}
                          className="flex-1 md:flex-none bg-teal-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-100"
                        >
                          Ödəniş Et
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    );
  }

  if (currentScreen === 'professional_profile') {
    if (!selectedHandyman) {
      setCurrentScreen('dashboard');
      return null;
    }
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentScreen('search')}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-slate-600" />
            </button>
            <img 
              src="/fixaz_logo.png" 
              alt="FixAz Logo" 
              className="h-10 w-auto" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-primary transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button 
              onClick={() => setCurrentScreen('profile')}
              className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden"
            >
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                alt="Profile" 
                referrerPolicy="no-referrer"
              />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 max-w-5xl mx-auto w-full space-y-8">
          {/* Hero Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 h-64 md:h-auto relative">
                <img 
                  src={selectedHandyman.image} 
                  alt={selectedHandyman.fullName} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 md:w-2/3 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 text-[10px] font-bold uppercase tracking-wider rounded-lg">Lisenziyalı Mütəxəssis</span>
                  <span className="px-3 py-1 bg-orange-50 text-orange-700 text-[10px] font-bold uppercase tracking-wider rounded-lg">Təcrübəli</span>
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900">{selectedHandyman.fullName}</h2>
                  <p className="text-secondary font-bold">{selectedHandyman.profession}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                    <span className="text-sm font-bold text-slate-900">{selectedHandyman.rating}</span>
                  </div>
                  <span className="text-sm text-slate-400">(120+ rəy)</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <section className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-teal-600 space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Təcrübə Haqqında</h3>
                <p className="text-slate-600 leading-relaxed">
                  10 ildən artıq təcrübəyə malik peşəkar mütəxəssis. Bütün növ {selectedHandyman.profession.toLowerCase()} işlərini yüksək keyfiyyətlə və zəmanətlə yerinə yetirirəm. Müştəri məmnuniyyəti mənim üçün əsas prioritetdir.
                </p>
              </section>

              {/* Reviews Section */}
              <section className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Son Müştəri Rəyləri</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="min-w-[300px] bg-white p-6 rounded-2xl shadow-md border border-slate-50 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-100"></div>
                          <span className="text-sm font-bold">Müştəri {i}</span>
                        </div>
                        <div className="flex text-amber-500">
                          {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-current" />)}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 italic">"Çox razı qaldım, işini vaxtında və təmiz gördü. Hər kəsə tövsiyə edirəm!"</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Booking Form */}
            <div className="space-y-8">
              <section className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6 sticky top-28">
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-black text-slate-900">{selectedHandyman.price}</span>
                  <span className="text-slate-400 text-sm mb-1">/ saat</span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tarix seçin</label>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                      {['B.e', 'Ç.a', 'Ç.', 'C.a', 'C.', 'Ş.', 'B.'].map((day, i) => (
                        <button key={i} className={`min-w-[50px] p-3 rounded-xl border text-center transition-all ${i === 0 ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-600 border-slate-200 hover:border-teal-600'}`}>
                          <p className="text-[10px] font-bold">{day}</p>
                          <p className="text-sm font-black">{25 + i}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Üstünlük verilən vaxt</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <select className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-teal-600 bg-white appearance-none">
                        <option>Səhər (08:00 - 12:00)</option>
                        <option selected>Günorta (12:00 - 16:00)</option>
                        <option>Axşam (16:00 - 20:00)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Xidmət ünvanı</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input 
                        type="text" 
                        placeholder="Küçə ünvanını daxil edin"
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-teal-600" 
                      />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    const newOrder: Order = {
                      id: Math.random().toString(36).substr(2, 9),
                      handyman: selectedHandyman,
                      date: "25 Mart",
                      time: "12:00 - 16:00",
                      price: selectedHandyman.price,
                      status: 'Ödəniş gözlənilir'
                    };
                    setGlobalOrders([...globalOrders, newOrder]);
                    alert(`${selectedHandyman.fullName} ustaya sifariş sorğunuz göndərildi!`);
                    setCurrentScreen('dashboard');
                  }}
                  className="w-full bg-[#004D40] text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 group"
                >
                  Ustaya Sifariş Ver <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600" /> fixAz Zəmanəti: Bu mütəxəssis yoxlanılıb.
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (currentScreen === 'payment_success') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
              className="flex justify-center"
            >
              <CheckCircle2 className="w-32 h-32 text-teal-600" />
            </motion.div>
            <h2 className="text-3xl font-extrabold text-primary">Ödəniş Uğurludur!</h2>
            <p className="text-slate-500">Balansınız uğurla artırıldı.</p>
          </div>

          <div className="bg-slate-50 rounded-3xl p-6 space-y-4 border border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Ödənilən məbləğ</span>
              <span className="text-lg font-bold text-teal-600">{paymentAmount} AZN</span>
            </div>
            <div className="h-px bg-slate-200 border-dashed border-t"></div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Tarix</span>
              <span className="text-sm font-semibold text-slate-700">Bu gün, 14:30</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Əməliyyat nömrəsi</span>
              <span className="text-sm font-semibold text-slate-700">#TRX-987654</span>
            </div>
          </div>

          <button 
            onClick={() => setCurrentScreen('dashboard')}
            className="w-full bg-secondary text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-orange-200"
          >
            Ana Səhifəyə Qayıt
          </button>
        </motion.div>
      </div>
    );
  }

  if (currentScreen === 'otp') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentScreen('payment')}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-slate-600" />
            </button>
            <h1 className="text-xl font-bold text-slate-900">Təsdiqləmə</h1>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-xl w-full max-w-md text-center space-y-8"
          >
            <div className="space-y-4">
              <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-3xl flex items-center justify-center mx-auto">
                <Mail className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">OTP Kodu Daxil Edin</h2>
              <p className="text-slate-500 text-sm">Təhlükəsizlik üçün nömrənizə göndərilən 4 rəqəmli təsdiq kodunu daxil edin.</p>
            </div>

            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4].map((i) => (
                <input 
                  key={i}
                  type="text" 
                  maxLength={1}
                  className="w-14 h-16 text-center text-2xl font-bold rounded-2xl border-2 border-slate-100 focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all"
                />
              ))}
            </div>

            <div className="space-y-6">
              <p className="text-sm text-slate-500">
                Kodu almadınız? <button className="text-primary font-bold hover:underline">Yenidən göndər (00:59)</button>
              </p>
              <button 
                onClick={() => {
                  const amount = parseFloat(paymentAmount);
                  if (!isNaN(amount) && amount > 0) {
                    setUserBalance(prev => prev + amount);
                    setCurrentScreen('payment_success');
                  } else {
                    alert('Zəhmət olmasa düzgün məbləğ daxil edin.');
                  }
                }}
                className="w-full bg-secondary text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-orange-200"
              >
                Təsdiqlə və Ödə
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  if (currentScreen === 'payment') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentScreen('dashboard')}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-slate-600" />
            </button>
            <h1 className="text-xl font-bold text-slate-900">Ödəniş</h1>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-2xl space-y-8"
          >
            {/* Illustration */}
            <div className="flex justify-center">
              <div className="w-64 h-48 bg-orange-50 rounded-3xl flex items-center justify-center overflow-hidden">
                <img 
                  src="https://img.freepik.com/free-vector/online-payment-concept-illustration_114360-639.jpg" 
                  alt="Payment Illustration" 
                  className="w-full h-full object-contain p-4"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Kart nömrəsi</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="1234 5678 9012 3456"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Müddət (MM/İİ)</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="12/26"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">CVV</label>
                  <div className="relative">
                    <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="password" 
                      placeholder="123"
                      maxLength={3}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Məbləğ (AZN)</label>
                <div className="relative">
                  <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="number" 
                    placeholder="10.00"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary" 
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-secondary focus:ring-secondary" />
                <label className="text-sm font-medium text-slate-600">Kartı yadda saxla</label>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <button 
                onClick={() => setCurrentScreen('otp')}
                className="w-full bg-secondary text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-orange-200"
              >
                Pul əlavə et / Artır
              </button>
              <button 
                onClick={() => alert('PayPal ödəniş sistemi tezliklə əlavə olunacaq!')}
                className="w-full text-slate-500 font-bold text-sm hover:text-primary transition-colors"
              >
                Və ya PayPal ilə əlavə et
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  if (currentScreen === 'create_order') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentScreen('dashboard')}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-slate-600" />
            </button>
            <h1 className="text-xl font-bold text-slate-900">Yeni Sifariş Yarat</h1>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-2xl space-y-8"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Xidmət Kateqoriyası</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary bg-white"
                >
                  <option value="">Kateqoriya seçin</option>
                  {allCategories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                  <option value="Digər">Digər</option>
                </select>
              </div>

              {selectedCategory === 'Digər' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2"
                >
                  <label className="text-sm font-bold text-slate-700">Zəhmət olmasa, xidməti qeyd edin</label>
                  <div className="relative">
                    <Hammer className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Məs: Kombi təmiri, Televizor quraşdırılması..."
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary" 
                      required
                    />
                  </div>
                </motion.div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Ünvan</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Məs: Bakı ş., Nizami r-nu, ev 45"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Problemin təsviri</label>
                <textarea 
                  rows={4}
                  placeholder="Ustanın nə etməli olduğunu qısaca yazın..."
                  className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary resize-none"
                ></textarea>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => setCurrentScreen('dashboard')}
                className="flex-1 bg-slate-100 text-slate-900 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all"
              >
                Ləğv et
              </button>
              <button 
                onClick={() => {
                  alert('Sifarişiniz uğurla yaradıldı!');
                  setCurrentScreen('dashboard');
                }}
                className="flex-1 bg-secondary text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-orange-200"
              >
                Sifarişi Təsdiqlə
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  if (currentScreen === 'search') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center gap-4 sticky top-0 z-50">
          <button 
            onClick={() => {
              setCurrentScreen('dashboard');
              setSearchQuery('');
            }}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              autoFocus
              type="text" 
              placeholder="Usta adı və ya peşə yazın..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-100 border-none outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
            />
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {filteredHandymen.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredHandymen.map((handyman) => (
                <motion.div 
                  key={handyman.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => {
                    setSelectedHandyman(handyman);
                    setCurrentScreen('professional_profile');
                  }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 group cursor-pointer"
                >
                  <div className="h-48 relative">
                    <img 
                      src={handyman.image} 
                      alt={handyman.fullName} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                      <span className="text-xs font-bold text-slate-900">{handyman.rating}</span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-secondary text-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                      {handyman.price}
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <div>
                      <p className="text-secondary text-[10px] font-bold uppercase tracking-widest mb-0.5">{handyman.profession}</p>
                      <h4 className="text-lg font-bold text-slate-900">{handyman.fullName}</h4>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5" /> Bakı
                      </div>
                      <button className="w-8 h-8 bg-secondary/10 text-secondary rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-all">
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 opacity-40" />
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-slate-600">Heç nə tapılmadı.</p>
                <p className="text-sm">Fərqli açar sözlərlə yenidən yoxlayın.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  if (currentScreen === 'login') {
    const handleLogin = () => {
      if (!loginEmail || !loginPassword) {
        setLoginError('Zəhmət olmasa, bütün xanaları doldurun!');
        return;
      }

      if (loginEmail === 'kamranabbasov480@gmail.com' && loginPassword === '1234') {
        setLoginError('');
        setLoginEmail('');
        setLoginPassword('');
        setCurrentScreen('dashboard');
      } else {
        setLoginError('Email və ya şifrə yanlışdır!');
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md space-y-8"
        >
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/fixaz_logo.png" 
                alt="FixAz Logo" 
                className="h-28 w-auto" 
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-muted-foreground">Təmir işləriniz üçün daxil olun.</p>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="email" 
                placeholder="Email ünvanı" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary" 
              />
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Şifrə" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary" 
              />
            </div>
            
            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div 
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${rememberMe ? 'bg-teal-600 border-teal-600' : 'border-slate-300 group-hover:border-teal-600'}`}
                >
                  {rememberMe && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className="text-sm text-slate-600 font-medium">Məni xatırla</span>
              </label>
            </div>

            {loginError && (
              <p className="text-red-500 text-sm font-bold text-center">{loginError}</p>
            )}

            <button 
              onClick={handleLogin} 
              className="w-full bg-secondary text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-orange-200"
            >
              Giriş
            </button>
            <div className="flex flex-col items-center gap-2">
              <button 
                onClick={() => setCurrentScreen('register')}
                className="text-teal-600 font-bold text-sm hover:underline"
              >
                Yeni hesab yaratmaq
              </button>
              <button 
                onClick={() => setCurrentScreen('forgot_password')}
                className="text-primary font-semibold text-sm hover:underline"
              >
                Şifrəni unutmusunuz?
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (currentScreen === 'forgot_password') {
    const handleSend = () => {
      if (recoveryEmail === 'kamranabbasov480@gmail.com') {
        setRecoveryError('');
        setCurrentScreen('otp_verification');
      } else {
        setRecoveryError('Zəhmət olmasa, düzgün email daxil edin.');
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md space-y-8"
        >
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/fixaz_logo.png" 
                alt="FixAz Logo" 
                className="h-20 w-auto" 
                referrerPolicy="no-referrer"
              />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Şifrəni bərpa et</h2>
            <p className="text-muted-foreground text-sm">Email ünvanınızı daxil edin.</p>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="email" 
                placeholder="Email ünvanı" 
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary" 
              />
            </div>
            {recoveryError && <p className="text-red-500 text-xs font-bold">{recoveryError}</p>}
            <button 
              onClick={handleSend}
              className="w-full bg-secondary text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-orange-200"
            >
              Göndər
            </button>
            <button 
              onClick={() => setCurrentScreen('login')}
              className="w-full text-slate-500 font-bold text-sm hover:text-primary transition-colors"
            >
              Geri qayıt
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (currentScreen === 'otp_verification') {
    const handleVerify = () => {
      if (otpCode.join('') === '1234') {
        setRecoveryError('');
        setCurrentScreen('reset_password');
      } else {
        setRecoveryError('Kod yanlışdır, yenidən yoxlayın.');
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md space-y-8"
        >
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/fixaz_logo.png" 
                alt="FixAz Logo" 
                className="h-20 w-auto" 
                referrerPolicy="no-referrer"
              />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Kodu daxil edin</h2>
            <p className="text-muted-foreground text-sm">Emailinizə göndərilən 4 rəqəmli kodu daxil edin.</p>
          </div>
          <div className="space-y-6">
            <div className="flex justify-center gap-4">
              {otpCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otpCode];
                    newOtp[index] = e.target.value;
                    setOtpCode(newOtp);
                    if (e.target.value && index < 3) {
                      const inputs = document.querySelectorAll('input[type="text"]');
                      (inputs[index + 1] as HTMLInputElement)?.focus();
                    }
                  }}
                  className="w-14 h-14 text-center text-2xl font-bold rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary"
                />
              ))}
            </div>
            {recoveryError && <p className="text-red-500 text-center text-xs font-bold">{recoveryError}</p>}
            <button 
              onClick={handleVerify}
              className="w-full bg-secondary text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-orange-200"
            >
              Təsdiqlə
            </button>
            <button 
              onClick={() => setCurrentScreen('forgot_password')}
              className="w-full text-slate-500 font-bold text-sm hover:text-primary transition-colors"
            >
              Yenidən göndər
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (currentScreen === 'reset_password') {
    const handleReset = () => {
      if (newPassword === confirmPassword && newPassword.length >= 6) {
        setRecoveryError('');
        alert('Təbrik edirik! Şifrəniz uğurla dəyişdirildi.');
        setCurrentScreen('login');
      } else if (newPassword.length < 6) {
        setRecoveryError('Şifrə ən azı 6 simvoldan ibarət olmalıdır.');
      } else {
        setRecoveryError('Şifrələr uyğun gəlmir.');
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md space-y-8"
        >
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/fixaz_logo.png" 
                alt="FixAz Logo" 
                className="h-20 w-auto" 
                referrerPolicy="no-referrer"
              />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Yeni şifrə təyin edin</h2>
            <p className="text-muted-foreground text-sm">Yeni şifrənizi daxil edin və təsdiqləyin.</p>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <input 
                type="password" 
                placeholder="Yeni şifrə" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary" 
              />
            </div>
            <div className="relative">
              <input 
                type="password" 
                placeholder="Şifrəni təsdiqlə" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary" 
              />
            </div>
            {recoveryError && <p className="text-red-500 text-xs font-bold">{recoveryError}</p>}
            <button 
              onClick={handleReset}
              className="w-full bg-secondary text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-orange-200"
            >
              Şifrəni Yenilə
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (currentScreen === 'register') {
    const handleRegister = () => {
      if (regEmail && regPhone && regAddress && regPassword) {
        setRegError('');
        alert('Qeydiyyat uğurla tamamlandı! İndi daxil ola bilərsiniz.');
        setCurrentScreen('login');
      } else {
        setRegError('Zəhmət olmasa, bütün xanaları doldurun.');
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/fixaz_logo.png" 
                alt="FixAz Logo" 
                className="h-24 w-auto" 
                referrerPolicy="no-referrer"
              />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Qeydiyyat</h2>
            <p className="text-muted-foreground text-sm">Platformaya qoşulmaq üçün məlumatlarınızı daxil edin.</p>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="email" 
                placeholder="Email ünvanı" 
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary" 
              />
            </div>
            
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="tel" 
                placeholder="Nömrə (+994...)" 
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary" 
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Ünvan" 
                value={regAddress}
                onChange={(e) => setRegAddress(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary" 
              />
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Tətbiq şifrəsi" 
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary" 
              />
            </div>

            {regError && <p className="text-red-500 text-xs font-bold">{regError}</p>}

            <button 
              onClick={handleRegister} 
              className="w-full bg-[#F5821F] text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-orange-200"
            >
              Qeydiyyatdan keç
            </button>
            
            <button 
              onClick={() => setCurrentScreen('login')}
              className="w-full text-slate-600 font-semibold text-sm hover:text-primary transition-colors"
            >
              Artıq hesabınız var? Daxil olun
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (currentScreen === 'settings') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentScreen('dashboard')}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-slate-600" />
            </button>
            <h1 className="text-xl font-bold text-slate-900">Tənzimləmələr</h1>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-2xl space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <GlobeIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Dil</h3>
                    <p className="text-sm text-slate-500">Azərbaycan dili</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>

              <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                    <Bell className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Bildirişlər</h3>
                    <p className="text-sm text-slate-500">Aktivdir</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-secondary rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
                    <LockIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Məxfilik</h3>
                    <p className="text-sm text-slate-500">Hesab təhlükəsizliyi</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>

              <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Dəstək</h3>
                    <p className="text-sm text-slate-500">Bizimlə əlaqə</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100">
              <button 
                onClick={() => setCurrentScreen('login')}
                className="w-full flex items-center justify-center gap-2 text-red-500 font-bold hover:bg-red-50 py-4 rounded-2xl transition-all"
              >
                <LogOut className="w-5 h-5" /> Hesabdan çıx
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }
  if (currentScreen === 'profile') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentScreen('dashboard')}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-slate-600" />
            </button>
            <h1 className="text-xl font-bold text-slate-900">Profil Redaktə Et</h1>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-2xl space-y-8"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <button className="absolute bottom-0 right-0 bg-secondary p-2 rounded-full text-white shadow-lg hover:scale-110 transition-transform">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900">Alex Johnson</h2>
                <p className="text-slate-500">Ev sahibi</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Tam Adınız</label>
                <input 
                  type="text" 
                  defaultValue="Alex Johnson"
                  className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Telefon Nömrəsi</label>
                <input 
                  type="tel" 
                  defaultValue="+994 50 123 45 67"
                  className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary" 
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700">Yeni Şifrə</label>
                <input 
                  type="password" 
                  placeholder="Şifrəni dəyişmək üçün daxil edin"
                  className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary" 
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => setCurrentScreen('dashboard')}
                className="flex-1 bg-slate-100 text-slate-900 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all"
              >
                Ləğv et
              </button>
              <button 
                onClick={() => setCurrentScreen('dashboard')}
                className="flex-1 bg-secondary text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-orange-200"
              >
                Yadda saxla
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top App Bar */}
      <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <img 
              src="/fixaz_logo.png" 
              alt="FixAz Logo" 
              className="h-14 w-auto" 
              referrerPolicy="no-referrer"
            />
          </div>
          <nav className="hidden lg:flex items-center gap-6">
            <button 
              onClick={() => setCurrentScreen('dashboard')}
              className="text-sm font-semibold text-primary"
            >
              Ana Səhifə
            </button>
            <button 
              onClick={() => setCurrentScreen('search')}
              className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              Usta Tap
            </button>
            <button className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Kömək</button>
          </nav>
        </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentScreen('create_order')}
              className="hidden md:flex items-center gap-2 bg-secondary text-white px-5 py-2.5 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-orange-200"
            >
              <Plus className="w-5 h-5" />
              Sifariş Yerləşdir
            </button>
            <button className="p-2 text-slate-400 hover:text-primary transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-10 w-px bg-slate-200 mx-2"></div>
            <button 
              onClick={() => setCurrentScreen('profile')}
              className="flex items-center gap-3 hover:bg-slate-50 p-1 rounded-xl transition-colors"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">Alex Johnson</p>
                <p className="text-xs text-slate-500">Ev sahibi</p>
              </div>
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                alt="Profile" 
                className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200"
                referrerPolicy="no-referrer"
              />
            </button>
          </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Left Sidebar */}
        <aside className={`
          fixed lg:sticky top-20 h-[calc(100vh-80px)] bg-white border-r border-slate-200 w-[250px] transition-transform duration-300 z-40 flex flex-col p-6
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          <div className="mb-8">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Xoş gördük</p>
            <h3 className="text-xl font-bold text-slate-900">Alex Johnson</h3>
          </div>

          <nav className="flex-1 space-y-2">
            <SidebarItem 
              icon={<LayoutDashboard className="w-5 h-5" />} 
              label="Ana Səhifə" 
              active={(currentScreen as any) === 'dashboard'} 
              onClick={() => setCurrentScreen('dashboard')}
            />
            <SidebarItem 
              icon={<UserIcon className="w-5 h-5" />} 
              label="Profilim" 
              onClick={() => setCurrentScreen('profile')}
              active={(currentScreen as any) === 'profile'}
            />
            <SidebarItem 
              icon={<ShoppingBag className="w-5 h-5" />} 
              label="Sifarişlərim" 
              onClick={() => setCurrentScreen('orders')}
              active={(currentScreen as any) === 'orders'}
              badge={globalOrders.length > 0 ? globalOrders.length : null}
            />
            <SidebarItem 
              icon={<Wallet className="w-5 h-5" />} 
              label="Pul Kisəsi" 
              onClick={() => setCurrentScreen('wallet')}
              active={(currentScreen as any) === 'wallet'}
            />
            <SidebarItem 
              icon={<Settings className="w-5 h-5" />} 
              label="Tənzimləmələr" 
              onClick={() => setCurrentScreen('settings')}
              active={(currentScreen as any) === 'settings'}
            />
            <div className="pt-4 mt-4 border-t border-slate-100">
              <SidebarItem 
                icon={<LogOut className="w-5 h-5" />} 
                label="Çıxış" 
                onClick={() => setCurrentScreen('login')}
              />
            </div>
          </nav>

          {/* Bottom Balance Card */}
          <div className="mt-auto bg-primary rounded-2xl p-5 text-white space-y-4 shadow-lg shadow-navy-900/20">
            <div>
              <p className="text-slate-300 text-xs font-medium mb-1">Cari Balans</p>
              <p className="text-2xl font-bold">{userBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} AZN</p>
            </div>
            <button 
              onClick={() => setCurrentScreen('payment')}
              className="w-full bg-secondary hover:opacity-90 text-white py-2.5 rounded-xl text-sm font-bold transition-all border border-white/10"
            >
              Balansı Artır
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-10 space-y-12 overflow-x-hidden">
          {/* Hero Section */}
          <section className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Bu gün nəyə <span className="text-secondary italic">kömək</span> lazımdır?
            </h1>
            
            {/* Search Section */}
            <div className="max-w-3xl space-y-4">
              <div 
                className="relative group cursor-pointer"
                onClick={() => setCurrentScreen('search')}
              >
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6 group-hover:text-primary transition-colors" />
                <div className="w-full pl-14 pr-40 py-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-400 text-lg flex items-center">
                  Santexnik, elektrik, təmizlik axtarın...
                </div>
                <button 
                  onClick={() => setCurrentScreen('search')}
                  className="absolute right-2 top-2 bottom-2 bg-secondary text-white px-6 rounded-xl font-bold hover:opacity-90 transition-all"
                >
                  Usta Tap
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Kondisioner təmiri", "Dərin təmizlik", "Mebel yığımı"].map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:border-secondary hover:text-secondary cursor-pointer transition-all">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Kateqoriyaları Kəşf Et</h2>
                <p className="text-slate-500">Qapınızdakı peşəkar xidmətlər</p>
              </div>
              <div className="flex gap-4">
                {selectedCategoryId && (
                  <button 
                    onClick={() => setSelectedCategoryId(null)}
                    className="text-slate-400 font-bold text-sm hover:text-primary transition-colors"
                  >
                    Filtri təmizlə
                  </button>
                )}
                <button 
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="text-secondary font-bold text-sm flex items-center gap-1 hover:underline"
                >
                  {showAllCategories ? "Daha az göstər" : "Hamısına bax"} <ChevronRight className={`w-4 h-4 transition-transform ${showAllCategories ? 'rotate-90' : 'rotate-0'}`} />
                </button>
              </div>
            </div>
            <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ${showAllCategories ? '' : 'overflow-x-auto pb-4 no-scrollbar -mx-2 px-2 flex md:grid'}`}>
              {categories.map((cat) => (
                <motion.div 
                  key={cat.id}
                  whileHover={{ y: -5, borderColor: '#F5821F' }}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`${showAllCategories ? 'w-full' : 'min-w-[140px]'} aspect-square bg-white border ${selectedCategoryId === cat.id ? 'border-secondary ring-2 ring-secondary/20' : 'border-slate-200'} rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 cursor-pointer transition-all shadow-sm hover:shadow-md`}
                >
                  <div className={`w-12 h-12 ${selectedCategoryId === cat.id ? 'bg-secondary text-white' : 'bg-orange-50 text-secondary'} rounded-xl flex items-center justify-center`}>
                    {cat.icon}
                  </div>
                  <span className={`text-sm font-bold ${selectedCategoryId === cat.id ? 'text-secondary' : 'text-primary'}`}>{cat.name}</span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Highly Rated Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                {selectedCategoryId 
                  ? `${allCategories.find(c => c.id === selectedCategoryId)?.name} Ustaları` 
                  : "Yüksək Reytinqli Ustalar"}
              </h2>
              {selectedCategoryId && (
                <span className="text-sm text-slate-500">{filteredHandymen.length} nəticə tapıldı</span>
              )}
            </div>
            <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar -mx-2 px-2">
              {filteredHandymen.length > 0 ? (
                filteredHandymen.map((handyman) => (
                  <motion.div 
                    key={handyman.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      setSelectedHandyman(handyman);
                      setCurrentScreen('professional_profile');
                    }}
                    className="min-w-[280px] h-[380px] relative rounded-3xl overflow-hidden group cursor-pointer shadow-xl"
                  >
                    <img 
                      src={handyman.image} 
                      alt={handyman.fullName} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                      <span className="text-sm font-bold text-slate-900">{handyman.rating}</span>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1.5 rounded-xl text-sm font-bold shadow-lg">
                      {handyman.price}
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-1">{handyman.profession}</p>
                      <h4 className="text-2xl font-bold mb-4">{handyman.fullName}</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <MapPin className="w-4 h-4" /> Bakı, Azərbaycan
                        </div>
                        <button className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center shadow-lg shadow-orange-900/40 hover:scale-110 transition-transform">
                          <Plus className="w-6 h-6 text-white" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="w-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
                  <p className="text-slate-500 font-medium">Bu kateqoriyada hələ ki usta yoxdur.</p>
                </div>
              )}
            </div>
          </section>

          {/* Help Section */}
          <section className="bg-slate-900 rounded-[2.5rem] p-10 lg:p-16 text-white relative overflow-hidden">
            <div className="relative z-10 max-w-xl space-y-6">
              <h2 className="text-4xl font-bold leading-tight">Yardıma ehtiyacınız var?</h2>
              <p className="text-slate-400 text-lg">Müştəri xidmətlərimiz 24/7 sizin suallarınızı cavablandırmağa hazırdır.</p>
              <button className="bg-white text-primary px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-secondary hover:text-white transition-all">
                <HelpCircle className="w-5 h-5" /> Dəstək Mərkəzi
              </button>
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-secondary/20 rounded-full blur-[100px]"></div>
            <div className="absolute -left-20 -top-20 w-60 h-60 bg-orange-500/10 rounded-full blur-[80px]"></div>
          </section>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </AnimatePresence>
    </div>
  );
}

function SidebarItem({ icon, label, active = false, onClick, badge }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void, badge?: number | null }) {
  return (
    <button 
      onClick={onClick}
      className={`
      w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm relative
      ${active 
        ? "bg-primary/10 text-primary shadow-sm" 
        : "text-muted-foreground hover:bg-slate-50 hover:text-primary"}
    `}>
      <span className={active ? "text-primary" : "text-muted-foreground"}>
        {React.cloneElement(icon as React.ReactElement<any>, { className: "w-5 h-5" })}
      </span>
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="bg-secondary text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm">
          {badge}
        </span>
      )}
    </button>
  );
}

function Toast({ message, type }: { message: string, type: 'success' | 'error' }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl shadow-2xl z-[200] flex items-center gap-3 ${
        type === 'success' ? 'bg-teal-600 text-white' : 'bg-red-600 text-white'
      }`}
    >
      {type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <X className="w-5 h-5" />}
      <span className="font-bold text-sm">{message}</span>
    </motion.div>
  );
}
