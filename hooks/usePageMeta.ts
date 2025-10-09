import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const updateMeta = (selector: string, content: string) => {
    const el = document.querySelector(selector) as HTMLMetaElement | null;
    if (el) {
        el.content = content;
    }
};

const updateLink = (selector: string, href: string) => {
    const el = document.querySelector(selector) as HTMLLinkElement | null;
    if (el) {
        el.href = href;
    }
}

export const usePageMeta = (title: string, description: string, path: string) => {
    const { language } = useLanguage();
    useEffect(() => {
        document.documentElement.lang = language;
        document.title = title;
        
        const canonicalUrl = `https://www.sparkscript.tech/#${path}`;
        
        updateMeta('meta[name="description"]', description);
        updateMeta('meta[property="og:title"]', title);
        updateMeta('meta[property="og:description"]', description);
        updateMeta('meta[name="twitter:title"]', title);
        updateMeta('meta[name="twitter:description"]', description);
        updateMeta('meta[property="og:url"]', canonicalUrl);
        updateLink('link[rel="canonical"]', canonicalUrl);

    }, [language, title, description, path]);
};