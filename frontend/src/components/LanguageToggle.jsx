import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { currentLanguage, changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    changeLanguage(currentLanguage === 'en' ? 'hi' : 'en');
  };

  return (
    <div className="relative group">
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
      >
        <Globe className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
        <span className={`text-xs font-bold ${currentLanguage === 'en' ? 'text-gray-600' : 'text-primary'}`}>
          {currentLanguage === 'en' ? 'हिन्दी' : 'English'}
        </span>
      </button>
      
      {/* Tooltip */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-text text-white text-[10px] font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
        Click to toggle language
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-text rotate-45" />
      </div>
    </div>

  );
}

