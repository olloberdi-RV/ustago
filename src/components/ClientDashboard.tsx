import { useState, useEffect, useRef, useId } from 'react';
import type { ReactNode } from 'react';
import { ShieldCheck, Wallet, CheckCircle2, AlertCircle, RefreshCw, X, ChevronRight } from 'lucide-react';
import type { DashboardProps } from '../types';

function formatMoney(amount: number): string {
  return new Intl.NumberFormat('uz-UZ').format(amount) + ' UZS';
}

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

function Modal({ title, children, onClose }: ModalProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus the close button on mount and restore focus on unmount
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    return () => { previouslyFocused?.focus(); };
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 px-4 pb-4 sm:pb-0"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 id={titleId} className="font-bold text-slate-800 text-lg">{title}</h3>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Yopish"
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function ClientDashboard({ data, onSwitchRole }: DashboardProps) {
  const { projects, transactions, users } = data;
  const project = projects[0];
  const client = users.find((u) => u.role === 'client')!;
  const [showAdvanceModal, setShowAdvanceModal] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [advanceApproved, setAdvanceApproved] = useState(false);

  const pendingTx = transactions.filter((t) => t.status === 'pending');
  const completedTx = transactions.filter((t) => t.status === 'completed').slice(-5).reverse();

  function handleApproveAdvance() {
    setAdvanceApproved(true);
    setShowAdvanceModal(false);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <header className="bg-blue-700 text-white px-4 py-4 shadow">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6" />
            <span className="font-bold text-lg">UstaGo</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold">{client.name}</div>
              <div className="text-blue-200 text-xs">Buyurtmachi</div>
            </div>
            <button
              onClick={onSwitchRole}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> Rol almashtirish
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        {/* Escrow Wallet */}
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="w-5 h-5 text-blue-200" />
            <span className="text-blue-200 text-sm font-medium">UstaGo Pay — Escrow Hamyon</span>
          </div>
          <div className="text-3xl font-bold mb-1">{formatMoney(project.totalBudget)}</div>
          <div className="text-blue-200 text-sm mb-5">Umumiy byudjet</div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-orange-300 text-xs font-medium mb-1">Muzlatilgan</div>
              <div className="font-bold text-sm">{formatMoney(project.frozenFunds)}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-emerald-300 text-xs font-medium mb-1">Chiqarilgan</div>
              <div className="font-bold text-sm">{formatMoney(project.releasedFunds)}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-sky-300 text-xs font-medium mb-1">Qaytarilgan</div>
              <div className="font-bold text-sm">{formatMoney(project.refundedBalance)}</div>
            </div>
          </div>
        </div>

        {/* Project Status */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h2 className="font-bold text-slate-800 mb-1">{project.title}</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">Jarayonda</span>
            <span className="text-slate-400 text-xs">{project.startDate} — {project.endDate}</span>
          </div>

          <div className="mb-2 flex justify-between text-sm">
            <span className="text-slate-600">Umumiy progress</span>
            <span className="font-bold text-blue-700">{project.completionPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 mb-5">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${project.completionPercent}%` }}
            />
          </div>

          <div className="space-y-2">
            {project.stages.map((stage) => (
              <div key={stage.id} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  stage.status === 'completed' ? 'bg-emerald-500' :
                  stage.status === 'in_progress' ? 'bg-blue-500' : 'bg-slate-300'
                }`} />
                <span className={`text-sm flex-1 ${stage.status === 'pending' ? 'text-slate-400' : 'text-slate-700'}`}>
                  {stage.name}
                </span>
                {stage.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                {stage.status === 'in_progress' && (
                  <span className="text-xs text-blue-600 font-medium">{stage.percent}%</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pending Actions */}
        {(pendingTx.length > 0 || !advanceApproved) && (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              <span className="font-bold text-orange-800">Tasdiqlash kutilmoqda</span>
            </div>
            <div className="space-y-3">
              {!advanceApproved && (
                <div className="bg-white rounded-xl p-4 border border-orange-200 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-800">Usta uchun avans</div>
                    <div className="text-orange-600 font-bold text-lg">500,000 UZS</div>
                  </div>
                  <button
                    onClick={() => setShowAdvanceModal(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                  >
                    Ko'rish
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Final Delivery */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-emerald-800">Yakuniy qabul qilish</span>
          </div>
          <p className="text-emerald-700 text-sm mb-3">
            Ob'ektni qabul qilib, 95% mablag'ni (114,000,000 UZS) chiqaring
          </p>
          <button
            onClick={() => setShowFinalModal(true)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            Yakuniy qabul qilish & Mablag' chiqarish
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">So'nggi tranzaksiyalar</h3>
          <div className="space-y-3">
            {completedTx.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <div className="text-sm font-medium text-slate-700">{tx.description}</div>
                  <div className="text-xs text-slate-400">{tx.date}</div>
                </div>
                <div className={`text-sm font-bold ${tx.type === 'vozvrat' ? 'text-sky-600' : tx.type === 'escrow_deposit' ? 'text-emerald-600' : 'text-orange-600'}`}>
                  {tx.type === 'vozvrat' ? '+' : '-'}{formatMoney(tx.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advance Modal */}
      {showAdvanceModal && (
        <Modal title="Avans tasdiqlash" onClose={() => setShowAdvanceModal(false)}>
          <div className="space-y-4">
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <div className="text-slate-600 text-sm">Avans miqdori</div>
              <div className="text-3xl font-bold text-orange-600 mt-1">500,000 UZS</div>
              <div className="text-slate-500 text-sm mt-1">Davron Toshmatov (Usta) uchun</div>
            </div>
            <p className="text-slate-600 text-sm">
              Bu mablag' escrow hisobingizdан Usta hisobiga o'tkaziladi. Kafolat fondi 5% ushlab qolingan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAdvanceModal(false)}
                className="flex-1 border border-slate-300 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleApproveAdvance}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors"
              >
                ✓ Tasdiqlash
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Final Modal */}
      {showFinalModal && (
        <Modal title="Yakuniy qabul qilish" onClose={() => setShowFinalModal(false)}>
          <div className="space-y-4">
            <div className="bg-emerald-50 rounded-xl p-4 text-center">
              <div className="text-slate-600 text-sm">Chiqariladigan mablag'</div>
              <div className="text-3xl font-bold text-emerald-600 mt-1">114,000,000 UZS</div>
              <div className="text-slate-500 text-sm mt-1">Umumiy byudjetning 95%</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-3">
              <p className="text-amber-700 text-sm">
                <strong>5% (6,000,000 UZS)</strong> Kafolat Fondi sifatida 1 oy ushlab turiladi va Usta baholash reytingi 85+ bo'lsa avtomatik chiqariladi.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFinalModal(false)}
                className="flex-1 border border-slate-300 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Bekor qilish
              </button>
              <button
                onClick={() => setShowFinalModal(false)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors"
              >
                ✓ Qabul qilish
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
