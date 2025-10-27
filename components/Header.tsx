import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

const AnimatedHamburgerIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
    <div className="w-6 h-5 flex flex-col justify-between items-center">
        <span className={`block w-full h-0.5 bg-gray-300 transform transition duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-full h-0.5 bg-gray-300 transition duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-full h-0.5 bg-gray-300 transform transition duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
    </div>
);

const MobileMenu: React.FC<{ isOpen: boolean; closeMenu: () => void }> = ({ isOpen, closeMenu }) => {
    const { t } = useLanguage();
    const navLinkClasses = "text-2xl text-gray-300 hover:text-primary transition-colors";

    return (
        <div className={`fixed inset-0 bg-background/95 backdrop-blur-sm z-40 flex items-center justify-center transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <nav className="flex flex-col items-center gap-8">
                <NavLink to="/" end onClick={closeMenu} className={({isActive}) => `${navLinkClasses} ${isActive ? 'text-primary' : ''}`}>
                    {t.nav_about}
                </NavLink>
                 <NavLink to="/scripts" onClick={closeMenu} className={({isActive}) => `${navLinkClasses} ${isActive ? 'text-primary' : ''}`}>
                    {t.nav_scripts}
                </NavLink>
                <NavLink to="/prompt-builder" onClick={closeMenu} className={({isActive}) => `${navLinkClasses} ${isActive ? 'text-primary' : ''}`}>
                    {t.promptBuilder}
                </NavLink>
                <div className="mt-4">
                    <LanguageSwitcher />
                </div>
            </nav>
        </div>
    );
};

export const Header: React.FC = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-gray-300 hover:text-white transition-colors font-medium ${isActive ? 'text-primary' : ''}`;

  useEffect(() => {
      // Close mobile menu on route change
      setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    // Cleanup function
    return () => {
        document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="bg-background/80 backdrop-blur-sm border-b border-surface sticky top-0 z-50">
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
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
              <NavLink to="/" end className={navLinkClasses}>
                  {t.nav_about}
              </NavLink>
              <NavLink to="/scripts" className={navLinkClasses}>
                  {t.nav_scripts}
              </NavLink>
              <NavLink to="/prompt-builder" className={navLinkClasses}>
                  {t.promptBuilder}
              </NavLink>
              <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden z-50 p-2 -mr-2"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
          >
              <AnimatedHamburgerIcon isOpen={isMenuOpen} />
          </button>
        </div>
      </header>
      <MobileMenu isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
    </>
  );
};