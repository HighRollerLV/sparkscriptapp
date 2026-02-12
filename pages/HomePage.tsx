import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { InputForm } from '../components/InputForm';
import { PromptDisplay } from '../components/PromptDisplay';
import { generateAppPromptStream } from '../services/artificialService';
import { usePageMeta } from '../hooks/usePageMeta';
import type { PromptData, PromptCategory } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { FiLayout, FiImage, FiMusic, FiVideo, FiLock, FiCheckCircle } from 'react-icons/fi';

export const HomePage: React.FC = () => {
    const { t, language } = useLanguage();
    const location = useLocation();

    const [category, setCategory] = useState<PromptCategory>('website');
    const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [initialData, setInitialData] = useState<Partial<PromptData> | null>(location.state?.scriptData || null);

    // Check if API key is configured
    const isApiKeyConfigured = !!process.env.API_KEY;

    useEffect(() => {
        if (location.state?.scriptData) {
            setInitialData(location.state.scriptData);
            if (location.state.scriptData.category) {
                setCategory(location.state.scriptData.category);
            }
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const handleGeneratePrompt = useCallback(async (data: PromptData) => {
        if (!isApiKeyConfigured) return;

        setIsLoading(true);
        setError(null);
        setGeneratedPrompt('');
        document.getElementById('prompt-display-section')?.scrollIntoView({ behavior: 'smooth' });

        try {
            const stream = generateAppPromptStream({ ...data, category }, language);
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
    }, [language, t.error_failedToGenerate, category, isApiKeyConfigured]);

    usePageMeta(t.seo_generator_title, t.seo_generator_desc, '/prompt-builder');

    const categories: { id: PromptCategory; label: string; icon: React.ReactNode }[] = [
        { id: 'website', label: t.cat_website, icon: <FiLayout /> },
        { id: 'image', label: t.cat_image, icon: <FiImage /> },
        { id: 'music', label: t.cat_music, icon: <FiMusic /> },
        { id: 'video', label: t.cat_video, icon: <FiVideo /> },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            id="generator-section"
            className="max-w-[1400px] mx-auto px-4"
        >
             <div className="text-center mb-10 mt-4">
                <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight tracking-tight">
                    {t.generator_title_part1}{' '}
                    <span className="text-primary">{t.generator_title_part2_highlight}</span>
                </h1>

                <div className="flex flex-col items-center gap-4">
                    {/* Category Navigation */}
                    <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-3xl mx-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => { setCategory(cat.id); setGeneratedPrompt(''); }}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all border-2 ${
                                    category === cat.id 
                                    ? 'bg-primary text-background border-primary shadow-lg shadow-primary/20 scale-105' 
                                    : 'bg-surface text-gray-400 border-white/5 hover:border-primary/50'
                                }`}
                            >
                                {cat.icon}
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* API Status Badge */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/50 border border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500">
                        {isApiKeyConfigured ? (
                            <>
                                <FiCheckCircle className="text-green-500" />
                                <span className="text-green-500/80">{t.apiKey_connected}</span>
                            </>
                        ) : (
                            <>
                                <FiLock className="text-amber-500" />
                                <span className="text-amber-500/80">{t.error_apiKeyMissing}</span>
                            </>
                        )}
                    </div>
                </div>
             </div>

            <div id="prompt-display-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
                <AnimatePresence>
                    {!isApiKeyConfigured && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-md rounded-3xl border border-white/5"
                        >
                            <div className="bg-surface p-8 md:p-12 rounded-[2rem] border border-primary/20 shadow-2xl max-w-md text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                                    <FiLock size={32} />
                                </div>
                                <h2 className="text-2xl font-black text-white mb-4">{t.apiKey_needConnection_title}</h2>
                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    {t.apiKey_needConnection_desc}
                                </p>
                                <p className="text-sm text-gray-300 bg-surface/50 p-4 rounded-lg mb-6">
                                    Please add your API key to the <code className="text-primary font-mono">.env</code> file:
                                    <br />
                                    <code className="text-primary font-mono text-xs block mt-2">REACT_APP_API_KEY=your_api_key</code>
                                </p>
                                <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">
                                    <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                        {t.apiKey_billing_notice}
                                    </a>
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="lg:col-span-5 xl:col-span-4">
                    <InputForm
                        category={category}
                        onGenerate={handleGeneratePrompt}
                        isLoading={isLoading}
                        t={t}
                        initialData={initialData}
                    />
                </div>
                <div className="lg:col-span-7 xl:col-span-8 h-full">
                    <div className="sticky top-24 lg:h-[calc(100vh-140px)] min-h-[500px]">
                         <PromptDisplay prompt={generatedPrompt} isLoading={isLoading} error={error} t={t} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

