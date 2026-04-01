import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang) {
      setCurrentLanguage(savedLang);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
