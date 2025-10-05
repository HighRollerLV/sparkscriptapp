import React from 'react';
import type { Language, Page } from '../types';
import type { Translations } from '../utils/translations';

interface FooterProps {
  navigate: (page: Page) => void;
  t: Translations[Language];
}

export const Footer: React.FC<FooterProps> = ({ navigate, t }) => {
  return (
    <footer className="bg-[#14171A] border-t border-[#22272B] mt-16">
      <div className="container mx-auto px-4 py-6 text-center text-gray-400 text-sm">
        <div className="flex justify-center gap-6 mb-4">
            <button onClick={() => navigate('terms')} className="hover:text-[#FFBE00] transition-colors">{t.termsOfUse}</button>
            <button onClick={() => navigate('privacy')} className="hover:text-[#FFBE00] transition-colors">{t.privacyPolicy}</button>
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