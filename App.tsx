import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
    return (
        <LanguageProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<AboutPage />} />
                    <Route path="generator" element={<HomePage />} />
                    <Route path="terms" element={<TermsPage />} />
                    <Route path="privacy" element={<PrivacyPage />} />
                </Route>
            </Routes>
        </LanguageProvider>
    );
};

export default App;