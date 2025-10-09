import React from 'react';
import { ContentPageLayout, Section } from './ContentPageLayout';
import type { Language } from '../types';
import type { Translations } from '../utils/translations';

interface PrivacyPolicyProps {
    t: Translations[Language];
}

const A: React.FC<{href: string; children: React.ReactNode}> = ({href, children}) => (
    <a href={href} className="text-primary hover:underline">{children}</a>
)

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
                    <li><strong>Account Info:</strong> When you sign up, we ask for personal info like your name and email address.</li>
                    <li><strong>Payment Info:</strong> If you subscribe, you'll provide payment details. This is handled securely by our payment processor. We don't store your full credit card details.</li>
                    <li><strong>Usage Info:</strong> We collect some technical data about how you use our service (like your IP address and which pages you visit). This helps us understand what's working and how to make the service better.</li>
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
                    <li><strong>Contract:</strong> We need it to provide the service you signed up for.</li>
                    <li><strong>Consent:</strong> In some cases, you give us explicit permission.</li>
                    <li><strong>Legitimate Interests:</strong> We have a valid business reason, like improving our service, as long as it doesn't override your rights.</li>
                    <li><strong>Legal Obligation:</strong> Sometimes, the law requires us to process data.</li>
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
                <A href={`mailto:${t.contactEmail}`}>{t.contactEmail}</A>
            </Section>
        </ContentPageLayout>
    );
};