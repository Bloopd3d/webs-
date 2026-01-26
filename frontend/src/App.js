import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';
import '@/App.css';

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAdminAuthenticated(true);
    }
  }, []);

  const handleAdminLogin = (token) => {
    localStorage.setItem('admin_token', token);
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAdminAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/admin/login" 
          element={
            isAdminAuthenticated ? 
            <Navigate to="/admin/dashboard" /> : 
            <AdminLogin onLogin={handleAdminLogin} />
          } 
        />
        <Route 
          path="/admin/dashboard" 
          element={
            isAdminAuthenticated ? 
            <AdminDashboard onLogout={handleAdminLogout} /> : 
            <Navigate to="/admin/login" />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;