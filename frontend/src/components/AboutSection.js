import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Heart, Utensils } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: <Award size={32} />,
      title: 'Alta Gama',
      description: 'Experiencia gastronómica de primer nivel'
    },
    {
      icon: <Users size={32} />,
      title: 'Ambiente Acogedor',
      description: 'Espacio rústico-moderno para toda la familia'
    },
    {
      icon: <Utensils size={32} />,
      title: 'Cocina Artesanal',
      description: 'Platos elaborados con técnicas tradicionales'
    },
    {
      icon: <Heart size={32} />,
      title: 'Calidad Premium',
      description: 'Ingredientes frescos y platos elaborados con pasión'
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#F0EFEA]" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl font-bold text-[#4A5D23] mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
            data-testid="about-title"
          >
            Bienvenidos a La Calandria
          </h2>
          <p className="text-lg sm:text-xl text-[#5D6D7E] max-w-3xl mx-auto leading-relaxed" data-testid="about-description">
            Un pub-restaurante que combina la calidez de lo rústico con la elegancia de lo moderno.
            Ubicados en Casa Pago Chico, Villa Mercedes, ofrecemos una experiencia culinaria única
            donde cada plato cuenta una historia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              data-testid={`feature-card-${index}`}
              className="bg-white rounded-2xl p-8 text-center hover-lift"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#4A5D23] text-white rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                {feature.title}
              </h3>
              <p className="text-[#5D6D7E]">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;