import { ShieldCheck, HardHat, Wrench, Store, Truck, ArrowRight, CheckCircle2, Lock, BarChart3 } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <header className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white rounded-xl p-1.5">
              <ShieldCheck className="w-6 h-6 text-blue-700" />
            </div>
            <span className="font-bold text-xl tracking-tight">UstaGo</span>
          </div>
          <button
            onClick={onGetStarted}
            className="bg-white text-blue-700 font-semibold px-5 py-2 rounded-xl hover:bg-blue-50 transition-colors text-sm"
          >
            Platformaga kirish
          </button>
        </nav>

        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="inline-block bg-blue-600/30 text-blue-200 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            🇺🇿 O'zbekiston uchun qurilish ekosistemasi
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Qurilishni boshqarish <br className="hidden sm:block" />
            <span className="text-blue-300">oson va ishonchli</span>
          </h1>
          <p className="text-blue-200 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Buyurtmachi, Prorab, Usta, Magazin va Haydovchi — barchasi bitta platformada.
            Escrow to'lov tizimi bilan mablag'laringiz xavfsiz.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-blue-700 font-bold text-lg px-8 py-4 rounded-2xl hover:bg-blue-50 transition-colors inline-flex items-center gap-2 shadow-xl shadow-blue-900/30"
          >
            Boshlash <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Features */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Nima uchun UstaGo?</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Qurilish jarayonining har bir bosqichini shaffof va samarali boshqaring
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="bg-blue-50 rounded-xl p-3 w-fit mb-4">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">Escrow to'lov</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Mablag'lar xavfsiz escrow hisobida saqlanadi va faqat ish bajarilganda chiqariladi.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="bg-emerald-50 rounded-xl p-3 w-fit mb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">Sifat nazorati</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Har bir bosqichda sifat tekshiruvi. Materiallar qabuli va baholash tizimi.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="bg-violet-50 rounded-xl p-3 w-fit mb-4">
                <BarChart3 className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">Shaffof boshqaruv</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Loyiha progressi, smeta va tranzaksiyalar real vaqtda kuzatiladi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Barcha rollar — bitta platforma</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Qurilish jarayonidagi barcha ishtirokchilar uchun maxsus panel
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: ShieldCheck, label: 'Buyurtmachi', desc: 'Moliyalashtirish va nazorat', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
              { icon: HardHat, label: 'Prorab', desc: 'Smeta va sifat nazorati', bgColor: 'bg-amber-50', textColor: 'text-amber-600' },
              { icon: Wrench, label: 'Usta', desc: 'Ish bajarish va vaqt hisobi', bgColor: 'bg-violet-50', textColor: 'text-violet-600' },
              { icon: Store, label: 'Magazin', desc: 'Materiallar va buyurtmalar', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600' },
              { icon: Truck, label: 'Haydovchi', desc: 'Yetkazib berish va PIN', bgColor: 'bg-cyan-50', textColor: 'text-cyan-600' },
            ].map((role) => {
              const Icon = role.icon;
              return (
                <div key={role.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center">
                  <div className={`${role.bgColor} rounded-xl p-3 w-fit mx-auto mb-3`}>
                    <Icon className={`w-6 h-6 ${role.textColor}`} />
                  </div>
                  <div className="font-bold text-slate-800 mb-1">{role.label}</div>
                  <div className="text-slate-500 text-sm">{role.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-700 to-blue-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Qurilish sohasini raqamlashtiring</h2>
          <p className="text-blue-200 text-lg mb-8">
            UstaGo bilan loyihalaringizni samarali, shaffof va xavfsiz boshqaring.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-blue-700 font-bold text-lg px-8 py-4 rounded-2xl hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
          >
            Hoziroq boshlash <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4 text-center text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span className="text-white font-semibold">UstaGo</span>
        </div>
        <p>© 2025 UstaGo — Qurilish sohasini raqamlashtirish</p>
      </footer>
    </div>
  );
}
