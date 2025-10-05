import React from 'react';
import { ContentPageLayout, Section } from './ContentPageLayout';
import type { Language } from '../types';
import type { Translations } from '../utils/translations';

interface PrivacyPolicyProps {
    t: Translations[Language];
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({t}) => {
    return (
        <ContentPageLayout title={t.privacyPolicy}>
             <p className="text-sm text-gray-500"><strong>{t.lastUpdated}:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <Section title={t.privacy_section1_title}>
                <p>{t.privacy_section1_p1}</p>
                <p>{t.privacy_section1_p2}</p>
            </Section>

            <Section title={t.privacy_section2_title}>
                <p>{t.privacy_section2_p1}</p>
                <ul className="list-disc list-inside space-y-2">
                    <li dangerouslySetInnerHTML={{ __html: t.privacy_section2_li1 }}></li>
                    <li dangerouslySetInnerHTML={{ __html: t.privacy_section2_li2 }}></li>
                    <li dangerouslySetInnerHTML={{ __html: t.privacy_section2_li3 }}></li>
                </ul>
            </Section>

            <Section title={t.privacy_section3_title}>
                <p>{t.privacy_section3_p1}</p>
            </Section>

            <Section title={t.privacy_section4_title}>
                <p>{t.privacy_section4_p1}</p>
                 <ul className="list-disc list-inside space-y-2">
                    <li>{t.privacy_section4_li1}</li>
                    <li>{t.privacy_section4_li2}</li>
                    <li>{t.privacy_section4_li3}</li>
                    <li>{t.privacy_section4_li4}</li>
                    <li>{t.privacy_section4_li5}</li>
                    <li>{t.privacy_section4_li6}</li>
                </ul>
            </Section>

            <Section title={t.privacy_section5_title}>
                 <p>{t.privacy_section5_p1}</p>
                 <ul className="list-disc list-inside space-y-2">
                    <li dangerouslySetInnerHTML={{ __html: t.privacy_section5_li1 }}></li>
                    <li dangerouslySetInnerHTML={{ __html: t.privacy_section5_li2 }}></li>
                    <li dangerouslySetInnerHTML={{ __html: t.privacy_section5_li3 }}></li>
                    <li dangerouslySetInnerHTML={{ __html: t.privacy_section5_li4 }}></li>
                </ul>
            </Section>

            <Section title={t.privacy_section6_title}>
                 <p>{t.privacy_section6_p1}</p>
                 <ul className="list-disc list-inside space-y-2">
                    <li>{t.privacy_section6_li1}</li>
                    <li>{t.privacy_section6_li2}</li>
                    <li>{t.privacy_section6_li3}</li>
                    <li>{t.privacy_section6_li4}</li>
                    <li>{t.privacy_section6_li5}</li>
                    <li>{t.privacy_section6_li6}</li>
                </ul>
                 <p className="mt-4">{t.privacy_section6_p2}</p>
            </Section>

            <Section title={t.privacy_section7_title}>
                <p>{t.privacy_section7_p1}</p>
            </Section>

            <Section title={t.privacy_section8_title}>
                <p>{t.privacy_section8_p1}</p>
            </Section>

            <Section title={t.privacy_section9_title}>
                <p>{t.privacy_section9_p1}</p>
                <a href={`mailto:${t.contactEmail}`} className="text-[#FFBE00] hover:underline">{t.contactEmail}</a>
            </Section>
        </ContentPageLayout>
    );
};