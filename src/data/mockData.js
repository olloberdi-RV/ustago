const mockData = {
  users: [
    { id: "u1", role: "client", name: "Alisher Umarov", phone: "+998 90 123 45 67", avatar: "AU" },
    { id: "u2", role: "prorab", name: "Bobur Karimov", phone: "+998 91 234 56 78", avatar: "BK" },
    { id: "u3", role: "usta", name: "Davron Toshmatov", phone: "+998 93 345 67 89", avatar: "DT" },
    { id: "u4", role: "magazin", name: "Farida Yusupova", phone: "+998 94 456 78 90", avatar: "FY", shopName: "QurilishMart" },
    { id: "u5", role: "haydovchi", name: "Jasur Nazarov", phone: "+998 99 567 89 01", avatar: "JN", vehicleNumber: "01 A 777 BC" }
  ],
  projects: [
    {
      id: "p1",
      title: "3-xonali kvartira ta'miri — Chilonzor 12/45",
      status: "in_progress",
      startDate: "2025-02-01",
      endDate: "2025-05-01",
      totalBudget: 120000000,
      escrowBalance: 85000000,
      frozenFunds: 55000000,
      releasedFunds: 30000000,
      refundedBalance: 5000000,
      clientId: "u1",
      prorabId: "u2",
      ustaId: "u3",
      completionPercent: 45,
      stages: [
        { id: "s1", name: "Demontaj va tayyorlash", status: "completed", percent: 100 },
        { id: "s2", name: "Elektr ishlari", status: "completed", percent: 100 },
        { id: "s3", name: "Suv ta'minoti", status: "in_progress", percent: 60 },
        { id: "s4", name: "Devor va pollar", status: "pending", percent: 0 },
        { id: "s5", name: "Yakuniy bezatish", status: "pending", percent: 0 }
      ]
    }
  ],
  estimates: [
    {
      id: "e1",
      projectId: "p1",
      laborCost: 30000000,
      totalMaterialCost: 40000000,
      status: "approved",
      materials: [
        { id: "m1", name: "Tsement (50 kg)", quantity: 80, unit: "qop", unitPrice: 75000, totalPrice: 6000000, status: "delivered", magazinId: "u4" },
        { id: "m2", name: "Qum (yirik)", quantity: 5, unit: "m³", unitPrice: 350000, totalPrice: 1750000, status: "delivered", magazinId: "u4" },
        { id: "m3", name: "Gips lenta 10m", quantity: 200, unit: "dona", unitPrice: 12000, totalPrice: 2400000, status: "delivered", magazinId: "u4" },
        { id: "m4", name: "Kraska (oq, 10L)", quantity: 20, unit: "bochka", unitPrice: 185000, totalPrice: 3700000, status: "pending", magazinId: "u4" },
        { id: "m5", name: "Sement (qotgan — qaytarildi)", quantity: 20, unit: "qop", unitPrice: 75000, totalPrice: 1500000, status: "returned", magazinId: "u4", returnReason: "Material qotib qolgan, ishlatib bo'lmaydi" },
        { id: "m6", name: "Keramik plitka 60x60", quantity: 120, unit: "m²", unitPrice: 95000, totalPrice: 11400000, status: "pending", magazinId: "u4" },
        { id: "m7", name: "Santexnika to'plami", quantity: 1, unit: "to'plam", unitPrice: 8500000, totalPrice: 8500000, status: "pending", magazinId: "u4" },
        { id: "m8", name: "Elektr kabel (2.5mm)", quantity: 300, unit: "m", unitPrice: 8500, totalPrice: 2550000, status: "delivered", magazinId: "u4" }
      ]
    }
  ],
  transactions: [
    { id: "t1", date: "2025-02-01", type: "escrow_deposit", amount: 120000000, description: "Loyiha uchun escrow depoziti", from: "u1", to: "escrow", status: "completed" },
    { id: "t2", date: "2025-02-05", type: "advance", amount: 5000000, description: "Usta — 1-bosqich avans", from: "escrow", to: "u3", status: "completed" },
    { id: "t3", date: "2025-02-10", type: "material_payment", amount: 6000000, description: "Tsement uchun to'lov — QurilishMart", from: "escrow", to: "u4", status: "completed" },
    { id: "t4", date: "2025-02-10", type: "delivery_payment", amount: 150000, description: "Yetkazib berish haqqi — Jasur Nazarov", from: "escrow", to: "u5", status: "completed" },
    { id: "t5", date: "2025-02-15", type: "material_payment", amount: 1750000, description: "Qum uchun to'lov — QurilishMart", from: "escrow", to: "u4", status: "completed" },
    { id: "t6", date: "2025-02-20", type: "advance", amount: 3000000, description: "Usta — 2-bosqich avans", from: "escrow", to: "u3", status: "completed" },
    { id: "t7", date: "2025-03-01", type: "vozvrat", amount: 1500000, description: "Qotgan tsement qaytarildi — qaytarish", from: "escrow", to: "u1", status: "completed" },
    { id: "t8", date: "2025-03-05", type: "material_payment", amount: 2400000, description: "Gips lenta uchun to'lov", from: "escrow", to: "u4", status: "completed" },
    { id: "t9", date: "2025-03-10", type: "material_payment", amount: 2550000, description: "Elektr kabel uchun to'lov", from: "escrow", to: "u4", status: "completed" },
    { id: "t10", date: "2025-03-15", type: "kafolat_fondi", amount: 1500000, description: "5% Kafolat Fondi — 1 oy ushlab turiladi", from: "u3", to: "kafolat", status: "frozen" },
    { id: "t11", date: "2025-03-20", type: "advance_request", amount: 500000, description: "Usta — avans so'rovi (kutilmoqda)", from: "escrow", to: "u3", status: "pending" }
  ],
  orders: [
    {
      id: "o1",
      projectId: "p1",
      materialId: "m4",
      materialName: "Kraska (oq, 10L)",
      quantity: 20,
      unit: "bochka",
      totalPrice: 3700000,
      status: "pending",
      requestedBy: "u2",
      magazinId: "u4",
      requestDate: "2025-03-22",
      deliveryPin: null
    },
    {
      id: "o2",
      projectId: "p1",
      materialId: "m6",
      materialName: "Keramik plitka 60x60",
      quantity: 120,
      unit: "m²",
      totalPrice: 11400000,
      status: "dispatched",
      requestedBy: "u2",
      magazinId: "u4",
      haydovchiId: "u5",
      requestDate: "2025-03-20",
      dispatchDate: "2025-03-21",
      deliveryPin: null,
      estimatedDelivery: "2025-03-22 14:00"
    }
  ],
  ustaProfile: {
    userId: "u3",
    totalEarned: 28000000,
    advancesReceived: 8000000,
    kafolatFondi: 1500000,
    kafolatUnlockDate: "2025-04-15",
    currentSessionStart: null,
    totalWorkedMinutes: 14400,
    rating: 87,
    tasksCompleted: 12,
    tasksPending: 5
  },
  ustaTimer: {
    isRunning: false,
    sessionStart: null,
    totalSecondsToday: 21600
  }
};

export default mockData;
