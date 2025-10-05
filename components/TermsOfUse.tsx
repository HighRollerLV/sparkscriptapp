import React from 'react';
import { ContentPageLayout, Section } from './ContentPageLayout';
import type { Language } from '../types';
import type { Translations } from '../utils/translations';

interface TermsOfUseProps {
    t: Translations[Language];
}

export const TermsOfUse: React.FC<TermsOfUseProps> = ({t}) => {
    return (
        <ContentPageLayout title={t.termsOfUse}>
            <p className="text-sm text-gray-500"><strong>{t.lastUpdated}:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <Section title={t.terms_section1_title}>
                <p>{t.terms_section1_p1}</p>
                <p>{t.terms_section1_p2}</p>
                <p>{t.terms_section1_p3}</p>
            </Section>

            <Section title={t.terms_section2_title}>
                <p>{t.terms_section2_p1}</p>
                <p>{t.terms_section2_p2}</p>
            </Section>

            <Section title={t.terms_section3_title}>
                <p>{t.terms_section3_p1}</p>
                <p>{t.terms_section3_p2}</p>
                <p>{t.terms_section3_p3}</p>
            </Section>

            <Section title={t.terms_section4_title}>
                <p>{t.terms_section4_p1}</p>
            </Section>

            <Section title={t.terms_section5_title}>
                <p>{t.terms_section5_p1}</p>
                <p>{t.terms_section5_p2}</p>
            </Section>

            <Section title={t.terms_section6_title}>
                <p>{t.terms_section6_p1}</p>
            </Section>
            
            <Section title={t.terms_section7_title}>
                <p>{t.terms_section7_p1}</p>
            </Section>

            <Section title={t.terms_section8_title}>
                <p>{t.terms_section8_p1}</p>
            </Section>

            <Section title={t.terms_section9_title}>
                <p>{t.terms_section9_p1}</p>
            </Section>

            <Section title={t.terms_section10_title}>
                <p>{t.terms_section10_p1}</p>
                 <a href={`mailto:${t.contactEmail}`} className="text-[#FFBE00] hover:underline">{t.contactEmail}</a>
            </Section>
        </ContentPageLayout>
    );
};