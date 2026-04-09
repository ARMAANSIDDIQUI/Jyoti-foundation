import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { X, Languages } from 'lucide-react';

const MODAL_COOLDOWN = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

export default function LanguageSuggestionModal() {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem('lastLangModalShown');
    const now = Date.now();

    if (!lastShown || now - parseInt(lastShown) > MODAL_COOLDOWN) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('lastLangModalShown', Date.now().toString());
  };

  const handleSwitch = () => {
    const targetLang = currentLanguage === 'en' ? 'hi' : 'en';
    changeLanguage(targetLang);
    handleClose();
  };

  const isEnglish = currentLanguage === 'en';

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-primary/20 overflow-hidden border border-white"
          >
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Languages className="w-8 h-8" />
              </div>

              <h2 className="font-heading text-2xl font-bold text-text mb-4">
                {isEnglish ? 'क्या आप हिन्दी में सहज हैं?' : 'Comfortable in English?'}
              </h2>

              <p className="text-gray-500 mb-8 px-4 leading-relaxed font-medium">
                {isEnglish
                  ? 'आप हमारी वेबसाइट के सभी विवरण हिन्दी में देख सकते हैं।'
                  : 'You can explore all foundation details and initiatives in English for a better experience.'}
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSwitch}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95"
                >
                  {isEnglish ? 'हिन्दी में बदलें' : 'Switch to English'}
                </button>
                <button
                  onClick={handleClose}
                  className="w-full bg-gray-50 hover:bg-gray-100 text-text font-bold py-4 rounded-2xl transition-all"
                >
                  {isEnglish ? 'Continue in Hindi' : 'अंग्रेजी में जारी रखें'}
                </button>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-text hover:bg-gray-100 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
