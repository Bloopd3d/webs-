import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MenuSection from '@/components/MenuSection';
import ReservationSection from '@/components/ReservationSection';
import AboutSection from '@/components/AboutSection';
import GallerySection from '@/components/GallerySection';
import ReviewsSection from '@/components/ReviewsSection';
import LocationSection from '@/components/LocationSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  useEffect(() => {
    const seedDatabase = async () => {
      try {
        await axios.post(`${API}/seed`);
        console.log('Database seeded');
      } catch (error) {
        console.log('Seed error (may already be seeded):', error.message);
      }
    };
    seedDatabase();
  }, []);

  return (
    <div className="scroll-smooth">
      <Header />
      <Hero />
      <AboutSection />
      <MenuSection />
      <ReservationSection />
      <GallerySection />
      <ReviewsSection />
      <LocationSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default HomePage;