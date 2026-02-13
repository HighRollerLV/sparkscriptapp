import React from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { FiZap, FiFeather, FiSend, FiExternalLink, FiLayout, FiImage, FiMusic, FiVideo, FiCode, FiDatabase, FiBox, FiCpu } from 'react-icons/fi';
import type { Language } from '../types';
import type { Translations } from '../utils/translations';

interface AboutProps {
    t: Translations[Language];
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
};

const ValueCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <motion.div 
        variants={itemVariants}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        className="bg-surface p-6 rounded-2xl shadow-xl text-center border border-white/5 hover:border-primary/30 transition-all group relative overflow-hidden"
    >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="mx-auto w-16 h-16 mb-4 bg-background rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,190,0,0.2)] transition-all">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{children}</p>
    </motion.div>
);

const InfoSection: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
    <motion.div 
        variants={itemVariants}
        className="flex flex-col md:flex-row items-start gap-6 p-8 rounded-3xl bg-surface/40 backdrop-blur-sm border border-white/5 hover:bg-surface/60 hover:border-primary/20 transition-all group"
    >
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">{desc}</p>
        </div>
    </motion.div>
);

const ToolLinkCard: React.FC<{ icon: React.ReactNode; name: string; description: string; url: string }> = ({ icon, name, description, url }) => (
    <motion.a 
        variants={itemVariants}
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="block bg-surface p-6 rounded-2xl shadow-lg hover:bg-background border border-white/5 hover:border-primary transition-all duration-300 group"
    >
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
                <div className="text-primary text-xl">{icon}</div>
                <h4 className="font-bold text-white text-lg">{name}</h4>
            </div>
            <FiExternalLink className="text-gray-500 group-hover:text-primary transition-colors" />
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.a>
);

export const About: React.FC<AboutProps> = ({ t }) => {
    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-6xl mx-auto text-white px-4"
        >
            <section className="text-center mb-24 pt-10">
                <motion.div 
                    variants={itemVariants}
                    className="inline-block px-5 py-2 mb-8 text-xs font-black tracking-[0.2em] text-primary uppercase bg-primary/10 rounded-full border border-primary/20 shadow-[0_0_15px_rgba(255,190,0,0.1)]"
                >
                    Precision Prompt Engineering
                </motion.div>
                <motion.h1 
                    variants={itemVariants}
                    className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tight"
                >
                    {t.about_hero_title_part1}{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-400 to-amber-600 drop-shadow-sm">
                        {t.about_hero_title_part2_highlight}
                    </span>{' '}
                    {t.about_hero_title_part3}{' '}
                    <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-primary">
                        {t.about_hero_title_part4_highlight}
                    </span>
                    {t.about_hero_title_part5}
                </motion.h1>
                <motion.p 
                    variants={itemVariants}
                    className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
                >
                    {t.about_hero_subtitle}
                </motion.p>
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Link 
                        to="/prompt-builder"
                        className="group relative overflow-hidden bg-primary text-background font-black py-5 px-12 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-primary/30 text-lg uppercase tracking-wider"
                    >
                        <span className="relative z-10">{t.about_hero_cta}</span>
                        <motion.div 
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0 bg-white/20 skew-x-[-20deg]"
                        />
                    </Link>
                    <Link 
                        to="/scripts"
                        className="bg-white/5 text-white border border-white/10 font-bold py-5 px-12 rounded-2xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 text-lg uppercase tracking-wider"
                    >
                        {t.nav_scripts}
                    </Link>
                </motion.div>
            </section>

            <motion.section variants={itemVariants} className="mb-32">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black mb-4">{t.about_info_section_title}</h2>
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: 96 }}
                        viewport={{ once: true }}
                        className="h-1.5 bg-primary mx-auto rounded-full" 
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <InfoSection icon={<FiLayout size={28} />} title={t.about_info_web_title} desc={t.about_info_web_desc} />
                    <InfoSection icon={<FiImage size={28} />} title={t.about_info_img_title} desc={t.about_info_img_desc} />
                    <InfoSection icon={<FiMusic size={28} />} title={t.about_info_mus_title} desc={t.about_info_mus_desc} />
                    <InfoSection icon={<FiVideo size={28} />} title={t.about_info_vid_title} desc={t.about_info_vid_desc} />
                </div>
            </motion.section>

            <section className="mb-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                <ValueCard icon={<FiZap size={32} />} title={t.about_value1_title}>
                    {t.about_value1_desc}
                </ValueCard>
                <ValueCard icon={<FiFeather size={32} />} title={t.about_value2_title}>
                    {t.about_value2_desc}
                </ValueCard>
                <ValueCard icon={<FiSend size={32} />} title={t.about_value3_title}>
                    {t.about_value3_desc}
                </ValueCard>
            </section>
            
            <motion.section 
                variants={itemVariants} 
                className="mb-32 relative"
                whileInView={{ opacity: 1 }}
                viewport={{ margin: "-100px" }}
            >
                 <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10 transform scale-75"></div>
                 <div className="bg-surface/60 backdrop-blur-xl p-10 md:p-20 rounded-[2.5rem] border border-white/5 shadow-2xl text-center">
                    <h2 className="text-4xl md:text-5xl font-black mb-10 text-white leading-tight">{t.about_why_title}</h2>
                    <p className="text-xl text-gray-300 leading-relaxed max-w-5xl mx-auto font-medium">
                        {t.about_why_desc}
                    </p>
                 </div>
            </motion.section>

            <section className="pb-32">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black mb-4 text-white">{t.about_tools_title}</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        {t.about_tools_desc}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ToolLinkCard icon={<FiLayout />} name="Lovable" description={t.tool_lovable_desc} url="https://lovable.dev" />
                    <ToolLinkCard icon={<FiDatabase />} name="bolt.new" description={t.tool_bolt_desc} url="https://bolt.new" />
                    <ToolLinkCard icon={<FiCode />} name="Cursor" description={t.tool_cursor_desc} url="https://cursor.sh/" />
                    <ToolLinkCard icon={<FiBox />} name="v0.dev" description={t.tool_v0_desc} url="https://v0.dev" />
                    <ToolLinkCard icon={<FiCpu />} name="Google AI Studio" description={t.tool_google_ai_studio_desc} url="https://aistudio.google.com/" />
                    <ToolLinkCard icon={<FiZap />} name="Replit Agent" description={t.tool_replit_desc} url="https://replit.com" />
                </div>
            </section>

            {/* SEO Content - Visually hidden but readable by search engines */}
            <section className="sr-only" aria-hidden="true">
                <p>
                    SparkScript is the ultimate AI prompt generator designed specifically for developers, designers, and creative professionals.
                    Whether you&apos;re building web applications with AI coding assistants like <Link to="/prompt-builder">Cursor and Lovable</Link>,
                    creating stunning visuals with Midjourney, composing music with Suno, or producing videos with Luma and Runway,
                    SparkScript provides the structured, technical prompts you need for exceptional results.
                </p>
                <p>
                    Our <Link to="/scripts">professional prompt templates</Link> cover four major creative domains: software development,
                    image generation, music production, and video creation. Each template is engineered with precision to ensure AI tools
                    understand exactly what you want to create. The platform supports over 50 AI generation tools including development
                    platforms (Cursor, Lovable, Bolt.new, V0, Replit), image generators (Midjourney, Stable Diffusion, DALL-E),
                    music creators (Suno, Udio), and video producers (Luma, Runway).
                </p>
            </section>
        </motion.div>
    );
};