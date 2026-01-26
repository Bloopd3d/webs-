import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

const LocationSection = () => {
  const address = 'Av. Bartolomé Mitre 1365, Villa Mercedes, San Luis, Argentina';
  const googleMapsUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3369.1!2d-65.4627!3d-33.6777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDQwJzM5LjciUyA2NcKwMjcnNDUuNyJX!5e0!3m2!1sen!2sar!4v1234567890';

  return (
    <section id="location" className="py-24 bg-[#FAF9F6]" data-testid="location-section">
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
            data-testid="location-title"
          >
            Dónde Encontrarnos
          </h2>
          <p className="text-lg text-[#5D6D7E] max-w-2xl mx-auto" data-testid="location-subtitle">
            Casa Pago Chico, Villa Mercedes, San Luis
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-xl"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-[#4A5D23] p-3 rounded-full text-white">
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#2C3E50] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Dirección
                </h3>
                <p className="text-[#5D6D7E] text-lg" data-testid="location-address">
                  {address}
                </p>
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=Av.+Bartolomé+Mitre+1365,+Villa+Mercedes,+San+Luis`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="location-directions-button"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Navigation size={20} />
              Obtener Direcciones
            </a>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="text-xl font-bold text-[#2C3E50] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Horarios de Atención
              </h4>
              <div className="space-y-2 text-[#5D6D7E]">
                <div className="flex justify-between">
                  <span className="font-semibold">Lunes - Jueves:</span>
                  <span>12:00 - 02:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Viernes - Sábado:</span>
                  <span>12:00 - 02:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Domingo:</span>
                  <span>12:00 - 02:00</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-xl h-full min-h-[500px]"
            data-testid="location-map"
          >
            <iframe
              src={googleMapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '500px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="La Calandria Location"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;