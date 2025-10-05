import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { About } from './About';
import type { Language } from '../types';
import type { Translations } from '../utils/translations';

interface OutletContextType {
    t: Translations[Language];
    language: Language;
}

export const HomePage: React.FC = () => {
    const { t, language } = useOutletContext<OutletContextType>();
    return <About t={t} language={language} />;
};
