import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, X } from 'lucide-react';

export default function LanguageToggle() {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="relative group">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
        >
          <Globe className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
          <span className={`text-xs font-bold ${currentLanguage === 'en' ? 'text-gray-600' : 'text-primary'}`}>
            {currentLanguage === 'en' ? 'हिन्दी' : 'English'}
          </span>
        </button>
        
        {/* Tooltip */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-text text-white text-[10px] font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
          Click to change language
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-text rotate-45" />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                {currentLanguage === 'en' ? 'Select Language' : 'भाषा चुनें'}
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {currentLanguage === 'en' ? (
                <>
                  <button 
                    onClick={() => {
                      changeLanguage('hi');
                      setIsModalOpen(false);
                    }}
                    className="w-full py-3 px-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors"
                  >
                    हिंदी में स्विच करें
                  </button>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-full py-3 px-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Continue in English
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      changeLanguage('en');
                      setIsModalOpen(false);
                    }}
                    className="w-full py-3 px-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors"
                  >
                    Switch to English
                  </button>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-full py-3 px-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    हिंदी में जारी रखें
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

