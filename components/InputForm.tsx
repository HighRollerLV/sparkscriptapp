import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PromptData, Language, PromptCategory } from '../types';
import { FeatureInput } from './FeatureInput';
import type { Translations } from '../utils/translations';

interface InputFormProps {
  category: PromptCategory;
  onGenerate: (data: PromptData) => void;
  isLoading: boolean;
  t: Translations[Language];
  initialData?: Partial<PromptData> | null;
}

const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface p-5 rounded-xl shadow-lg border border-white/5"
    >
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mb-4">{title}</h3>
        {children}
    </motion.div>
);

const Label: React.FC<{ htmlFor: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">
        {children}
    </label>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input
        {...props}
        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-700"
    />
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
     <textarea
        {...props}
        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-700"
        rows={3}
    />
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
    <select
        {...props}
        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none cursor-pointer"
    />
);

export const InputForm: React.FC<InputFormProps> = ({ category, onGenerate, isLoading, t, initialData }) => {
  const [appName, setAppName] = useState('');
  const [corePurpose, setCorePurpose] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);
  const [styling, setStyling] = useState('');
  const [promptType, setPromptType] = useState<'simple' | 'medium' | 'detailed'>('medium');

  // Dynamic fields
  const [targetAudience, setTargetAudience] = useState('');
  const [techStack, setTechStack] = useState('');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [lighting, setLighting] = useState('');
  const [colorPalette, setColorPalette] = useState('');
  const [artStyle, setArtStyle] = useState('');
  const [genre, setGenre] = useState('');
  const [mood, setMood] = useState('');
  const [tempo, setTempo] = useState('');
  const [lyricalTheme, setLyricalTheme] = useState('');
  const [motionVal, setMotionVal] = useState('Medium');
  const [cameraMovement, setCameraMovement] = useState('');
  const [frameRate, setFrameRate] = useState('24fps');

  useEffect(() => {
    if (initialData) {
        setAppName(initialData.appName || '');
        setCorePurpose(initialData.corePurpose || '');
        setFeatures(initialData.features && initialData.features.length > 0 ? initialData.features : ['']);
        setTargetAudience(initialData.targetAudience || '');
        setTechStack(initialData.techStack || '');
        setArtStyle(initialData.artStyle || '');
        setGenre(initialData.genre || '');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Fix: Removed check for isApiKeyConfigured to comply with the policy of assuming the key is pre-configured
    if (isLoading) return;
    onGenerate({ 
        category, appName, corePurpose, features, styling, promptType,
        targetAudience, techStack, aspectRatio, lighting, colorPalette, 
        artStyle, genre, mood, tempo, lyricalTheme, motion: motionVal, cameraMovement, frameRate
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-10">
        <FormSection title={t.form_section_details}>
            <div className="space-y-3">
                {category === 'website' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Label htmlFor="appName">{t.form_label_appName}</Label>
                        <Input id="appName" type="text" value={appName} onChange={(e) => setAppName(e.target.value)} placeholder={t.form_placeholder_appName} />
                    </motion.div>
                )}
                <div>
                    <Label htmlFor="corePurpose">{t.form_label_corePurpose}</Label>
                    <Textarea id="corePurpose" value={corePurpose} onChange={(e) => setCorePurpose(e.target.value)} placeholder="..." required />
                </div>
            </div>
        </FormSection>

        <AnimatePresence mode="wait">
            {category === 'image' && (
                <motion.div key="image-fields" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <FormSection title={t.cat_image}>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="artStyle">{t.form_label_artStyle}</Label>
                                <Input id="artStyle" value={artStyle} onChange={(e) => setArtStyle(e.target.value)} placeholder="Photorealistic..." />
                            </div>
                            <div>
                                <Label htmlFor="aspectRatio">{t.form_label_aspectRatio}</Label>
                                <Select id="aspectRatio" value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}>
                                    <option value="16:9">16:9</option>
                                    <option value="9:16">9:16</option>
                                    <option value="1:1">1:1</option>
                                    <option value="4:3">4:3</option>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="lighting">{t.form_label_lighting}</Label>
                                <Input id="lighting" value={lighting} onChange={(e) => setLighting(e.target.value)} placeholder="Cinematic..." />
                            </div>
                            <div>
                                <Label htmlFor="colorPalette">{t.form_label_colorPalette}</Label>
                                <Input id="colorPalette" value={colorPalette} onChange={(e) => setColorPalette(e.target.value)} placeholder="Monochrome..." />
                            </div>
                        </div>
                    </FormSection>
                </motion.div>
            )}

            {category === 'music' && (
                <motion.div key="music-fields" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <FormSection title={t.cat_music}>
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label htmlFor="genre">{t.form_label_genre}</Label>
                                    <Input id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Synthwave..." />
                                </div>
                                <div>
                                    <Label htmlFor="tempo">{t.form_label_tempo}</Label>
                                    <Input id="tempo" value={tempo} onChange={(e) => setTempo(e.target.value)} placeholder="120bpm..." />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="mood">{t.form_label_mood}</Label>
                                <Input id="mood" value={mood} onChange={(e) => setMood(e.target.value)} placeholder="Dark/Epic..." />
                            </div>
                            <div>
                                <Label htmlFor="lyricalTheme">{t.form_label_lyricalTheme}</Label>
                                <Textarea id="lyricalTheme" value={lyricalTheme} onChange={(e) => setLyricalTheme(e.target.value)} placeholder="Theme/Lyrics..." />
                            </div>
                        </div>
                    </FormSection>
                </motion.div>
            )}

            {category === 'video' && (
                <motion.div key="video-fields" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <FormSection title={t.cat_video}>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="motion">{t.form_label_motion}</Label>
                                <Select id="motion" value={motionVal} onChange={(e) => setMotionVal(e.target.value)}>
                                    <option value="Static">Static</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="frameRate">{t.form_label_frameRate}</Label>
                                <Select id="frameRate" value={frameRate} onChange={(e) => setFrameRate(e.target.value)}>
                                    <option value="24fps">24fps</option>
                                    <option value="30fps">30fps</option>
                                    <option value="60fps">60fps</option>
                                </Select>
                            </div>
                            <div className="col-span-2">
                                <Label htmlFor="cameraMovement">{t.form_label_cameraMovement}</Label>
                                <Input id="cameraMovement" value={cameraMovement} onChange={(e) => setCameraMovement(e.target.value)} placeholder="Dolly zoom..." />
                            </div>
                        </div>
                    </FormSection>
                </motion.div>
            )}
        </AnimatePresence>

        <FormSection title={t.form_section_features}>
            <FeatureInput features={features} setFeatures={setFeatures} t={t} />
        </FormSection>

        <FormSection title={t.form_section_design}>
            <div className="grid grid-cols-1 gap-3">
                 <div>
                    <Label htmlFor="styling">{t.form_label_styling}</Label>
                    <Input id="styling" type="text" value={styling} onChange={(e) => setStyling(e.target.value)} placeholder="..." />
                </div>
                {category === 'website' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Label htmlFor="targetAudience">{t.form_label_targetAudience}</Label>
                        <Input id="targetAudience" type="text" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} placeholder="..." />
                    </motion.div>
                )}
            </div>
        </FormSection>

        {category === 'website' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <FormSection title={t.form_section_tech}>
                    <div>
                        <Label htmlFor="techStack">{t.form_label_techStack}</Label>
                        <Input id="techStack" type="text" value={techStack} onChange={(e) => setTechStack(e.target.value)} placeholder="..." />
                    </div>
                </FormSection>
             </motion.div>
        )}
         
         <FormSection title={t.form_section_output}>
            <div className="flex flex-col gap-2">
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setPromptType('simple')}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                        promptType === 'simple' ? 'bg-primary/10 border-primary ring-1 ring-primary' : 'bg-background border-border hover:border-primary/40'
                    }`}
                >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${promptType === 'simple' ? 'border-primary' : 'border-gray-600'}`}>
                        {promptType === 'simple' && <div className="w-2 h-2 bg-primary rounded-full" />}
                    </div>
                    <div>
                        <h4 className={`text-sm font-bold ${promptType === 'simple' ? 'text-primary' : 'text-white'}`}>{t.form_prompt_simple_title}</h4>
                        <p className="text-[10px] text-gray-500 font-bold uppercase">{t.form_prompt_simple_desc}</p>
                    </div>
                </motion.button>
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setPromptType('medium')}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                        promptType === 'medium' ? 'bg-primary/10 border-primary ring-1 ring-primary' : 'bg-background border-border hover:border-primary/40'
                    }`}
                >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${promptType === 'medium' ? 'border-primary' : 'border-gray-600'}`}>
                        {promptType === 'medium' && <div className="w-2 h-2 bg-primary rounded-full" />}
                    </div>
                    <div>
                        <h4 className={`text-sm font-bold ${promptType === 'medium' ? 'text-primary' : 'text-white'}`}>{t.form_prompt_medium_title}</h4>
                        <p className="text-[10px] text-gray-500 font-bold uppercase">{t.form_prompt_medium_desc}</p>
                    </div>
                </motion.button>
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setPromptType('detailed')}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                        promptType === 'detailed' ? 'bg-primary/10 border-primary ring-1 ring-primary' : 'bg-background border-border hover:border-primary/40'
                    }`}
                >
                     <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${promptType === 'detailed' ? 'border-primary' : 'border-gray-600'}`}>
                        {promptType === 'detailed' && <div className="w-2 h-2 bg-primary rounded-full" />}
                    </div>
                    <div>
                        <h4 className={`text-sm font-bold ${promptType === 'detailed' ? 'text-primary' : 'text-white'}`}>{t.form_prompt_detailed_title}</h4>
                        <p className="text-[10px] text-gray-500 font-bold uppercase">{t.form_prompt_detailed_desc}</p>
                    </div>
                </motion.button>
            </div>
        </FormSection>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading || !corePurpose.trim()}
        className="group relative overflow-hidden w-full flex items-center justify-center bg-primary text-background font-black py-4 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl shadow-primary/20 text-lg uppercase tracking-wider active:scale-[0.98]"
      >
        <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"></div>
        {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t.button_generating}
            </>
        ) : (
            t.button_generate
        )}
      </motion.button>
    </form>
  );
};