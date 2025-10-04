import React, { useState } from 'react';
import AdminSignup from './components/AdminSignup';
import Login from './components/Login';

function App() {
  const [currentPage, setCurrentPage] = useState('login'); // 'login' or 'signup'

  const renderPage = () => {
    switch (currentPage) {
      case 'signup':
        return <AdminSignup />;
      case 'login':
      default:
        return <Login />;
    }
  };

  // Simple navigation (for hackathon - in real app use React Router)
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