import React, { useState } from 'react';
import AdminSignup from './components/AdminSignup';
import Login from './components/Login';
import UserManagement from './components/UserManagement';
import AdminUserApprovalView from './components/AdminUserApprovalView';
import EmployeeExpenseView from './components/EmployeeExpenseView'; // Add this import

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('employee'); // 'admin' or 'employee'
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Change to true

  const handleLogin = (role = 'employee') => {
    setIsAuthenticated(true);
    setUserRole(role);
    setCurrentPage(role === 'admin' ? 'dashboard' : 'expenses');
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    setUserRole('admin');
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    if (!isAuthenticated) {
      switch (currentPage) {
        case 'signup':
          return <AdminSignup onSignup={handleSignup} />;
        case 'login':
        default:
          return <Login onLogin={() => handleLogin('employee')} />;
      }
    }

    // Authenticated routes
    switch (currentPage) {
      case 'dashboard':
        return <UserManagement />;
      case 'expenses':
        return <EmployeeExpenseView />;
      case 'approval-rules':
        return <AdminUserApprovalView 
          user={{ name: 'Test User', manager: 'Test Manager' }}
          onSave={() => setCurrentPage('dashboard')}
          onCancel={() => setCurrentPage('dashboard')}
        />;
      default:
        return userRole === 'admin' ? <UserManagement /> : <EmployeeExpenseView />;
    }
  };

  // Simple navigation for testing
  React.useEffect(() => {
    const handleNavigation = (event) => {
      if (event.detail && event.detail.page) {
        setCurrentPage(event.detail.page);
      }
    };

    window.addEventListener('navigate', handleNavigation);
    
    return () => {
      window.removeEventListener('navigate', handleNavigation);
    };
  }, []);

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;