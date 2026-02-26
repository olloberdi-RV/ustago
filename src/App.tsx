import { useState } from 'react';
import type { Role } from './types';
import mockData from './data/mockData';
import RoleSelectPage from './components/RoleSelectPage';
import ClientDashboard from './components/ClientDashboard';
import ProrabDashboard from './components/ProrabDashboard';
import UstaDashboard from './components/UstaDashboard';
import MagazinDashboard from './components/MagazinDashboard';
import HaydovchiDashboard from './components/HaydovchiDashboard';
import LandingPage from './components/LandingPage';

function App() {
  const [page, setPage] = useState<'landing' | 'app'>('landing');
  const [role, setRole] = useState<Role | null>(null);

  function handleSwitchRole() {
    setRole(null);
  }

  if (page === 'landing') {
    return <LandingPage onGetStarted={() => setPage('app')} />;
  }

  if (!role) {
    return <RoleSelectPage onSelectRole={setRole} />;
  }

  const dashboardProps = { data: mockData, onSwitchRole: handleSwitchRole };

  switch (role) {
    case 'client':
      return <ClientDashboard {...dashboardProps} />;
    case 'prorab':
      return <ProrabDashboard {...dashboardProps} />;
    case 'usta':
      return <UstaDashboard {...dashboardProps} />;
    case 'magazin':
      return <MagazinDashboard {...dashboardProps} />;
    case 'haydovchi':
      return <HaydovchiDashboard {...dashboardProps} />;
    default:
      return <RoleSelectPage onSelectRole={setRole} />;
  }
}

export default App;

