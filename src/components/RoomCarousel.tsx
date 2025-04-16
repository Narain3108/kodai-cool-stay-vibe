
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface RoomSlide {
  id: number;
  name: string;
  image: string;
  description: string;
}

const rooms: RoomSlide[] = [
  {
    id: 1,
    name: "Family Room",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    description: "Spacious room perfect for families, featuring comfortable beds and modern amenities."
  },
  {
    id: 2,
    name: "Suite Room",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    description: "Luxurious suite with separate living area and premium furnishings for ultimate comfort."
  },
  {
    id: 3,
    name: "Deluxe Room",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Elegant room with stunning views and a cozy atmosphere for a relaxing stay."
  }
];

const RoomCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? rooms.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === rooms.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const scrollToRooms = () => {
    const roomsSection = document.getElementById('rooms');
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-hotel-teal ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            Explore Our Rooms
          </h2>
          <div className={`h-1 w-20 bg-hotel-orange mx-auto mb-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}></div>
          <p className={`text-lg max-w-2xl mx-auto ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            Discover our range of comfortable and elegantly designed rooms, each offering unique features and amenities for a perfect stay.
          </p>
        </div>

        <div className={`relative h-[500px] md:h-[600px] ${isVisible ? 'animate-zoom-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          {/* Main Image */}
          <div className="absolute inset-0 transition-all duration-500 ease-in-out">
            <img 
              src={rooms[currentIndex].image}
              alt={rooms[currentIndex].name}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{rooms[currentIndex].name}</h3>
              <p className="mb-4 text-lg max-w-lg">{rooms[currentIndex].description}</p>
              <Button 
                className="bg-hotel-teal hover:bg-hotel-teal/90"
                onClick={scrollToRooms}
              >
                Book Now
              </Button>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={goToPrevious}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-hotel-teal p-2 rounded-full transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-hotel-teal p-2 rounded-full transition-all"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {rooms.map((_, slideIndex) => (
              <button
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === slideIndex ? 'bg-white scale-125' : 'bg-white/50'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomCarousel;
