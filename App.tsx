import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ScriptsPage } from './pages/ScriptsPage';
import { LanguageProvider } from './contexts/LanguageContext';

// Fix for TypeScript error: Property 'gtag' does not exist on type 'Window & typeof globalThis'.
// This declares the gtag function on the window object, which is added by the Google Analytics script.
declare global {
    interface Window {
        gtag?: (
            command: 'config',
            targetId: string,
            config: { [key: string]: string }
        ) => void;
    }
}

const GA_MEASUREMENT_ID = 'G-ZGX3RYC0M7';

// This component handles application-wide logic that depends on the router context.
const AppContent: React.FC = () => {
    const location = useLocation();

    // Effect for smooth scrolling to top on navigation
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [location.pathname]);

    // Effect for Google Analytics page tracking in a Single Page Application
    useEffect(() => {
        if (typeof window.gtag === 'function') {
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: location.pathname + location.search + location.hash,
                page_title: document.title,
            });
        }
    }, [location]);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<AboutPage />} />
                <Route path="prompt-builder" element={<HomePage />} />
                <Route path="scripts" element={<ScriptsPage />} />
                <Route path="terms" element={<TermsPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
            </Route>
        </Routes>
    );
};


const App: React.FC = () => {
    return (
        <LanguageProvider>
            <AppContent />
        </LanguageProvider>
    );
};

export default App;