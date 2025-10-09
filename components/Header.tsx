import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

export const Header: React.FC = () => {
  const { t } = useLanguage();
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-gray-300 hover:text-white transition-colors font-medium ${isActive ? 'text-primary' : ''}`;

  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-surface sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" aria-label={t.aria_label_homepage}>
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25" />
                </svg>
            </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            <span className="text-primary">Spark</span>Script
          </h1>
        </Link>
        <nav className="flex items-center gap-6">
            <NavLink to="/" end className={navLinkClasses}>
                {t.nav_about}
            </NavLink>
            <NavLink to="/generator" className={navLinkClasses}>
                {t.promptBuilder}
            </NavLink>
            <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
};