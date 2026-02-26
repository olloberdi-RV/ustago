import { useState } from 'react';
import mockData from './data/mockData.js';
import RoleSelectPage from './components/RoleSelectPage.jsx';
import ClientDashboard from './components/ClientDashboard.jsx';
import ProrabDashboard from './components/ProrabDashboard.jsx';
import UstaDashboard from './components/UstaDashboard.jsx';
import MagazinDashboard from './components/MagazinDashboard.jsx';
import HaydovchiDashboard from './components/HaydovchiDashboard.jsx';

function App() {
  const [role, setRole] = useState(null);

  function handleSwitchRole() {
    setRole(null);
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

