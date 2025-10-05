import React, { useState, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { InputForm } from './InputForm';
import { PromptDisplay } from './PromptDisplay';
import { generateAppPromptStream } from '../services/geminiService';
import type { PromptData, Language } from '../types';
import type { Translations } from '../utils/translations';

interface OutletContextType {
    t: Translations[Language];
    language: Language;
}

export const GeneratorPage: React.FC = () => {
    const { t, language } = useOutletContext<OutletContextType>();
    const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
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
            const errorMessage = err instanceof Error ? err.message : t.error_failedToGenerate;
            setError(errorMessage);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [language, t.error_failedToGenerate]);

    return (
        <>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center" dangerouslySetInnerHTML={{ __html: t.generator_page_title }}></h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <InputForm onGenerate={handleGeneratePrompt} isLoading={isLoading} t={t} />
                <PromptDisplay prompt={generatedPrompt} isLoading={isLoading} error={error} t={t} />
            </div>
        </>
    );
};
