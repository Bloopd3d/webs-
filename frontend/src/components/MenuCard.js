import React from 'react';
import { motion } from 'framer-motion';
import { Star, Check } from 'lucide-react';

const MenuCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="menu-card group"
      data-testid={`menu-item-${item.id}`}
    >
      <div className="relative overflow-hidden h-80">
        <img
          src={item.imagen_url}
          alt={item.nombre}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {item.destacado && (
          <div className="absolute top-4 left-4 bg-[#C1666B] text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
            <Star size={16} fill="white" />
            Recomendado
          </div>
        )}
        {item.sin_tacc && (
          <div className="absolute top-4 right-4 bg-[#27AE60] text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
            <Check size={16} />
            Sin TACC
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3
            className="text-3xl font-bold mb-3"
            style={{ fontFamily: 'Playfair Display, serif' }}
            data-testid={`menu-item-name-${item.id}`}
          >
            {item.nombre}
          </h3>
          <p className="text-white/90 leading-relaxed text-base" data-testid={`menu-item-description-${item.id}`}>
            {item.descripcion}
          </p>
          <span className="inline-block mt-3 text-sm text-white/80 bg-white/10 px-4 py-1 rounded-full backdrop-blur-sm" data-testid={`menu-item-category-${item.id}`}>
            {item.categoria}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;