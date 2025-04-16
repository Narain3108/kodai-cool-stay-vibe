
import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import BookingModal from './BookingModal';

interface Room {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  images: string[];
}

const rooms: Room[] = [
  {
    id: 1,
    name: "Family Room",
    price: 5000,
    description: "Spacious accommodation perfect for families, featuring comfortable beds, modern amenities, and a warm atmosphere.",
    features: ["Up to 4 guests", "2 Queen Beds", "Private Bathroom", "Free WiFi", "Air Conditioning"],
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1257&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ]
  },
  {
    id: 2,
    name: "Suite Room",
    price: 5000,
    description: "Luxurious suite with separate living area and premium furnishings for the ultimate comfort and relaxation during your stay.",
    features: ["Up to 2 guests", "King Size Bed", "Separate Living Area", "Mini Bar", "Premium Toiletries"],
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1587985064135-0366536eab42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ]
  }
];

interface RoomCardProps {
  room: Room;
  onBookNow: (roomId: number) => void;
}

const RoomCard = ({ room, onBookNow }: RoomCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered) {
      interval = setInterval(() => {
        nextImage();
      }, 3000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered]);

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 md:h-72 overflow-hidden">
        <img 
          src={room.images[currentImageIndex]}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        {/* Image Navigation */}
        {room.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {room.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-hotel-teal">{room.name}</h3>
          <p className="font-bold text-hotel-charcoal">₹{room.price}<span className="text-sm font-normal">/night</span></p>
        </div>
        <p className="text-gray-600 mb-4">{room.description}</p>
        <div className="mb-6">
          <h4 className="font-bold text-sm text-gray-500 mb-2">ROOM FEATURES</h4>
          <ul className="grid grid-cols-2 gap-2">
            {room.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm">
                <span className="mr-2 text-hotel-teal">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <Button 
          className="w-full bg-hotel-teal hover:bg-hotel-teal/90"
          onClick={() => onBookNow(room.id)}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

const RoomListing = () => {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      { threshold: 0.1 }
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

  const handleBookNow = (roomId: number) => {
    setSelectedRoom(roomId);
    setIsModalOpen(true);
  };

  const selectedRoomData = selectedRoom ? rooms.find(room => room.id === selectedRoom) : null;

  return (
    <section id="rooms" ref={sectionRef} className="py-16 md:py-24 bg-hotel-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-hotel-teal ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            Our Accommodations
          </h2>
          <div className={`h-1 w-20 bg-hotel-orange mx-auto mb-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}></div>
          <p className={`text-lg max-w-2xl mx-auto ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            Choose from our selection of thoughtfully designed rooms that offer comfort, style, and all the amenities you need for a perfect stay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((room, index) => (
            <div 
              key={room.id}
              className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${0.6 + index * 0.2}s` }}
            >
              <RoomCard room={room} onBookNow={handleBookNow} />
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedRoomData && (
        <BookingModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          roomName={selectedRoomData.name}
        />
      )}
    </section>
  );
};

export default RoomListing;
