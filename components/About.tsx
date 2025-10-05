import React from 'react';
import { FiZap, FiCpu, FiFeather, FiSend, FiExternalLink, FiLayout, FiDatabase, FiCode, FiBox } from 'react-icons/fi';
import type { Language, Page } from '../types';
import type { Translations } from '../utils/translations';

interface AboutProps {
    navigate: (page: Page) => void;
    t: Translations[Language];
}

const ValueCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-[#22272B] p-6 rounded-xl shadow-lg text-center">
        <div className="mx-auto w-16 h-16 mb-4 bg-[#14171A] rounded-full flex items-center justify-center text-[#FFBE00]">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-[#FFBE00] mb-2">{title}</h3>
        <p className="text-gray-300">{children}</p>
    </div>
);

const ToolLinkCard: React.FC<{ icon: React.ReactNode; name: string; description: string; url: string }> = ({ icon, name, description, url }) => (
    <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block bg-[#22272B] p-6 rounded-xl shadow-lg hover:bg-[#14171A] border border-transparent hover:border-[#FFBE00] transition-all duration-300 group"
    >
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
                <div className="text-[#FFBE00]">{icon}</div>
                <h4 className="font-bold text-white text-lg">{name}</h4>
            </div>
            <FiExternalLink className="text-gray-500 group-hover:text-[#FFBE00] transition-colors" />
        </div>
        <p className="text-gray-400 text-sm">{description}</p>
    </a>
);


export const About: React.FC<AboutProps> = ({ navigate, t }) => {
    return (
        <div className="max-w-4xl mx-auto text-white animate-fade-in">
            <section className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: t.about_hero_title }}></h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    {t.about_hero_subtitle}
                </p>
                <button 
                    onClick={() => navigate('generator')}
                    className="mt-8 bg-[#FFBE00] text-[#14171A] font-bold py-3 px-8 rounded-lg transition-all duration-300 filter hover:brightness-110 shadow-lg shadow-[#FFBE00]/20 text-lg"
                >
                    {t.about_hero_cta}
                </button>
            </section>

            <section className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-8">{t.about_mission_title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ValueCard icon={<FiZap size={28} />} title={t.about_value1_title}>
                        {t.about_value1_desc}
                    </ValueCard>
                    <ValueCard icon={<FiFeather size={28} />} title={t.about_value2_title}>
                        {t.about_value2_desc}
                    </ValueCard>
                    <ValueCard icon={<FiSend size={28} />} title={t.about_value3_title}>
                        {t.about_value3_desc}
                    </ValueCard>
                </div>
            </section>
            
            <section className="mb-16 bg-[#22272B] p-8 rounded-xl shadow-lg">
                 <h2 className="text-3xl font-bold text-center mb-6">{t.about_why_title}</h2>
                 <p className="text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
                    {t.about_why_desc}
                 </p>
            </section>

            <section>
                <h2 className="text-3xl font-bold text-center mb-2">{t.about_tools_title}</h2>
                <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
                    {t.about_tools_desc}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ToolLinkCard
                        icon={<FiLayout size={24} />}
                        name="Lovable"
                        description={t.tool_lovable_desc}
                        url="https://lovable.dev"
                    />
                    <ToolLinkCard
                        icon={<FiDatabase size={24} />}
                        name="bolt.new"
                        description={t.tool_bolt_desc}
                        url="https://bolt.new"
                    />
                    <ToolLinkCard
                        icon={<FiCpu size={24} />}
                        name="Google AI Studio"
                        description={t.tool_google_ai_studio_desc}
                        url="https://aistudio.google.com/"
                    />
                    <ToolLinkCard
                        icon={<FiCode size={24} />}
                        name="Cursor"
                        description={t.tool_cursor_desc}
                        url="https://cursor.sh/"
                    />
                    <ToolLinkCard
                        icon={<FiBox size={24} />}
                        name="v0.dev by Vercel"
                        description={t.tool_v0_desc}
                        url="https://v0.dev"
                    />
                     <ToolLinkCard
                        icon={<FiZap size={24} />}
                        name="Replit"
                        description={t.tool_replit_desc}
                        url="https://replit.com"
                    />
                </div>
            </section>
        </div>
    );
};