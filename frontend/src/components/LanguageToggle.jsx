import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-full border border-gray-100">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
          currentLanguage === 'en'
            ? 'bg-primary text-white shadow-sm'
            : 'text-gray-500 hover:text-primary'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('hi')}
        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
          currentLanguage === 'hi'
            ? 'bg-primary text-white shadow-sm'
            : 'text-gray-500 hover:text-primary'
        }`}
      >
        हिन्दी
      </button>
    </div>
  );
}
