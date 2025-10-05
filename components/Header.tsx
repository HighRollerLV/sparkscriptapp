import React from 'react';
import { Link } from 'react-router-dom';
import type { Language } from '../types';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { Translations } from '../utils/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  t: Translations[Language];
}

export const Header: React.FC<HeaderProps> = ({ language, onLanguageChange, t }) => {
  return (
    <header className="bg-[#14171A]/80 backdrop-blur-sm border-b border-[#22272B] sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to={`/${language}`} className="flex items-center gap-3" aria-label={t.aria_label_homepage}>
            <div className="w-10 h-10 bg-[#FFBE00] rounded-lg flex items-center justify-center shadow-lg shadow-[#FFBE00]/20">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#14171A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25" />
                </svg>
            </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            <span style={{ color: '#FFBE00' }}>Spark</span>Script
          </h1>
        </Link>
        <nav className="flex items-center gap-4">
            <Link to={`/${language}/generator`} className="text-gray-300 hover:text-white transition-colors font-semibold">
                {t.promptBuilder}
            </Link>
            <LanguageSwitcher currentLanguage={language} onChangeLanguage={onLanguageChange} />
        </nav>
      </div>
    </header>
  );
};
