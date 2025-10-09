import React, { useState, useCallback } from 'react';
import { InputForm } from '../components/InputForm';
import { PromptDisplay } from '../components/PromptDisplay';
import { generateAppPromptStream } from '../services/geminiService';
import { usePageMeta } from '../hooks/usePageMeta';
import type { PromptData } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export const HomePage: React.FC = () => {
    const { t, language } = useLanguage();
    
    // State Management
    const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Prompt Generation
    const handleGeneratePrompt = useCallback(async (data: PromptData) => {
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
    }, [language, t.error_failedToGenerate]);

    // SEO and Meta Tags
    usePageMeta(t.seo_generator_title, t.seo_generator_desc, '/generator');

    return (
        <div id="generator-section">
             <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center leading-tight" dangerouslySetInnerHTML={{ __html: t.generator_page_title }}></h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto text-center mb-12">
                {t.about_hero_subtitle}
            </p>
            <div id="prompt-display-section" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <InputForm onGenerate={handleGeneratePrompt} isLoading={isLoading} t={t} />
                <PromptDisplay prompt={generatedPrompt} isLoading={isLoading} error={error} t={t} />
            </div>
        </div>
    );
};