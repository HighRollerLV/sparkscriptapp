import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#14171A] border-t border-[#22272B] mt-16">
      <div className="container mx-auto px-4 py-6 text-center text-gray-400 text-sm">
        <div className="flex justify-center gap-6 mb-4">
            <Link to="/terms" className="hover:text-[#FFBE00] transition-colors">{t.termsOfUse}</Link>
            <Link to="/privacy" className="hover:text-[#FFBE00] transition-colors">{t.privacyPolicy}</Link>
        </div>
        <div className="space-y-2">
            <p>&copy; {new Date().getFullYear()} SIA Lucidious. All rights reserved.</p>
            <p>
                <a href={`mailto:${t.contactEmail}`} className="hover:text-[#FFBE00] transition-colors">
                    {t.contactEmail}
                </a>
            </p>
        </div>
      </div>
    </footer>
  );
};