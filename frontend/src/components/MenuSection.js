import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import MenuCard from './MenuCard';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const MenuSection = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [loading, setLoading] = useState(true);

  const categories = ['Todos', 'Brunch', 'Sushi', 'Parrilla', 'Cafetería', 'Sin TACC'];

  useEffect(() => {
    fetchMenu();
  }, [selectedCategory]);

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/menu`, {
        params: selectedCategory !== 'Todos' ? { categoria: selectedCategory } : {}
      });
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="menu" className="py-24 bg-[#FAF9F6]" data-testid="menu-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl sm:text-5xl font-bold text-[#4A5D23] mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
            data-testid="menu-title"
          >
            Nuestro Menú
          </h2>
          <p className="text-lg text-[#5D6D7E] max-w-2xl mx-auto" data-testid="menu-subtitle">
            Descubre nuestra selección de platos artesanales
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12 overflow-x-auto" data-testid="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              data-testid={`category-${category.toLowerCase().replace(/\s/g, '-')}`}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20" data-testid="menu-loading">
            <div className="inline-block w-12 h-12 border-4 border-[#4A5D23] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            data-testid="menu-grid"
          >
            {menuItems.map((item, index) => (
              <MenuCard key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        )}

        {!loading && menuItems.length === 0 && (
          <div className="text-center py-20" data-testid="menu-empty">
            <p className="text-xl text-[#5D6D7E]">No hay platos disponibles en esta categoría</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;