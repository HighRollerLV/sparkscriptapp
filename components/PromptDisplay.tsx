import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiFileText, FiChevronsRight, FiChevronRight, FiCode } from 'react-icons/fi';
import type { Language } from '../types';
import type { Translations } from '../utils/translations';

interface PromptDisplayProps {
  prompt: string;
  isLoading: boolean;
  error: string | null;
  t: Translations[Language];
}

const CopyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const SkeletonLoader: React.FC = () => (
    <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-background rounded w-1/3"></div>
        <div className="space-y-4">
            <div className="h-6 bg-background rounded w-1/2"></div>
            <div className="h-4 bg-background rounded w-full"></div>
            <div className="h-4 bg-background rounded w-5/6"></div>
        </div>
        <div className="space-y-4">
            <div className="h-6 bg-background rounded w-1/2"></div>
            <div className="h-4 bg-background rounded w-full"></div>
            <div className="h-4 bg-background rounded w-5/6"></div>
        </div>
    </div>
);

export const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt, isLoading, error, t }) => {
    const [isCopied, setIsCopied] = useState(false);
    
    const syntaxTheme = vscDarkPlus;

    const markdownComponents = {
        h1: ({ node, ...props }) => (
            <h1 className="flex items-center gap-3 text-2xl font-bold text-primary border-b border-background pb-2 mb-4" {...props}>
                <FiFileText className="text-primary"/>
            </h1>
        ),
        h2: ({ node, ...props }) => (
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white mt-6 mb-3" {...props}>
                <FiChevronsRight className="text-gray-500" />
            </h2>
        ),
        ul: ({ node, ...props }) => <ul className="space-y-2 list-inside" {...props} />,
        li: ({ node, ...props }) => (
            <li className="flex items-start gap-3 text-gray-200" {...props}>
                <FiChevronRight className="text-gray-500 mt-1.5 flex-shrink-0" />
                <span className="flex-grow">{props.children}</span>
            </li>
        ),
        p: ({ node, ...props }) => <p className="text-gray-200 leading-relaxed" {...props} />,
        code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
                <div className="my-4 relative text-sm">
                    <div className="absolute top-2 right-2 text-xs text-gray-400 flex items-center gap-1"><FiCode /> {match[1]}</div>
                    <SyntaxHighlighter style={syntaxTheme} language={match[1]} PreTag="div" {...props}>
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                </div>
            ) : (
                <code className="bg-background text-primary px-1.5 py-1 rounded-md text-sm" {...props}>
                    {children}
                </code>
            );
        },
    };

    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => setIsCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    const handleCopy = () => {
        if (prompt) {
            navigator.clipboard.writeText(prompt);
            setIsCopied(true);
        }
    };
    
    const renderContent = () => {
        if (isLoading && !prompt) {
            return <SkeletonLoader />;
        }

        if (error) {
            return (
                <div className="text-red-400 bg-red-900/30 border border-red-700 p-4 rounded-lg text-center">
                    <h4 className="font-bold mb-2">{t.display_error_title}</h4>
                    <p className="text-sm">{error}</p>
                </div>
            );
        }

        if (!prompt) {
            return (
                <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-200">{t.display_placeholder_title}</h3>
                    <p className="mt-1 max-w-sm">{t.display_placeholder_desc}</p>
                </div>
            );
        }
        
        return (
            <div>
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
                    <h3 className="text-xl font-bold text-white">
                        {t.display_generated_title}
                    </h3>
                    <button
                        onClick={handleCopy}
                        className="bg-background text-gray-300 px-4 py-2 text-sm rounded-md hover:bg-black transition-colors flex items-center gap-2 border border-surface"
                    >
                        {isCopied ? <CheckIcon /> : <CopyIcon />}
                        {isCopied ? t.display_copied : t.display_copy}
                    </button>
                </div>
                <div className="prose max-w-none prose-p:text-gray-200 prose-li:text-gray-200">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={markdownComponents}
                    >
                        {prompt}
                    </ReactMarkdown>
                    {isLoading && <span className="inline-block w-2.5 h-5 bg-primary animate-pulse ml-1 rounded-sm"></span>}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-surface p-6 rounded-xl shadow-lg h-full min-h-[500px] lg:min-h-0 relative overflow-y-auto">
            {renderContent()}
        </div>
    );
};