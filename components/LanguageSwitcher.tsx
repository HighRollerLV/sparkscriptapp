import React, { useState, useRef, useEffect } from 'react';
import type { Language } from '../types';
import { FiGlobe, FiChevronDown } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'lv', label: 'Latviešu' },
];

export const LanguageSwitcher: React.FC = () => {
  const { language: currentLanguage, setLanguage: onChangeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleLanguageSelect = (lang: Language) => {
    onChangeLanguage(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-semibold px-3 py-2 bg-surface rounded-md"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <FiGlobe />
        <span className="uppercase">{currentLanguage}</span>
        <FiChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-36 bg-surface border border-gray-700 rounded-md shadow-lg z-20 py-1">
          {languages.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => handleLanguageSelect(code)}
              className={`w-full text-left px-4 py-2 text-sm ${
                currentLanguage === code ? 'text-primary font-bold' : 'text-gray-300'
              } hover:bg-background`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};