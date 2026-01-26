import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ReservationManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todas');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await axios.get(`${API}/reservations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservations(response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (error) {
      toast.error('Error al cargar las reservas');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem('admin_token');
    try {
      await axios.put(
        `${API}/reservations/${id}`,
        { estado: status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Estado actualizado exitosamente');
      fetchReservations();
    } catch (error) {
      toast.error('Error al actualizar el estado');
    }
  };

  const getFilteredReservations = () => {
    if (filter === 'todas') return reservations;
    return reservations.filter((res) => res.estado === filter);
  };

  const getStatusBadge = (status) => {
    const styles = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      confirmada: 'bg-green-100 text-green-800',
      cancelada: 'bg-red-100 text-red-800'
    };

    const icons = {
      pendiente: <Clock size={16} />,
      confirmada: <CheckCircle size={16} />,
      cancelada: <XCircle size={16} />
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${styles[status]}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-12" data-testid="reservation-management-loading">
        <div className="inline-block w-12 h-12 border-4 border-[#4A5D23] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div data-testid="reservation-management">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#2C3E50]" style={{ fontFamily: 'Playfair Display, serif' }}>
          Gestión de Reservas
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('todas')}
            data-testid="filter-todas"
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'todas'
                ? 'bg-[#4A5D23] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('pendiente')}
            data-testid="filter-pendiente"
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'pendiente'
                ? 'bg-[#4A5D23] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setFilter('confirmada')}
            data-testid="filter-confirmada"
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'confirmada'
                ? 'bg-[#4A5D23] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Confirmadas
          </button>
          <button
            onClick={() => setFilter('cancelada')}
            data-testid="filter-cancelada"
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'cancelada'
                ? 'bg-[#4A5D23] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Canceladas
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="admin-table" data-testid="reservations-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Teléfono</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Personas</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredReservations().map((reservation) => (
              <tr key={reservation.id} data-testid={`reservation-row-${reservation.id}`}>
                <td className="font-semibold" data-testid={`reservation-name-${reservation.id}`}>
                  {reservation.nombre_cliente}
                </td>
                <td data-testid={`reservation-phone-${reservation.id}`}>{reservation.telefono}</td>
                <td data-testid={`reservation-date-${reservation.id}`}>{reservation.fecha}</td>
                <td data-testid={`reservation-time-${reservation.id}`}>{reservation.hora}</td>
                <td data-testid={`reservation-guests-${reservation.id}`}>{reservation.cantidad_personas}</td>
                <td>{getStatusBadge(reservation.estado)}</td>
                <td>
                  <div className="flex gap-2">
                    {reservation.estado !== 'confirmada' && (
                      <button
                        onClick={() => updateStatus(reservation.id, 'confirmada')}
                        data-testid={`confirm-reservation-${reservation.id}`}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                      >
                        Confirmar
                      </button>
                    )}
                    {reservation.estado !== 'cancelada' && (
                      <button
                        onClick={() => updateStatus(reservation.id, 'cancelada')}
                        data-testid={`cancel-reservation-${reservation.id}`}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {getFilteredReservations().length === 0 && (
          <div className="text-center py-12" data-testid="no-reservations">
            <p className="text-xl text-[#5D6D7E]">No hay reservas {filter !== 'todas' ? filter + 's' : ''}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationManagement;