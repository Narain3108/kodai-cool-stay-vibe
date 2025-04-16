
import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={cn(
      'fixed top-0 left-0 w-full z-50 transition-all duration-300',
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <h1 className="text-2xl font-bold text-hotel-teal font-playfair">
            Kodai Cool Stay
          </h1>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <button onClick={() => scrollToSection('home')} className="font-medium hover:text-hotel-teal transition-colors">Home</button>
          <button onClick={() => scrollToSection('about')} className="font-medium hover:text-hotel-teal transition-colors">About</button>
          <button onClick={() => scrollToSection('rooms')} className="font-medium hover:text-hotel-teal transition-colors">Rooms</button>
          <button onClick={() => scrollToSection('contact')} className="font-medium hover:text-hotel-teal transition-colors">Contact</button>
          <Button 
            variant="outline" 
            className="bg-transparent border-hotel-teal text-hotel-teal hover:bg-hotel-teal hover:text-white"
            onClick={() => scrollToSection('rooms')}
          >
            Book Now
          </Button>
          <div className="flex items-center gap-2 text-hotel-teal">
            <Phone size={18} />
            <span className="font-medium">+91 9876543210</span>
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button className="lg:hidden text-gray-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-40 pt-20 animate-slide-up">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
            <button onClick={() => scrollToSection('home')} className="font-medium text-xl py-3 border-b border-gray-100">Home</button>
            <button onClick={() => scrollToSection('about')} className="font-medium text-xl py-3 border-b border-gray-100">About</button>
            <button onClick={() => scrollToSection('rooms')} className="font-medium text-xl py-3 border-b border-gray-100">Rooms</button>
            <button onClick={() => scrollToSection('contact')} className="font-medium text-xl py-3 border-b border-gray-100">Contact</button>
            <Button 
              className="bg-hotel-teal text-white hover:bg-hotel-teal/90 w-full mt-4"
              onClick={() => scrollToSection('rooms')}
            >
              Book Now
            </Button>
            <div className="flex items-center justify-center gap-2 text-hotel-teal mt-4">
              <Phone size={20} />
              <span className="font-medium text-lg">+91 9876543210</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
