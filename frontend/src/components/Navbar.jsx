import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';

const navLinks = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'projects', path: '/our-work' },
  { key: 'contact', path: '/contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

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
                {t('common.organizationName').split(' ')[0]}
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-6 mr-4 border-r border-gray-100 pr-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.path ? 'text-primary' : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {t(`common.nav.${link.key}`)}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <Link
                to="/donate"
                className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                Donate
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageToggle />
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
                {t(`common.nav.${link.key}`)}
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

