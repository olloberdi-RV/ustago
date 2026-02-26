export type Role = 'client' | 'prorab' | 'usta' | 'magazin' | 'haydovchi';

export interface User {
  id: string;
  role: Role;
  name: string;
  phone: string;
  avatar: string;
  shopName?: string;
  vehicleNumber?: string;
}

export interface Stage {
  id: string;
  name: string;
  status: 'completed' | 'in_progress' | 'pending';
  percent: number;
}

export interface Project {
  id: string;
  title: string;
  status: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  escrowBalance: number;
  frozenFunds: number;
  releasedFunds: number;
  refundedBalance: number;
  clientId: string;
  prorabId: string;
  ustaId: string;
  completionPercent: number;
  stages: Stage[];
}

export interface Material {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  status: 'delivered' | 'pending' | 'returned';
  magazinId: string;
  returnReason?: string;
}

export interface Estimate {
  id: string;
  projectId: string;
  laborCost: number;
  totalMaterialCost: number;
  status: string;
  materials: Material[];
}

export interface Transaction {
  id: string;
  date: string;
  type: string;
  amount: number;
  description: string;
  from: string;
  to: string;
  status: 'completed' | 'pending' | 'frozen';
}

export interface Order {
  id: string;
  projectId: string;
  materialId: string;
  materialName: string;
  quantity: number;
  unit: string;
  totalPrice: number;
  status: 'pending' | 'dispatched' | 'delivered';
  requestedBy: string;
  magazinId: string;
  haydovchiId?: string;
  requestDate: string;
  dispatchDate?: string;
  deliveryPin: string | null;
  estimatedDelivery?: string;
}

export interface UstaProfile {
  userId: string;
  totalEarned: number;
  advancesReceived: number;
  kafolatFondi: number;
  kafolatUnlockDate: string;
  currentSessionStart: string | null;
  totalWorkedMinutes: number;
  rating: number;
  tasksCompleted: number;
  tasksPending: number;
}

export interface UstaTimer {
  isRunning: boolean;
  sessionStart: string | null;
  totalSecondsToday: number;
}

export interface MockData {
  users: User[];
  projects: Project[];
  estimates: Estimate[];
  transactions: Transaction[];
  orders: Order[];
  ustaProfile: UstaProfile;
  ustaTimer: UstaTimer;
}

export interface DashboardProps {
  data: MockData;
  onSwitchRole: () => void;
}
