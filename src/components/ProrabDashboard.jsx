import { useState } from 'react';
import { HardHat, Plus, RefreshCw, CheckCircle2, XCircle, Star, ShieldCheck } from 'lucide-react';

function formatMoney(amount) {
  return new Intl.NumberFormat('uz-UZ').format(amount) + ' UZS';
}

const statusMap = {
  delivered: { label: 'Yetkazildi', color: 'bg-emerald-100 text-emerald-700' },
  pending: { label: 'Kutilmoqda', color: 'bg-orange-100 text-orange-700' },
  returned: { label: 'Qaytarildi', color: 'bg-red-100 text-red-700' },
};

export default function ProrabDashboard({ data, onSwitchRole }) {
  const { estimates, users, projects } = data;
  const prorab = users.find((u) => u.role === 'prorab');
  const estimate = estimates[0];
  const project = projects[0];

  const [materials, setMaterials] = useState(estimate.materials);
  const [ustaRating, setUstaRating] = useState(87);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', unitPrice: '', unit: '' });

  function handleAccept(id) {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'delivered' } : m))
    );
  }

  function handleReturn(id) {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'returned' } : m))
    );
  }

  function handleAddItem(e) {
    e.preventDefault();
    const item = {
      id: 'm' + Date.now(),
      name: newItem.name,
      quantity: parseInt(newItem.quantity),
      unit: newItem.unit || 'dona',
      unitPrice: parseInt(newItem.unitPrice),
      totalPrice: parseInt(newItem.quantity) * parseInt(newItem.unitPrice),
      status: 'pending',
      magazinId: 'u4',
    };
    setMaterials((prev) => [...prev, item]);
    setNewItem({ name: '', quantity: '', unitPrice: '', unit: '' });
    setShowAddForm(false);
  }

  const totalMaterial = materials.reduce((sum, m) => sum + (m.status !== 'returned' ? m.totalPrice : 0), 0);
  const totalEstimate = totalMaterial + estimate.laborCost;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <header className="bg-amber-600 text-white px-4 py-4 shadow">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6" />
            <span className="font-bold text-lg">UstaGo</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold">{prorab.name}</div>
              <div className="text-amber-200 text-xs">Prorab</div>
            </div>
            <button
              onClick={onSwitchRole}
              className="bg-amber-500 hover:bg-amber-400 text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> Rol almashtirish
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Project Header */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <h2 className="font-bold text-slate-800 text-lg">{project.title}</h2>
              <span className="inline-block mt-1 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">Jarayonda — {project.completionPercent}%</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500">Umumiy byudjet</div>
              <div className="font-bold text-blue-700 text-xl">{formatMoney(project.totalBudget)}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Smart Estimate */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <HardHat className="w-5 h-5 text-amber-600" />
                Aqlli Smeta
              </h3>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3" /> Material qo'shish
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddItem} className="bg-amber-50 rounded-xl p-4 mb-4 space-y-3 border border-amber-200">
                <input
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                  placeholder="Material nomi"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  required
                />
                <div className="flex gap-2">
                  <input
                    className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                    placeholder="Miqdor"
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                    required
                  />
                  <input
                    className="w-20 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                    placeholder="Birlik"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                  />
                </div>
                <input
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                  placeholder="Narx (UZS)"
                  type="number"
                  value={newItem.unitPrice}
                  onChange={(e) => setNewItem({ ...newItem, unitPrice: e.target.value })}
                  required
                />
                <div className="flex gap-2">
                  <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 border border-slate-300 text-slate-600 text-sm py-2 rounded-lg hover:bg-slate-50">Bekor</button>
                  <button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold py-2 rounded-lg">Qo'shish</button>
                </div>
              </form>
            )}

            <div className="space-y-2 mb-4 max-h-64 overflow-y-auto pr-1">
              {materials.map((m) => {
                const st = statusMap[m.status];
                return (
                  <div key={m.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0 gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-700 truncate">{m.name}</div>
                      <div className="text-xs text-slate-400">{m.quantity} {m.unit} × {formatMoney(m.unitPrice)}</div>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${st.color}`}>{st.label}</span>
                    <div className="text-sm font-bold text-slate-700 flex-shrink-0 text-right min-w-[80px]">{formatMoney(m.totalPrice)}</div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Material xarajatlar</span>
                <span className="font-semibold text-slate-700">{formatMoney(totalMaterial)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Mehnat xarajatlari</span>
                <span className="font-semibold text-slate-700">{formatMoney(estimate.laborCost)}</span>
              </div>
              <div className="flex justify-between text-base font-bold border-t border-slate-200 pt-2 mt-2">
                <span className="text-slate-800">Jami smeta</span>
                <span className="text-amber-700">{formatMoney(totalEstimate)}</span>
              </div>
            </div>
          </div>

          {/* Quality Control */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 text-base mb-4">Sifat nazorati — Material qabuli</h3>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {materials.map((m) => (
                <div key={m.id} className={`rounded-xl border p-3 ${
                  m.status === 'returned' ? 'border-red-200 bg-red-50' :
                  m.status === 'delivered' ? 'border-emerald-200 bg-emerald-50' :
                  'border-slate-200 bg-slate-50'
                }`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-800 truncate">{m.name}</div>
                      <div className="text-xs text-slate-500">{m.quantity} {m.unit}</div>
                      {m.status === 'returned' && m.returnReason && (
                        <div className="text-xs text-red-600 mt-1">⚠ {m.returnReason}</div>
                      )}
                    </div>
                    {m.status === 'pending' && (
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => handleAccept(m.id)}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                        >
                          <CheckCircle2 className="w-3 h-3" /> Qabul
                        </button>
                        <button
                          onClick={() => handleReturn(m.id)}
                          className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                        >
                          <XCircle className="w-3 h-3" /> Qaytarish
                        </button>
                      </div>
                    )}
                    {m.status === 'delivered' && <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />}
                    {m.status === 'returned' && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final Assessment */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-amber-500" />
            Yakuniy baholash — Usta ishi sifati (100 ball)
          </h3>
          <div className="flex items-center gap-4 mb-3">
            <div className={`text-4xl font-black ${ustaRating >= 85 ? 'text-emerald-600' : ustaRating >= 70 ? 'text-amber-600' : 'text-red-500'}`}>
              {ustaRating}
            </div>
            <div className="flex-1">
              <input
                type="range"
                min={0}
                max={100}
                value={ustaRating}
                onChange={(e) => setUstaRating(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-0.5">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
          </div>
          <div className={`rounded-xl p-3 text-sm font-medium ${
            ustaRating >= 85 ? 'bg-emerald-50 text-emerald-700' :
            ustaRating >= 70 ? 'bg-amber-50 text-amber-700' :
            'bg-red-50 text-red-700'
          }`}>
            {ustaRating >= 85
              ? '✓ Ajoyib! 5% Kafolat Fondi 1 oydan so\'ng avtomatik chiqariladi.'
              : ustaRating >= 70
              ? '⚠ Qoniqarli. Kafolat Fondi ushlab qolinadi.'
              : '✗ Qoniqarsiz. Kafolat Fondi qaytarilmaydi.'}
          </div>
          <button className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl transition-colors">
            Baholashni saqlash va Buyurtmachiga yuborish
          </button>
        </div>
      </div>
    </div>
  );
}
