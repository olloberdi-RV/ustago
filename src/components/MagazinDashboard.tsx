import { useState } from 'react';
import { Store, RefreshCw, ShieldCheck, Package, Truck, CheckCircle2 } from 'lucide-react';
import type { DashboardProps, Order } from '../types';

function formatMoney(amount: number): string {
  return new Intl.NumberFormat('uz-UZ').format(amount) + ' UZS';
}

const orderStatusMap: Record<Order['status'], { label: string; color: string; dot: string }> = {
  pending: { label: 'Yangi buyurtma', color: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500' },
  dispatched: { label: 'Jo\'natildi', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  delivered: { label: 'Yetkazildi', color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
};

export default function MagazinDashboard({ data, onSwitchRole }: DashboardProps) {
  const { users, orders, estimates, projects } = data;
  const magazin = users.find((u) => u.role === 'magazin')!;
  const haydovchi = users.find((u) => u.role === 'haydovchi')!;
  const project = projects[0];
  const allMaterials = estimates[0].materials;

  const [orderList, setOrderList] = useState<Order[]>(orders);

  function handleDispatch(orderId: string) {
    setOrderList((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: 'dispatched', haydovchiId: haydovchi.id, deliveryPin: String(Math.floor(1000 + Math.random() * 9000)) }
          : o
      )
    );
  }

  function handleMarkDelivered(orderId: string) {
    setOrderList((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'delivered' } : o))
    );
  }

  const pendingOrders = orderList.filter((o) => o.status === 'pending');
  const activeOrders = orderList.filter((o) => o.status === 'dispatched');
  const completedOrders = orderList.filter((o) => o.status === 'delivered');

  const totalRevenue = allMaterials
    .filter((m) => m.status !== 'returned')
    .reduce((sum, m) => sum + m.totalPrice, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <header className="bg-emerald-700 text-white px-4 py-4 shadow">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6" />
            <span className="font-bold text-lg">UstaGo</span>
            <span className="text-emerald-300 text-sm ml-2">B2B Platform</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold">{magazin.shopName}</div>
              <div className="text-emerald-200 text-xs">{magazin.name} · Magazin</div>
            </div>
            <button
              onClick={onSwitchRole}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> Rol almashtirish
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
            <Package className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-black text-orange-600">{pendingOrders.length}</div>
            <div className="text-slate-500 text-xs font-medium mt-0.5">Yangi buyurtmalar</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
            <Truck className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-black text-blue-600">{activeOrders.length}</div>
            <div className="text-slate-500 text-xs font-medium mt-0.5">Yo'ldagi buyurtmalar</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
            <div className="text-2xl font-black text-emerald-600">{completedOrders.length}</div>
            <div className="text-slate-500 text-xs font-medium mt-0.5">Yetkazilgan</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
            <Store className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <div className="text-lg font-black text-emerald-700">{formatMoney(totalRevenue)}</div>
            <div className="text-slate-500 text-xs font-medium mt-0.5">Umumiy daromad</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Queue */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-orange-500" />
              Buyurtmalar navbati
            </h3>

            {orderList.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                <Package className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p>Hozircha buyurtma yo'q</p>
              </div>
            )}

            <div className="space-y-4">
              {orderList.map((order) => {
                const st = orderStatusMap[order.status];
                return (
                  <div key={order.id} className="border border-slate-100 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="font-semibold text-slate-800 text-sm">{order.materialName}</div>
                        <div className="text-slate-500 text-xs mt-0.5">
                          {order.quantity} {order.unit} · {formatMoney(order.totalPrice)}
                        </div>
                        <div className="text-slate-400 text-xs mt-0.5">
                          So'ragan: Prorab · {order.requestDate}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${st.color}`}>{st.label}</span>
                        <div className={`w-2 h-2 rounded-full ${st.dot}`} />
                      </div>
                    </div>

                    {order.status === 'dispatched' && (
                      <div className="bg-blue-50 rounded-lg p-2 text-xs text-blue-700 mb-3">
                        <strong>Haydovchi:</strong> {haydovchi.name} · {haydovchi.vehicleNumber}<br />
                        <strong>Yetkazish PIN:</strong> <span className="font-black text-blue-900 text-base">{order.deliveryPin}</span>
                        {order.estimatedDelivery && (
                          <><br /><strong>Taxm. vaqt:</strong> {order.estimatedDelivery}</>
                        )}
                      </div>
                    )}

                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleDispatch(order.id)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <Truck className="w-4 h-4" /> Haydovchiga tayinlash & Jo'natish
                      </button>
                    )}

                    {order.status === 'dispatched' && (
                      <button
                        onClick={() => handleMarkDelivered(order.id)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Yetkazilgani tasdiqlash
                      </button>
                    )}

                    {order.status === 'delivered' && (
                      <div className="flex items-center justify-center gap-2 text-emerald-600 text-sm font-semibold py-1">
                        <CheckCircle2 className="w-4 h-4" /> Muvaffaqiyatli yetkazildi — To'lov yuborildi
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Material Catalog */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
              <Store className="w-5 h-5 text-emerald-600" />
              Materiallar katalogi — {project.title.split('—')[0].trim()}
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {allMaterials.map((m) => {
                const colorMap = {
                  delivered: 'bg-emerald-100 text-emerald-700',
                  pending: 'bg-orange-100 text-orange-700',
                  returned: 'bg-red-100 text-red-700',
                };
                const labelMap = {
                  delivered: 'Yetkazildi',
                  pending: 'Kutilmoqda',
                  returned: 'Qaytarildi',
                };
                return (
                  <div key={m.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0 gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-700 truncate">{m.name}</div>
                      <div className="text-xs text-slate-400">{m.quantity} {m.unit} × {formatMoney(m.unitPrice)}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold text-slate-700">{formatMoney(m.totalPrice)}</div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colorMap[m.status]}`}>
                        {labelMap[m.status]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-slate-100 pt-3 mt-3 flex justify-between font-bold">
              <span className="text-slate-700">Jami</span>
              <span className="text-emerald-700">{formatMoney(totalRevenue)}</span>
            </div>
          </div>
        </div>

        {/* Available Drivers */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
            <Truck className="w-5 h-5 text-cyan-600" />
            Mavjud haydovchilar
          </h3>
          <div className="flex items-center gap-4 p-3 bg-cyan-50 rounded-xl border border-cyan-200">
            <div className="w-10 h-10 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-sm">
              {haydovchi.avatar}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-slate-800">{haydovchi.name}</div>
              <div className="text-slate-500 text-xs">{haydovchi.vehicleNumber} · {haydovchi.phone}</div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-emerald-700 text-xs font-semibold">Bo'sh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
