
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Users from './pages/Users';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
      navigate('/login');
    }
    
  }, [navigate]);

  const isAuthenticated = localStorage.getItem('token');

  return (
    <div className="flex min-h-screen h-full w-full">
      {isAuthenticated && <Sidebar />}

      <div className="flex-grow w-full">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
