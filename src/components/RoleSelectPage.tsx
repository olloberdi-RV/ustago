import type { LucideIcon } from 'lucide-react';
import { HardHat, User, Wrench, Store, Truck, ShieldCheck } from 'lucide-react';
import type { Role } from '../types';

interface RoleOption {
  id: Role;
  label: string;
  sublabel: string;
  description: string;
  icon: LucideIcon;
  color: string;
  hoverColor: string;
  lightBg: string;
  textColor: string;
  borderColor: string;
}

interface RoleSelectPageProps {
  onSelectRole: (role: Role) => void;
}

const roles: RoleOption[] = [
  {
    id: 'client',
    label: 'Buyurtmachi',
    sublabel: 'Client',
    description: 'Loyihani moliyalashtiring va bosqichlarni tasdiqlang',
    icon: User,
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
    lightBg: 'bg-blue-50',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-200',
  },
  {
    id: 'prorab',
    label: 'Prorab',
    sublabel: 'Ish boshqaruvchi',
    description: 'Smeta tuzing, materiallarni nazorat qiling va sifatni baholang',
    icon: HardHat,
    color: 'bg-amber-600',
    hoverColor: 'hover:bg-amber-700',
    lightBg: 'bg-amber-50',
    textColor: 'text-amber-600',
    borderColor: 'border-amber-200',
  },
  {
    id: 'usta',
    label: 'Usta / Stajyor',
    sublabel: 'Ishchi',
    description: 'Vazifalarni bajaring, vaqtni hisoblab va avans so\'rang',
    icon: Wrench,
    color: 'bg-violet-600',
    hoverColor: 'hover:bg-violet-700',
    lightBg: 'bg-violet-50',
    textColor: 'text-violet-600',
    borderColor: 'border-violet-200',
  },
  {
    id: 'magazin',
    label: 'Magazin',
    sublabel: 'Ta\'minotchi',
    description: 'Avtomatik buyurtmalarni qabul qiling va jo\'nating',
    icon: Store,
    color: 'bg-emerald-600',
    hoverColor: 'hover:bg-emerald-700',
    lightBg: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-200',
  },
  {
    id: 'haydovchi',
    label: 'Haydovchi',
    sublabel: 'Logistika',
    description: 'Materiallarni yetkazing va PIN orqali to\'lovni oling',
    icon: Truck,
    color: 'bg-cyan-600',
    hoverColor: 'hover:bg-cyan-700',
    lightBg: 'bg-cyan-50',
    textColor: 'text-cyan-600',
    borderColor: 'border-cyan-200',
  },
];

export default function RoleSelectPage({ onSelectRole }: RoleSelectPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-700 text-white py-6 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="bg-white rounded-xl p-2">
            <ShieldCheck className="w-8 h-8 text-blue-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">UstaGo</h1>
            <p className="text-blue-200 text-sm">Milliy Qurilish & Escrow Ekosistema</p>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 flex flex-col items-center justify-center py-10 px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Rolni tanlang</h2>
          <p className="text-slate-500 mt-1">Platformaga kirish uchun o'z rolingizni tanlang</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => onSelectRole(role.id)}
                className={`group flex flex-col items-start gap-3 bg-white rounded-2xl p-6 border-2 ${role.borderColor} shadow-sm hover:shadow-md transition-all duration-200 text-left hover:-translate-y-0.5`}
              >
                <div className={`${role.lightBg} rounded-xl p-3`}>
                  <Icon className={`w-7 h-7 ${role.textColor}`} />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-lg leading-tight">{role.label}</div>
                  <div className={`text-xs font-semibold uppercase tracking-wider ${role.textColor} mt-0.5`}>{role.sublabel}</div>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">{role.description}</p>
                </div>
                <div className={`mt-auto self-end ${role.color} ${role.hoverColor} text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors`}>
                  Kirish →
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-slate-400 text-xs mt-8">
          © 2025 UstaGo — Qurilish sohasini raqamlashtirish
        </p>
      </main>
    </div>
  );
}
