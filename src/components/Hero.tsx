
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToRooms = () => {
    const roomsSection = document.getElementById('rooms');
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[url('/background.jpeg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-hotel-teal/20"></div>
      </div>
      
      {/* Content */}
      <div className="relative flex flex-col justify-center items-center h-full container mx-auto px-4 text-center text-white">
        <h1
          className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transition-opacity duration-1000 ease-out ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="block">Experience Serenity at</span>
          <span className="text-hotel-sand mt-2 block">Kodai Cool Stay</span>
        </h1>

        <p
          className={`max-w-2xl text-lg md:text-xl mb-8 transition-opacity duration-1000 delay-300 ease-out ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          A scenic hotel retreat offering cozy, elegant rooms with breathtaking views
          and unmatched hospitality in the heart of nature.
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 transition-opacity duration-1000 delay-500 ease-out ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Button
            size="lg"
            className="bg-hotel-teal hover:bg-hotel-teal/90 text-white font-medium px-8"
            onClick={scrollToRooms}
          >
            Book Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-transparent border-white text-white hover:bg-white/10 font-medium px-8"
            onClick={() => {
              const aboutSection = document.getElementById('about');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Discover More
          </Button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <button 
          onClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="flex flex-col items-center"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown size={20} />
        </button>
      </div>
    </div>
  );
};

export default Hero;
