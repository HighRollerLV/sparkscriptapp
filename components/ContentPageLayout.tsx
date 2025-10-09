import React from 'react';

export const ContentPageLayout: React.FC<{title: string; children: React.ReactNode}> = ({title, children}) => (
    <div className="max-w-4xl mx-auto text-white animate-fade-in">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-primary">{title}</h1>
        <div className="space-y-6 text-gray-300 bg-surface p-8 rounded-xl shadow-lg">
            {children}
        </div>
    </div>
);

export const Section: React.FC<{title: string; children: React.ReactNode}> = ({title, children}) => (
    <section>
        <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
        <div className="space-y-4 text-gray-400 leading-relaxed">
            {children}
        </div>
    </section>
);