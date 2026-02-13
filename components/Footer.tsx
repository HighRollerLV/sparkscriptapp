import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-background border-t border-surface mt-16">
      <div className="container mx-auto px-4 py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              <span className="text-primary">Spark</span>Script
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional AI prompt generator for developers and creators. Generate precise prompts for 50+ AI tools.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/prompt-builder" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Prompt Generator
              </Link>
              <Link to="/scripts" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Template Library
              </Link>
              <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm">
                About SparkScript
              </Link>
            </nav>
          </div>

          {/* Categories Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Categories</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/prompt-builder?category=website" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Web Development
              </Link>
              <Link to="/prompt-builder?category=image" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Image Generation
              </Link>
              <Link to="/prompt-builder?category=music" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Music Production
              </Link>
              <Link to="/prompt-builder?category=video" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Video Creation
              </Link>
            </nav>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/terms" className="text-gray-400 hover:text-primary transition-colors text-sm">
                {t.termsOfUse}
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors text-sm">
                {t.privacyPolicy}
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-surface pt-6 text-center text-gray-400 text-sm">
          <p className="mb-2">&copy; {new Date().getFullYear()} SIA Lucidious. All rights reserved.</p>
          <p>
            <a href={`mailto:${t.contactEmail}`} className="hover:text-primary transition-colors">
              {t.contactEmail}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};