import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { PrivacyPolicy } from './PrivacyPolicy';
import type { Language } from '../types';
import type { Translations } from '../utils/translations';

interface OutletContextType {
    t: Translations[Language];
}

export const PrivacyPage: React.FC = () => {
    const { t } = useOutletContext<OutletContextType>();
    return <PrivacyPolicy t={t} />;
};
