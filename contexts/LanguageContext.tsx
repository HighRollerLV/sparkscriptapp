import React, { createContext, useState, useContext, useMemo } from 'react';
import type { Language } from '../types';
import { translations } from '../utils/translations';
import type { Translations } from '../utils/translations';
import { getCookie, setCookie } from '../utils/cookies';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations[Language];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const cookieLang = getCookie('lang');
    if (cookieLang === 'en' || cookieLang === 'ru' || cookieLang === 'lv') {
        return cookieLang;
    }
    return 'en';
  });

  const handleSetLanguage = (newLang: Language) => {
      setLanguageState(newLang);
      setCookie('lang', newLang, 365);
  };

  const t = useMemo(() => translations[language], [language]);

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};