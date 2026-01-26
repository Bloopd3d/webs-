import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2F3E1B] text-white py-16" data-testid="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
              data-testid="footer-brand"
            >
              La Calandria
            </h3>
            <p className="text-white/80 mb-4">
              Experiencia gastronómica de alta gama en Villa Mercedes, San Luis.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-instagram"
                className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-facebook"
                className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  data-testid="footer-link-about"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Nosotros
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('menu')}
                  data-testid="footer-link-menu"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Menú
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('reservations')}
                  data-testid="footer-link-reservations"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Reservas
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('location')}
                  data-testid="footer-link-location"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Ubicación
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Horarios
            </h4>
            <ul className="space-y-2 text-white/80">
              <li>Lunes - Jueves</li>
              <li className="font-semibold text-white">12:00 - 02:00</li>
              <li className="mt-3">Viernes - Domingo</li>
              <li className="font-semibold text-white">12:00 - 02:00</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Contacto
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+5492657298494"
                  data-testid="footer-phone"
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <Phone size={18} />
                  02657 29-8494
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/80">
                <MapPin size={18} className="mt-1" />
                <span data-testid="footer-address">Av. Bartolomé Mitre 1365, Villa Mercedes</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60">
          <p data-testid="footer-copyright">
            &copy; {new Date().getFullYear()} La Calandria. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;