import { useState, useRef } from 'react';
import { Truck, RefreshCw, ShieldCheck, MapPin, Package, CheckCircle2, DollarSign } from 'lucide-react';

function formatMoney(amount) {
  return new Intl.NumberFormat('uz-UZ').format(amount) + ' UZS';
}

// NOTE: In production, PIN verification must be server-side. The PIN should
// never be sent to the client. This component uses a runtime-generated PIN
// stored only in memory for demo purposes.
function generateDemoPin() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export default function HaydovchiDashboard({ data, onSwitchRole }) {
  const { users, orders } = data;
  const haydovchi = users.find((u) => u.role === 'haydovchi');
  const magazin = users.find((u) => u.role === 'magazin');
  const prorab = users.find((u) => u.role === 'prorab');

  const activeOrder = orders.find((o) => o.status === 'dispatched');

  // Demo PIN is generated once at component mount and kept only in memory.
  const demoPinRef = useRef(generateDemoPin());
  const demoPin = demoPinRef.current;

  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [delivered, setDelivered] = useState(false);
  const [paymentSent, setPaymentSent] = useState(false);

  function handlePinSubmit() {
    if (!activeOrder) return;
    if (pin === demoPin) {
      setDelivered(true);
      setPinError('');
      setTimeout(() => setPaymentSent(true), 1000);
    } else {
      setPinError('PIN noto\'g\'ri! Prorabdan to\'g\'ri PIN so\'rang.');
      setPin('');
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <header className="bg-cyan-700 text-white px-4 py-4 shadow">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6" />
            <span className="font-bold text-lg">UstaGo</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold">{haydovchi.name}</div>
              <div className="text-cyan-200 text-xs">Haydovchi · {haydovchi.vehicleNumber}</div>
            </div>
            <button
              onClick={onSwitchRole}
              className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> Rol almashtirish
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        {/* Status Card */}
        <div className={`rounded-2xl p-4 text-white shadow-lg ${activeOrder && !delivered ? 'bg-gradient-to-br from-cyan-700 to-cyan-900' : 'bg-gradient-to-br from-slate-600 to-slate-800'}`}>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2.5 h-2.5 rounded-full ${activeOrder && !delivered ? 'bg-green-400 animate-pulse' : 'bg-slate-400'}`} />
            <span className="text-cyan-100 text-sm font-medium">
              {activeOrder && !delivered ? 'Faol yetkazib berish' : 'Hozircha topshiriq yo\'q'}
            </span>
          </div>
          <div className="font-bold text-xl">
            {activeOrder && !delivered ? activeOrder.materialName : 'Yangi topshiriq kutilmoqda'}
          </div>
        </div>

        {/* Active Delivery Card */}
        {activeOrder && !delivered && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-cyan-600" />
              Joriy yetkazib berish
            </h3>

            <div className="space-y-3 mb-5">
              {/* Route */}
              <div className="relative pl-6">
                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-200" />

                <div className="flex items-start gap-3 mb-4">
                  <div className="absolute left-0 w-5 h-5 rounded-full bg-orange-500 border-2 border-white shadow flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-orange-600 uppercase tracking-wide">Olish joyi</div>
                    <div className="font-semibold text-slate-800">{magazin.shopName}</div>
                    <div className="text-slate-500 text-xs">{magazin.name} · {magazin.phone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="absolute left-0 bottom-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Topshirish joyi</div>
                    <div className="font-semibold text-slate-800">Chilonzor 12/45</div>
                    <div className="text-slate-500 text-xs">{prorab.name} (Prorab) · {prorab.phone}</div>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-semibold text-slate-700">Yuk tafsiloti</span>
                </div>
                <div className="text-sm text-slate-600">
                  <span className="font-medium">{activeOrder.materialName}</span> — {activeOrder.quantity} {activeOrder.unit}
                </div>
                <div className="text-slate-500 text-xs mt-0.5">
                  Qiymat: {formatMoney(activeOrder.totalPrice)}
                </div>
                {activeOrder.estimatedDelivery && (
                  <div className="text-cyan-600 text-xs mt-1 font-medium">
                    ⏰ Taxminiy yetkazish: {activeOrder.estimatedDelivery}
                  </div>
                )}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl h-32 flex items-center justify-center border border-slate-200 mb-5">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-cyan-600 mx-auto mb-1" />
                <div className="text-slate-500 text-sm font-medium">Xarita ko'rinishi</div>
                <div className="text-slate-400 text-xs">Chilonzor tumani, Toshkent</div>
              </div>
            </div>

            {/* PIN Verification */}
            <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4">
              <h4 className="font-bold text-cyan-800 text-sm mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Yetkazib berish PIN-kodi
              </h4>
              <p className="text-cyan-700 text-xs mb-3">
                Materiallarni topshirgandan so'ng Prorabdan PIN-kodni oling va to'lov uchun kiriting.
              </p>
              {/* Demo hint — remove in production; PIN verification must be server-side */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3 text-amber-700 text-xs font-medium">
                🔑 Demo PIN: <span className="font-black tracking-widest">{demoPin}</span>{' '}
                <span className="font-normal">(demo maqsadida ko'rsatilmoqda)</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value.replace(/\D/g, ''));
                    setPinError('');
                  }}
                  placeholder="_ _ _ _"
                  className={`flex-1 border-2 rounded-xl px-4 py-3 text-center text-xl font-black tracking-widest focus:outline-none transition-colors ${
                    pinError ? 'border-red-400 bg-red-50' : 'border-cyan-300 bg-white focus:border-cyan-500'
                  }`}
                />
                <button
                  onClick={handlePinSubmit}
                  disabled={pin.length !== 4}
                  className="bg-cyan-600 hover:bg-cyan-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-5 py-3 rounded-xl transition-colors"
                >
                  ✓ OK
                </button>
              </div>

              {pinError && (
                <div className="mt-2 text-red-600 text-xs font-medium flex items-center gap-1">
                  ⚠ {pinError}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Delivered Success */}
        {delivered && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-200 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="font-bold text-slate-800 text-xl mb-1">Muvaffaqiyatli yetkazildi!</h3>
            <p className="text-slate-500 text-sm mb-4">
              {activeOrder?.materialName} muvaffaqiyatli topshirildi
            </p>

            {paymentSent && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-bold text-emerald-800">To'lov yuborildi!</div>
                  <div className="text-emerald-600 font-black text-lg">150,000 UZS</div>
                  <div className="text-emerald-600 text-xs">Avtomatik tranzit haqqi — UstaGo Pay</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* No active order */}
        {!activeOrder && !delivered && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center">
            <Truck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-600 mb-1">Faol topshiriq yo'q</h3>
            <p className="text-slate-400 text-sm">Magazin yangi buyurtma tayinlaganida bu yerda ko'rinadi</p>
          </div>
        )}

        {/* Earnings Summary */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-cyan-600" />
            Bugungi daromad
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-cyan-50 rounded-xl p-3 text-center">
              <div className="text-xs text-cyan-600 font-medium">Tugatilgan</div>
              <div className="text-xl font-black text-cyan-700">1</div>
              <div className="text-xs text-slate-400">yetkazib berish</div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-3 text-center">
              <div className="text-xs text-emerald-600 font-medium">Jami haq</div>
              <div className="text-lg font-black text-emerald-700">150,000</div>
              <div className="text-xs text-slate-400">UZS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
