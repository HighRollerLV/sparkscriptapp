import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { GeneratorPage } from './components/GeneratorPage';
import { TermsPage } from './components/TermsPage';
import { PrivacyPage } from './components/PrivacyPage';

// Helper to check if a string is a valid language code
const isValidLang = (lang: string | undefined): lang is 'en' | 'ru' | 'lv' => {
  return lang === 'en' || lang === 'ru' || lang === 'lv';
};

// A component to handle redirects for invalid language codes
const LangRedirect: React.FC = () => <Navigate to="/en" replace />;

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/:lang" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="generator" element={<GeneratorPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
      </Route>
      {/* Redirect from root to the default language */}
      <Route path="/" element={<Navigate to="/en" replace />} />
       {/* Catch-all for any other invalid paths */}
      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  );
};

export default App;
