import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { TermsOfUse } from './TermsOfUse';
import type { Language } from '../types';
import type { Translations } from '../utils/translations';

interface OutletContextType {
    t: Translations[Language];
}

export const TermsPage: React.FC = () => {
    const { t } = useOutletContext<OutletContextType>();
    return <TermsOfUse t={t} />;
};
