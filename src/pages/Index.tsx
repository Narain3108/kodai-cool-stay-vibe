
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import RoomCarousel from '@/components/RoomCarousel';
import RoomListing from '@/components/RoomListing';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

const Index = () => {
  useEffect(() => {
    // Animation on scroll logic
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        
        if (elementPosition < viewportHeight - 100) {
          element.classList.add('animated');
        }
      });
    };
    
    // Initial check
    animateElements();
    
    // Add event listener
    window.addEventListener('scroll', animateElements);
    
    // Clean up
    return () => window.removeEventListener('scroll', animateElements);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <RoomCarousel />
      <RoomListing />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
