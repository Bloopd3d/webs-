import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToReservations = () => {
    document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/7936026/pexels-photo-7936026.jpeg"
          alt="La Calandria Restaurant"
          className="w-full h-full object-cover hero-image"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
            data-testid="hero-title"
          >
            La Calandria
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl mb-4 font-light" data-testid="hero-subtitle">
            Experiencia Gastronómica de Alta Gama
          </p>
          <p className="text-base sm:text-lg mb-10 max-w-2xl mx-auto opacity-90" data-testid="hero-description">
            Casa Pago Chico, Villa Mercedes - San Luis
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToReservations}
              data-testid="hero-reserve-button"
              className="btn-primary px-8 py-4 text-lg font-semibold"
            >
              Reservar Mesa
            </button>
            <button
              onClick={scrollToMenu}
              data-testid="hero-menu-button"
              className="px-8 py-4 text-lg font-semibold border-2 border-white rounded-lg hover:bg-white hover:text-[#4A5D23] transition-all"
            >
              Ver Menú
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown size={40} className="animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;