import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { scripts } from '../data/scripts';
import { ScriptCard } from '../components/ScriptCard';
import { FiLayout, FiImage, FiMusic, FiVideo, FiGrid } from 'react-icons/fi';
import type { PromptCategory } from '../types';

export const ScriptsPage: React.FC = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<PromptCategory | 'all'>('all');

  usePageMeta(t.seo_scripts_title, t.seo_scripts_desc, '/scripts');

  const filteredScripts = useMemo(() => {
    if (filter === 'all') return scripts;
    return scripts.filter(s => s.data.category === filter);
  }, [filter]);

  const filterOptions: { id: PromptCategory | 'all'; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All', icon: <FiGrid /> },
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
        className="max-w-6xl mx-auto px-4"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tight">
            {t.scripts_page_title_part1}{' '}
            <span className="text-primary">{t.scripts_page_title_part2_highlight}</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t.scripts_page_subtitle}
        </p>
      </div>

      {/* Filter Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterOptions.map((opt) => (
              <button
                  key={opt.id}
                  onClick={() => setFilter(opt.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all border-2 text-sm ${
                      filter === opt.id 
                      ? 'bg-primary text-background border-primary shadow-lg shadow-primary/10' 
                      : 'bg-surface text-gray-400 border-white/5 hover:border-primary/50'
                  }`}
              >
                  {opt.icon}
                  {opt.label}
              </button>
          ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScripts.map((script) => (
          <ScriptCard 
            key={script.id}
            title={t[script.titleKey] || script.titleKey}
            description={t[script.descriptionKey] || script.descriptionKey}
            scriptData={script.data}
            buttonText={t.script_use_button}
          />
        ))}
      </div>

      <section className="mt-24 bg-surface p-10 rounded-2xl shadow-xl border border-white/5 text-center">
        <h2 className="text-3xl font-black mb-6 text-white">{t.scripts_how_to_title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4 font-black text-xl">1</div>
                <h3 className="font-bold text-white">{t.scripts_how_to_step1_title}</h3>
                <p className="text-sm text-gray-400">{t.scripts_how_to_step1_desc}</p>
            </div>
            <div className="space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4 font-black text-xl">2</div>
                <h3 className="font-bold text-white">{t.scripts_how_to_step2_title}</h3>
                <p className="text-sm text-gray-400">{t.scripts_how_to_step2_desc}</p>
            </div>
            <div className="space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4 font-black text-xl">3</div>
                <h3 className="font-bold text-white">{t.scripts_how_to_step3_title}</h3>
                <p className="text-sm text-gray-400">{t.scripts_how_to_step3_desc}</p>
            </div>
            <div className="space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4 font-black text-xl">4</div>
                <h3 className="font-bold text-white">{t.scripts_how_to_step4_title}</h3>
                <p className="text-sm text-gray-400">{t.scripts_how_to_step4_desc}</p>
            </div>
        </div>
      </section>
    </motion.div>
  );
};