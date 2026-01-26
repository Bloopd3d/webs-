import React from 'react';
import { motion } from 'framer-motion';

const GallerySection = () => {
  const images = [
    'https://images.pexels.com/photos/7936963/pexels-photo-7936963.jpeg',
    'https://images.pexels.com/photos/3763621/pexels-photo-3763621.jpeg',
    'https://images.pexels.com/photos/14188066/pexels-photo-14188066.jpeg',
    'https://images.pexels.com/photos/34759470/pexels-photo-34759470.jpeg',
    'https://images.pexels.com/photos/351962/pexels-photo-351962.jpeg',
    'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg'
  ];

  return (
    <section id="gallery" className="py-24 bg-[#FAF9F6]" data-testid="gallery-section">
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
            data-testid="gallery-title"
          >
            Galería
          </h2>
          <p className="text-lg text-[#5D6D7E] max-w-2xl mx-auto" data-testid="gallery-subtitle">
            Un vistazo a nuestra experiencia culinaria
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="gallery-grid">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-2xl shadow-lg hover-lift group"
              data-testid={`gallery-image-${index}`}
            >
              <img
                src={image}
                alt={`La Calandria ${index + 1}`}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;