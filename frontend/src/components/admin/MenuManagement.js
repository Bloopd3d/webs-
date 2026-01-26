import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, X } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: 'Brunch',
    imagen_url: '',
    destacado: false,
    sin_tacc: false
  });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await axios.get(`${API}/menu`);
      setMenuItems(response.data);
    } catch (error) {
      toast.error('Error al cargar el menú');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');

    try {
      const dataToSend = { ...formData, precio: 0 };
      
      if (editingItem) {
        await axios.put(
          `${API}/menu/${editingItem.id}`,
          dataToSend,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Plato actualizado exitosamente');
      } else {
        await axios.post(
          `${API}/menu`,
          dataToSend,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Plato agregado exitosamente');
      }
      fetchMenuItems();
      closeModal();
    } catch (error) {
      toast.error('Error al guardar el plato');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este plato?')) return;

    const token = localStorage.getItem('admin_token');
    try {
      await axios.delete(`${API}/menu/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Plato eliminado exitosamente');
      fetchMenuItems();
    } catch (error) {
      toast.error('Error al eliminar el plato');
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        nombre: item.nombre,
        descripcion: item.descripcion,
        categoria: item.categoria,
        imagen_url: item.imagen_url,
        destacado: item.destacado,
        sin_tacc: item.sin_tacc
      });
    } else {
      setEditingItem(null);
      setFormData({
        nombre: '',
        descripcion: '',
        categoria: 'Brunch',
        imagen_url: '',
        destacado: false,
        sin_tacc: false
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12" data-testid="menu-management-loading">
        <div className="inline-block w-12 h-12 border-4 border-[#4A5D23] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div data-testid="menu-management">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#2C3E50]" style={{ fontFamily: 'Playfair Display, serif' }}>
          Gestión de Menú
        </h2>
        <button
          onClick={() => openModal()}
          data-testid="add-menu-item-button"
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Agregar Plato
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-card" data-testid={`menu-row-${item.id}`}>
            <div className="relative h-48">
              <img src={item.imagen_url} alt={item.nombre} className="w-full h-full object-cover" />
              {item.destacado && (
                <div className="absolute top-2 left-2 bg-[#C1666B] text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Recomendado
                </div>
              )}
              {item.sin_tacc && (
                <div className="absolute top-2 right-2 bg-[#27AE60] text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Sin TACC
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-[#2C3E50] mb-2" style={{ fontFamily: 'Playfair Display, serif' }} data-testid={`menu-name-${item.id}`}>
                {item.nombre}
              </h3>
              <p className="text-sm text-[#5D6D7E] mb-3 line-clamp-2">{item.descripcion}</p>
              <span className="inline-block text-xs bg-[#F0EFEA] px-3 py-1 rounded-full mb-4" data-testid={`menu-category-${item.id}`}>
                {item.categoria}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(item)}
                  data-testid={`edit-menu-${item.id}`}
                  className="flex-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                >
                  <Edit size={16} /> Editar
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  data-testid={`delete-menu-${item.id}`}
                  className="flex-1 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center justify-center gap-1"
                >
                  <Trash2 size={16} /> Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" data-testid="menu-modal">
          <div className="modal-content">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#2C3E50]" style={{ fontFamily: 'Playfair Display, serif' }}>
                {editingItem ? 'Editar Plato' : 'Agregar Plato'}
              </h3>
              <button onClick={closeModal} data-testid="close-modal" className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} data-testid="menu-form">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Nombre del Plato</label>
                <input
                  type="text"
                  name="nombre"
                  data-testid="menu-form-nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D23]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Descripción</label>
                <textarea
                  name="descripcion"
                  data-testid="menu-form-descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D23]"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Categoría</label>
                <select
                  name="categoria"
                  data-testid="menu-form-categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D23]"
                  required
                >
                  <option value="Brunch">Brunch</option>
                  <option value="Sushi">Sushi</option>
                  <option value="Parrilla">Parrilla</option>
                  <option value="Cafetería">Cafetería</option>
                  <option value="Sin TACC">Sin TACC</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">URL de Imagen</label>
                <input
                  type="url"
                  name="imagen_url"
                  data-testid="menu-form-imagen"
                  value={formData.imagen_url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D23]"
                  required
                />
              </div>

              <div className="flex gap-6 mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="destacado"
                    data-testid="menu-form-destacado"
                    checked={formData.destacado}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />
                  <span className="text-gray-700 font-semibold">Destacado</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="sin_tacc"
                    data-testid="menu-form-sin-tacc"
                    checked={formData.sin_tacc}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />
                  <span className="text-gray-700 font-semibold">Sin TACC</span>
                </label>
              </div>

              <div className="flex gap-4">
                <button type="submit" data-testid="menu-form-submit" className="btn-primary flex-1">
                  {editingItem ? 'Actualizar' : 'Agregar'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  data-testid="menu-form-cancel"
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors flex-1"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;