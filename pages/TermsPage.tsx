import React from 'react';
import { TermsOfUse } from '../components/TermsOfUse';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLanguage } from '../contexts/LanguageContext';

export const TermsPage: React.FC = () => {
    const { t } = useLanguage();

    usePageMeta(t.seo_terms_title, t.seo_terms_desc, '/terms');

    return <TermsOfUse t={t} />;
};