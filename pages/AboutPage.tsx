import React from 'react';
import { About } from '../components/About';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLanguage } from '../contexts/LanguageContext';

export const AboutPage: React.FC = () => {
    const { t } = useLanguage();
    
    usePageMeta(t.seo_about_title, t.seo_about_desc, '/');

    return <About t={t} />;
};