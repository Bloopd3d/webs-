import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API}/admin/login`, {
        username,
        password
      });

      if (response.data.token) {
        onLogin(response.data.token);
        toast.success('Inicio de sesión exitoso');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      toast.error('Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAF9F6] to-[#F0EFEA] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#4A5D23] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            La Calandria
          </h1>
          <p className="text-gray-600">Panel de Administración</p>
        </div>

        <form onSubmit={handleSubmit} data-testid="admin-login-form">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              data-testid="admin-username-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D23] transition-all"
              placeholder="Ingrese su usuario"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              data-testid="admin-password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D23] transition-all"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          <button
            type="submit"
            data-testid="admin-login-submit"
            disabled={loading}
            className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Credenciales por defecto:</p>
          <p className="font-mono mt-1">Usuario: admin | Contraseña: calandria2024</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;