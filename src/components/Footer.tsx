
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-hotel-teal text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hotel Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-playfair">Kodai Cool Stay</h3>
            <p className="mb-4">Experience luxury and comfort in our scenic hotel retreat nestled in the beautiful hills of Kodaikanal.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-hotel-sand transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-hotel-sand transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-hotel-sand transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-playfair">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-hotel-sand transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-hotel-sand transition-colors">About Us</a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-hotel-sand transition-colors">Rooms & Suites</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-hotel-sand transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-playfair">Contact</h3>
            <address className="not-italic">
              <p className="mb-2">123 Kodaikanal Hills,<br/>Tamil Nadu, India 624103</p>
              <p className="mb-2">
                <strong>Phone:</strong> +91 9876543210
              </p>
              <p>
                <strong>Email:</strong> info@kodaicoolstay.com
              </p>
            </address>
          </div>
          
          {/* Newsletter */}

        </div>
        
        <div className="border-t border-white/20 mt-12 pt-6 text-sm text-center">
          <p>© {currentYear} Kodai Cool Stay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
