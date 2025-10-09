import React from 'react';
import { PrivacyPolicy } from '../components/PrivacyPolicy';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLanguage } from '../contexts/LanguageContext';

export const PrivacyPage: React.FC = () => {
    const { t } = useLanguage();

    usePageMeta(t.seo_privacy_title, t.seo_privacy_desc, '/privacy');

    return <PrivacyPolicy t={t} />;
};