import { useState, useEffect, useRef } from 'react';
import { Wrench, Play, Pause, RefreshCw, ShieldCheck, AlertTriangle, DollarSign, Clock } from 'lucide-react';

function formatMoney(amount) {
  return new Intl.NumberFormat('uz-UZ').format(amount) + ' UZS';
}

function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function UstaDashboard({ data, onSwitchRole }) {
  const { users, ustaProfile, transactions, projects } = data;
  const usta = users.find((u) => u.role === 'usta');
  const project = projects[0];

  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(ustaProfile.totalWorkedMinutes * 60);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [showAdvanceModal, setShowAdvanceModal] = useState(false);
  const [advanceSent, setAdvanceSent] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTotalSeconds((s) => s + 1);
        setSessionSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const pendingTx = transactions.filter((t) => t.status === 'pending' && t.to === 'u3');
  const advances = transactions.filter((t) => t.type === 'advance' && t.status === 'completed');

  function handleAdvanceRequest() {
    setAdvanceSent(true);
    setShowAdvanceModal(false);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <header className="bg-violet-700 text-white px-4 py-4 shadow">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6" />
            <span className="font-bold text-lg">UstaGo</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold">{usta.name}</div>
              <div className="text-violet-200 text-xs">Usta</div>
            </div>
            <button
              onClick={onSwitchRole}
              className="bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> Rol almashtirish
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        {/* Work Timer */}
        <div className="bg-gradient-to-br from-violet-700 to-violet-900 rounded-2xl p-6 text-white shadow-lg text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-violet-200" />
            <span className="text-violet-200 text-sm font-medium">Ish vaqti hisoblagich</span>
          </div>
          <div className="text-5xl font-black tracking-widest mb-1 font-mono">
            {formatTime(totalSeconds)}
          </div>
          <div className="text-violet-200 text-xs mb-5">Jami ishlagan vaqt</div>

          {isRunning && (
            <div className="text-violet-100 text-sm mb-3">
              Joriy sessiya: {formatTime(sessionSeconds)}
            </div>
          )}

          <button
            onClick={() => {
              if (!isRunning) setSessionSeconds(0);
              setIsRunning(!isRunning);
            }}
            className={`flex items-center justify-center gap-2 mx-auto px-8 py-3 rounded-xl font-bold text-base transition-all ${
              isRunning
                ? 'bg-red-500 hover:bg-red-400 text-white'
                : 'bg-white hover:bg-violet-50 text-violet-700'
            }`}
          >
            {isRunning ? <><Pause className="w-5 h-5" /> To'xtatish (Pauza)</> : <><Play className="w-5 h-5" /> Ishni boshlash</>}
          </button>

          {isRunning && (
            <div className="mt-3 flex items-center justify-center gap-1.5 bg-white/10 rounded-lg py-1.5 px-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-violet-100">Joriy sessiya yozilmoqda...</span>
            </div>
          )}

          <p className="text-violet-300 text-xs mt-3">
            ℹ Elektr uzilishi yoki force majeure holatida vaqt saqlanadi
          </p>
        </div>

        {/* Project */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="font-bold text-slate-800 text-sm">{project.title}</div>
              <span className="bg-violet-100 text-violet-700 text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block">Jarayonda</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500">Reyting</div>
              <div className="font-black text-violet-700 text-xl">{ustaProfile.rating}/100</div>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-violet-600 h-2 rounded-full" style={{ width: `${project.completionPercent}%` }} />
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>Progress</span>
            <span>{project.completionPercent}%</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-violet-50 rounded-xl p-3 text-center">
              <div className="text-xs text-violet-600 font-medium">Bajarilgan</div>
              <div className="text-xl font-black text-violet-700">{ustaProfile.tasksCompleted}</div>
              <div className="text-xs text-slate-400">vazifa</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 text-center">
              <div className="text-xs text-slate-600 font-medium">Kutilmoqda</div>
              <div className="text-xl font-black text-slate-700">{ustaProfile.tasksPending}</div>
              <div className="text-xs text-slate-400">vazifa</div>
            </div>
          </div>
        </div>

        {/* Financial Panel */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-violet-600" />
            Moliyaviy panel
          </h3>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-slate-600 text-sm">Jami daromad</span>
              <span className="font-bold text-emerald-600">{formatMoney(ustaProfile.totalEarned)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-slate-600 text-sm">Olingan avanslar</span>
              <span className="font-bold text-orange-600">{formatMoney(ustaProfile.advancesReceived)}</span>
            </div>
          </div>

          {/* Kafolat Fondi */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-amber-800 text-sm">Kafolat Fondi (5%)</div>
                <div className="text-amber-900 font-black text-xl mt-0.5">{formatMoney(ustaProfile.kafolatFondi)}</div>
                <div className="text-amber-700 text-xs mt-1">
                  Sifat kafolati uchun <strong>1 oy</strong> ushlab turiladi.
                </div>
                <div className="text-amber-700 text-xs mt-0.5">
                  Chiqarish sanasi: <strong>{ustaProfile.kafolatUnlockDate}</strong>
                </div>
                <div className="text-amber-600 text-xs mt-1">
                  Reyting 85+ bo'lsa avtomatik chiqariladi
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advance Request */}
        {!advanceSent ? (
          <button
            onClick={() => setShowAdvanceModal(true)}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-2xl text-base flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <DollarSign className="w-5 h-5" />
            Avans so'rash
          </button>
        ) : (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-center">
            <div className="text-orange-600 font-bold">⏳ Avans so'rovi yuborildi</div>
            <div className="text-orange-500 text-sm mt-1">Buyurtmachi tasdiqini kutmoqda...</div>
          </div>
        )}

        {/* Advance History */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-3">Avans tarixi</h3>
          <div className="space-y-2">
            {advances.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <div className="text-sm text-slate-700">{tx.description}</div>
                  <div className="text-xs text-slate-400">{tx.date}</div>
                </div>
                <span className="text-emerald-600 font-bold text-sm">{formatMoney(tx.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advance Modal */}
      {showAdvanceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 px-4 pb-4 sm:pb-0">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
            <h3 className="font-bold text-slate-800 text-lg mb-4">Avans so'rash</h3>
            <div className="bg-violet-50 rounded-xl p-4 text-center mb-4">
              <div className="text-slate-500 text-sm">So'ralayotgan avans</div>
              <div className="text-3xl font-black text-violet-700 mt-1">500,000 UZS</div>
              <div className="text-slate-400 text-xs mt-1">Buyurtmachi tasdiqlashi kerak</div>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              Avans so'rovi Buyurtmachiga yuboriladi. Tasdiqlangach, 5% Kafolat Fondi ushlab, qolgan qism hisobingizga tushadi.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAdvanceModal(false)}
                className="flex-1 border border-slate-300 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-50"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleAdvanceRequest}
                className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl"
              >
                So'rov yuborish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
