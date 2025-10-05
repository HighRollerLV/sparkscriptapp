import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { PromptDisplay } from './components/PromptDisplay';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { TermsOfUse } from './components/TermsOfUse';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { generateAppPromptStream } from './services/geminiService';
import { translations } from './utils/translations';
import { getCookie, setCookie } from './utils/cookies';
import type { PromptData, Language, Page } from './types';

const App: React.FC = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('about');
  const [language, setLanguage] = useState<Language>(() => {
    return (getCookie('lang') as Language) || 'en';
  });

  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    
    const pageTitles = {
        about: t.seo_about_title,
        generator: t.seo_generator_title,
        terms: t.seo_terms_title,
        privacy: t.seo_privacy_title,
    };

    const pageDescriptions = {
        about: t.seo_about_desc,
        generator: t.seo_generator_desc,
        terms: t.seo_terms_desc,
        privacy: t.seo_privacy_desc,
    };

    const title = pageTitles[currentPage] || 'SparkScript';
    const description = pageDescriptions[currentPage] || t.seo_default_desc;
    
    document.title = title;
    
    const updateMeta = (selector: string, content: string, isProperty: boolean = false) => {
        const el = document.querySelector(selector);
        if (el) {
            el.setAttribute(isProperty ? 'property' : 'name', selector.substring(selector.indexOf('[') + 1, selector.indexOf('=')));
            el.setAttribute('content', content);
        }
    };

    updateMeta('meta[name="description"]', description);
    updateMeta('meta[property="og:title"]', title, true);
    updateMeta('meta[property="og:description"]', description, true);
    updateMeta('meta[name="twitter:title"]', title);
    updateMeta('meta[name="twitter:description"]', description);

    const canonicalUrl = `https://sparkscript.dev/${language}/${currentPage === 'about' ? '' : currentPage}`;
    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
        canonicalEl.setAttribute('href', canonicalUrl);
    }
     updateMeta('meta[property="og:url"]', canonicalUrl, true);


  }, [currentPage, language, t]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setCookie('lang', lang, 365);
  };

  const handleGeneratePrompt = useCallback(async (data: PromptData) => {
    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');

    try {
      const stream = generateAppPromptStream(data, language);
      for await (const chunk of stream) {
        setGeneratedPrompt((prev) => prev + chunk);
      }
    } catch (err) {
      setError(t.error_failedToGenerate);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [language, t.error_failedToGenerate]);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'generator':
        return (
          <>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center" dangerouslySetInnerHTML={{ __html: t.generator_page_title }}></h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <InputForm onGenerate={handleGeneratePrompt} isLoading={isLoading} t={t} />
              <PromptDisplay prompt={generatedPrompt} isLoading={isLoading} error={error} t={t}/>
            </div>
          </>
        );
      case 'terms':
        return <TermsOfUse t={t} />;
      case 'privacy':
        return <PrivacyPolicy t={t} />;
      case 'about':
      default:
        return <About navigate={navigate} t={t} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#14171A] text-white font-sans flex flex-col">
      <Header navigate={navigate} language={language} onLanguageChange={handleLanguageChange} t={t} />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {renderPage()}
      </main>
      <Footer navigate={navigate} t={t} />
    </div>
  );
};

export default App;