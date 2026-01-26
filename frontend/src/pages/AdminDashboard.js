import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuManagement from '@/components/admin/MenuManagement';
import { LogOut } from 'lucide-react';

const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <header className="bg-[#4A5D23] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
              La Calandria - Gestión de Menú
            </h1>
            <button
              onClick={handleLogout}
              data-testid="admin-logout-button"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
            >
              <LogOut size={20} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <MenuManagement />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;