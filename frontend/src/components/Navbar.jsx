import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Our Work', path: '/our-work' },
  { name: 'Contact', path: '/contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading font-bold text-2xl text-text tracking-tight">
                Jyoti
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path ? 'text-primary' : 'text-gray-600 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/donate"
              className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              Donate
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-xl"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 px-3">
              <Link
                to="/donate"
                onClick={() => setIsOpen(false)}
                className="block w-full bg-primary text-white text-center py-4 rounded-xl font-bold shadow-md"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
