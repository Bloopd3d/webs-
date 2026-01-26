import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const ReviewsSection = () => {
  const reviews = [
    {
      name: 'María González',
      rating: 5,
      comment: 'Excelente atención y comida deliciosa. El risotto de calabaza es espectacular!',
      date: 'Hace 2 semanas'
    },
    {
      name: 'Carlos Mendez',
      rating: 5,
      comment: 'Ambiente acogedor y pet-friendly. Nuestro perro fue muy bien recibido. Volveremos!',
      date: 'Hace 1 mes'
    },
    {
      name: 'Laura Fernández',
      rating: 4,
      comment: 'Muy buena experiencia. El sushi está fresco y bien preparado. Recomendado!',
      date: 'Hace 3 semanas'
    }
  ];

  const averageRating = 4.7;

  return (
    <section id="reviews" className="py-24 bg-[#F0EFEA]" data-testid="reviews-section">
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
            data-testid="reviews-title"
          >
            Reseñas de Clientes
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4" data-testid="average-rating">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={28}
                  fill={i < Math.floor(averageRating) ? '#F39C12' : 'none'}
                  stroke="#F39C12"
                  strokeWidth={2}
                />
              ))}
            </div>
            <span className="text-3xl font-bold text-[#2C3E50]">{averageRating}</span>
          </div>
          <p className="text-lg text-[#5D6D7E]" data-testid="reviews-subtitle">
            Basado en opiniones verificadas de nuestros clientes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover-lift"
              data-testid={`review-card-${index}`}
            >
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={20} fill="#F39C12" stroke="#F39C12" />
                ))}
              </div>
              <p className="text-[#5D6D7E] mb-4 leading-relaxed italic" data-testid={`review-comment-${index}`}>
                "{review.comment}"
              </p>
              <div className="border-t pt-4">
                <p className="font-bold text-[#2C3E50]" data-testid={`review-name-${index}`}>{review.name}</p>
                <p className="text-sm text-[#5D6D7E]" data-testid={`review-date-${index}`}>{review.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;