import React, { useState, useEffect } from 'react';
import { Outlet, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { translations } from '../utils/translations';
import { getCookie, setCookie } from '../utils/cookies';
import type { Language } from '../types';

const isValidLang = (lang?: string): lang is Language => {
    return !!lang && ['en', 'ru', 'lv'].includes(lang);
};

export const Layout: React.FC = () => {
    const { lang } = useParams<{ lang: string }>();
    const location = useLocation();
    const navigate = useNavigate();

    const [language, setLanguage] = useState<Language>(() => {
        if (isValidLang(lang)) return lang;
        const cookieLang = getCookie('lang');
        if (isValidLang(cookieLang)) return cookieLang;
        return 'en';
    });

    useEffect(() => {
        if (isValidLang(lang)) {
            if (lang !== language) {
                setLanguage(lang);
                setCookie('lang', lang, 365);
            }
        } else {
             // If URL has an invalid lang, redirect to the current valid language's equivalent page
            navigate(`/${language}${location.pathname.substring(location.pathname.indexOf('/', 1))}`, { replace: true });
        }
    }, [lang, language, location.pathname, navigate]);


    const handleLanguageChange = (newLang: Language) => {
        setLanguage(newLang);
        setCookie('lang', newLang, 365);
        // Update URL to reflect language change
        const newPath = location.pathname.replace(`/${lang}`, `/${newLang}`);
        navigate(newPath);
    };

    const t = translations[language];

    // SEO and Meta Tag Management
    useEffect(() => {
        document.documentElement.lang = language;
        window.scrollTo(0, 0);

        let pageKey = location.pathname.split('/')[2] || 'about';
        if (pageKey === '') pageKey = 'about';


        const pageTitles: { [key: string]: string } = {
            about: t.seo_about_title,
            generator: t.seo_generator_title,
            terms: t.seo_terms_title,
            privacy: t.seo_privacy_title,
        };

        const pageDescriptions: { [key: string]: string } = {
            about: t.seo_about_desc,
            generator: t.seo_generator_desc,
            terms: t.seo_terms_desc,
            privacy: t.seo_privacy_desc,
        };

        const title = pageTitles[pageKey] || 'SparkScript';
        const description = pageDescriptions[pageKey] || t.seo_default_desc;
        
        document.title = title;
        
        const updateMeta = (selector: string, content: string) => {
            let el = document.querySelector(selector) as HTMLMetaElement | null;
            if (el) {
                el.content = content;
            }
        };
        
        const updateLink = (selector: string, href: string) => {
             let el = document.querySelector(selector) as HTMLLinkElement | null;
            if (el) {
                el.href = href;
            }
        }

        const canonicalUrl = `https://www.sparkscript.tech${location.pathname}`;

        updateMeta('meta[name="description"]', description);
        updateMeta('meta[property="og:title"]', title);
        updateMeta('meta[property="og:description"]', description);
        updateMeta('meta[name="twitter:title"]', title);
        updateMeta('meta[name="twitter:description"]', description);
        updateMeta('meta[property="og:url"]', canonicalUrl);
        updateLink('link[rel="canonical"]', canonicalUrl);

    }, [location.pathname, language, t]);


    return (
        <div className="min-h-screen bg-[#14171A] text-white font-sans flex flex-col">
            <Header language={language} onLanguageChange={handleLanguageChange} t={t} />
            <main className="container mx-auto px-4 py-8 flex-grow">
                <Outlet context={{ t, language }} />
            </main>
            <Footer t={t} language={language}/>
        </div>
    );
};
