import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { InputForm } from '../components/InputForm';
import { PromptDisplay } from '../components/PromptDisplay';
import { generateAppPromptStream } from '../services/geminiService';
import { usePageMeta } from '../hooks/usePageMeta';
import type { PromptData } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export const HomePage: React.FC = () => {
    const { t, language } = useLanguage();
    const location = useLocation();

    // State Management
    const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [initialData, setInitialData] = useState<Partial<PromptData> | null>(location.state?.scriptData || null);

    const isApiKeyConfigured = !!process.env.API_KEY;

    useEffect(() => {
        if (location.state?.scriptData) {
            setInitialData(location.state.scriptData);
            // Clear the state from history so it's not re-applied on refresh or back navigation
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);


    // Prompt Generation
    const handleGeneratePrompt = useCallback(async (data: PromptData) => {
        if (!isApiKeyConfigured) return;

        setIsLoading(true);
        setError(null);
        setGeneratedPrompt('');
        document.getElementById('prompt-display-section')?.scrollIntoView({ behavior: 'smooth' });

        try {
            const stream = generateAppPromptStream(data, language);
            for await (const chunk of stream) {
                setGeneratedPrompt((prev) => prev + chunk);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : t.error_failedToGenerate;
            setError(errorMessage);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [language, t.error_failedToGenerate, isApiKeyConfigured]);

    // SEO and Meta Tags
    usePageMeta(t.seo_generator_title, t.seo_generator_desc, '/prompt-builder');

    return (
        <div id="generator-section">
             <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center leading-tight">
                {t.generator_title_part1}{' '}
                <span className="text-primary">{t.generator_title_part2_highlight}</span>
             </h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto text-center mb-12">
                {t.about_hero_subtitle}
            </p>
            <div id="prompt-display-section" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <InputForm onGenerate={handleGeneratePrompt} isLoading={isLoading} t={t} isApiKeyConfigured={isApiKeyConfigured} initialData={initialData} />
                <PromptDisplay prompt={generatedPrompt} isLoading={isLoading} error={error} t={t} />
            </div>
        </div>
    );
};