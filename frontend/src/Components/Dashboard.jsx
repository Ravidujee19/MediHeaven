import React from 'react';
import { useParams } from 'react-router-dom';

// Import dashboard components for each role
import AdminDashboard from './dashboards/AdminDashboard';
import UserDashboard from './dashboards/UserDashboard';
import SupplierDashboard from './dashboards/SupplierDashboard';
import HealthProviderDashboard from './dashboards/HealthProviderDashboard';

const Dashboard = () => {
  const { role } = useParams();

  // Function to render the appropriate dashboard based on the user's role
  const renderDashboard = () => {
    switch (role) {
      case 'admin':
        return <AdminDashboard />;
      case 'user':
        return <UserDashboard />;
      case 'supplier':
        return <SupplierDashboard />;
      case 'health_provider':
        return <HealthProviderDashboard />;
      default:
        return <h1>Dashboard</h1>;
    }
  };


  return (
    <div>
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;