import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Clock, MapPin } from 'lucide-react';

const ReservationSection = () => {
  return (
    <section id="reservations" className="py-24 bg-[#F0EFEA]" data-testid="reservation-section">
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
            data-testid="reservation-title"
          >
            Reservá tu Mesa
          </h2>
          <p className="text-lg text-[#5D6D7E] max-w-2xl mx-auto" data-testid="reservation-subtitle">
            Llamanos para reservar tu lugar en La Calandria
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#4A5D23] text-white rounded-3xl p-12 shadow-2xl text-center"
            data-testid="contact-info-card"
          >
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                <Phone size={40} />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Llamanos para Reservar
              </h3>
              <p className="text-white/90 text-lg mb-8">
                Nuestro equipo estará encantado de atenderte
              </p>
              <a
                href="tel:+5492657298494"
                data-testid="contact-phone"
                className="text-5xl sm:text-6xl font-bold hover:text-white/90 transition-colors block mb-8"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                02657 29-8494
              </a>
              <a
                href="tel:+5492657298494"
                data-testid="call-now-button"
                className="inline-block bg-white text-[#4A5D23] px-12 py-4 rounded-xl font-bold text-xl hover:bg-white/90 transition-all hover:scale-105"
              >
                <Phone className="inline mr-3" size={24} />
                Llamar Ahora
              </a>
            </div>

            <div className="border-t border-white/20 pt-8 mt-8">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start gap-4">
                  <Clock size={24} className="mt-1" />
                  <div>
                    <p className="font-semibold text-lg mb-2">Horarios de Atención</p>
                    <p className="text-white/90">Lunes a Domingos</p>
                    <p className="text-white/90">12:00 - 02:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin size={24} className="mt-1" />
                  <div>
                    <p className="font-semibold text-lg mb-2">Ubicación</p>
                    <p className="text-white/90">Av. Bartolomé Mitre 1365</p>
                    <p className="text-white/90">Villa Mercedes, San Luis</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;