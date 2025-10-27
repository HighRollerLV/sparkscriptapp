import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { scripts } from '../data/scripts';
import { ScriptCard } from '../components/ScriptCard';
import { FiMousePointer, FiDatabase, FiEdit3, FiCopy } from 'react-icons/fi';

const TutorialStep: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-surface rounded-lg flex items-center justify-center text-primary text-2xl">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-white text-lg mb-1">{title}</h4>
            <p className="text-gray-400 text-sm">{children}</p>
        </div>
    </div>
);

export const ScriptsPage: React.FC = () => {
  const { t } = useLanguage();

  usePageMeta(t.seo_scripts_title, t.seo_scripts_desc, '/scripts');

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            {t.scripts_page_title_part1}{' '}
            <span className="text-primary">{t.scripts_page_title_part2_highlight}</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            {t.scripts_page_subtitle}
        </p>
      </div>

      <section className="bg-surface p-8 rounded-xl shadow-lg mb-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">{t.scripts_seo_title}</h2>
        <div className="text-gray-300 space-y-4 max-w-3xl mx-auto text-center">
            <p>{t.scripts_seo_desc_p1}</p>
            <p>{t.scripts_seo_desc_p2}</p>
        </div>

        <div className="mt-10">
            <h3 className="text-2xl font-bold text-center mb-8 text-primary">{t.scripts_how_to_title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <TutorialStep icon={<FiMousePointer />} title={t.scripts_how_to_step1_title}>
                    {t.scripts_how_to_step1_desc}
                </TutorialStep>
                <TutorialStep icon={<FiDatabase />} title={t.scripts_how_to_step2_title}>
                    {t.scripts_how_to_step2_desc}
                </TutorialStep>
                <TutorialStep icon={<FiEdit3 />} title={t.scripts_how_to_step3_title}>
                    {t.scripts_how_to_step3_desc}
                </TutorialStep>
                 <TutorialStep icon={<FiCopy />} title={t.scripts_how_to_step4_title}>
                    {t.scripts_how_to_step4_desc}
                </TutorialStep>
            </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scripts.map((script) => (
          <ScriptCard 
            key={script.id}
            title={t[script.titleKey]}
            description={t[script.descriptionKey]}
            scriptData={script.data}
            buttonText={t.script_use_button}
          />
        ))}
      </div>
    </div>
  );
};