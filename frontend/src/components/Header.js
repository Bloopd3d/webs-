import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Inicio', id: 'hero' },
    { name: 'Nosotros', id: 'about' },
    { name: 'Menú', id: 'menu' },
    { name: 'Reservas', id: 'reservations' },
    { name: 'Galería', id: 'gallery' },
    { name: 'Ubicación', id: 'location' }
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
      }`}
      data-testid="main-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection('hero')}
              data-testid="logo-button"
              className="text-2xl sm:text-3xl font-bold text-[#4A5D23] hover:text-[#3a4a1c] transition-colors"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              La Calandria
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                data-testid={`nav-link-${link.id}`}
                className="text-[#2C3E50] hover:text-[#4A5D23] font-medium transition-colors"
              >
                {link.name}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollToSection('reservations')}
            data-testid="cta-reserve-button"
            className="hidden md:block btn-primary"
          >
            Reservar Mesa
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
            className="md:hidden text-[#4A5D23] p-2"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg"
            data-testid="mobile-menu"
          >
            <nav className="flex flex-col px-4 py-6 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  data-testid={`mobile-nav-link-${link.id}`}
                  className="text-left text-[#2C3E50] hover:text-[#4A5D23] font-medium py-2 transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('reservations')}
                data-testid="mobile-cta-reserve"
                className="btn-primary mt-2 text-center"
              >
                Reservar Mesa
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;