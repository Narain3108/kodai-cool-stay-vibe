import { useRef, useEffect, useState } from 'react';

const images = [
  '/about.jpeg',
  '/se.jpeg',
  '/fa.jpeg',
  '/parking.jpeg'
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Intersection observer for animation - modified for mobile
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.1, // Lower threshold for mobile
        rootMargin: '0px 0px -50px 0px' // Triggers 50px before element enters viewport
      }
    );

    // Fallback for mobile in case observer doesn't trigger
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-slide image carousel every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-16 md:py-24 bg-hotel-beige">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Carousel Image */}
          <div
            className={`relative rounded-lg shadow-lg overflow-hidden ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="absolute inset-0 bg-hotel-orange/20 -top-6 -left-6 rounded-lg z-0"></div>
            <img
              src={images[currentImage]}
              alt="Kodai Cool Stay"
              className="w-full h-[300px] md:h-[500px] object-cover rounded-lg relative z-10 transition-opacity duration-700"
            />
          </div>

          {/* Content */}
          <div>
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 text-hotel-teal ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.4s' }}
            >
              About Kodai Cool Stay
            </h2>
            <div
              className={`h-1 w-20 bg-hotel-orange mb-8 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.6s' }}
            ></div>
            <p
              className={`text-lg mb-6 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.8s' }}
            >
              Nestled in the serene hills, Kodai Cool Stay is a haven of tranquility and luxury. Our retreat offers a perfect blend of modern comfort and natural beauty, making it an ideal escape from the bustle of city life.
            </p>
            <p
              className={`text-lg mb-6 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '1s' }}
            >
              Our hotel is designed to provide an immersive experience where guests can reconnect with nature while enjoying premium amenities and personalized service that caters to their every need.
            </p>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '1.2s' }}
            >
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-hotel-teal mb-2">Stunning Views</h3>
                <p>Each room offers breathtaking panoramic views of the surrounding landscape.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-hotel-teal mb-2">Gourmet Cuisine</h3>
                <p>Experience exquisite local and international dishes prepared by our expert chefs.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-hotel-teal mb-2">Premium Amenities</h3>
                <p>Enjoy our spa, swimming pool, and recreational facilities during your stay.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-hotel-teal mb-2">Personalized Service</h3>
                <p>Our dedicated staff ensures a memorable and comfortable experience for all guests.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;