import React, { useState } from 'react';
import type { PromptData, Language } from '../types';
import { FeatureInput } from './FeatureInput';
import type { Translations } from '../utils/translations';

interface InputFormProps {
  onGenerate: (data: PromptData) => void;
  isLoading: boolean;
  t: Translations[Language];
  isApiKeyConfigured: boolean;
}

const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-surface p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-primary mb-4">{title}</h3>
        {children}
    </div>
);

const Label: React.FC<{ htmlFor: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-300 mb-2">
        {children}
    </label>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input
        {...props}
        className="w-full bg-background border border-border rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-primary transition"
    />
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
     <textarea
        {...props}
        className="w-full bg-background border border-border rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-primary transition"
        rows={4}
    />
);


export const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading, t, isApiKeyConfigured }) => {
  const [appName, setAppName] = useState('');
  const [corePurpose, setCorePurpose] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);
  const [targetAudience, setTargetAudience] = useState('');
  const [techStack, setTechStack] = useState('');
  const [styling, setStyling] = useState('');
  const [promptType, setPromptType] = useState<'detailed' | 'minimal'>('detailed');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isApiKeyConfigured) return;
    onGenerate({ appName, corePurpose, features, targetAudience, techStack, styling, promptType });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        <FormSection title={t.form_section_details}>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="appName">{t.form_label_appName}</Label>
                    <Input id="appName" type="text" value={appName} onChange={(e) => setAppName(e.target.value)} placeholder={t.form_placeholder_appName} />
                </div>
                <div>
                    <Label htmlFor="corePurpose">{t.form_label_corePurpose}</Label>
                    <Textarea id="corePurpose" value={corePurpose} onChange={(e) => setCorePurpose(e.target.value)} placeholder={t.form_placeholder_corePurpose} />
                </div>
            </div>
        </FormSection>

        <FormSection title={t.form_section_features}>
            <FeatureInput features={features} setFeatures={setFeatures} t={t} />
        </FormSection>

        <FormSection title={t.form_section_audience}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <Label htmlFor="targetAudience">{t.form_label_targetAudience}</Label>
                    <Input id="targetAudience" type="text" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} placeholder={t.form_placeholder_targetAudience} />
                </div>
                 <div>
                    <Label htmlFor="styling">{t.form_label_styling}</Label>
                    <Input id="styling" type="text" value={styling} onChange={(e) => setStyling(e.target.value)} placeholder={t.form_placeholder_styling} />
                </div>
            </div>
        </FormSection>

         <FormSection title={t.form_section_tech}>
             <div>
                <Label htmlFor="techStack">{t.form_label_techStack}</Label>
                <Input id="techStack" type="text" value={techStack} onChange={(e) => setTechStack(e.target.value)} placeholder={t.form_placeholder_techStack} />
                <p className="text-xs text-gray-500 mt-2">{t.form_help_techStack}</p>
            </div>
         </FormSection>
         
         <FormSection title={t.form_section_prompt}>
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    type="button"
                    onClick={() => setPromptType('minimal')}
                    className={`flex-1 p-4 rounded-lg border text-center transition-all ${
                        promptType === 'minimal'
                            ? 'bg-primary/10 border-primary ring-2 ring-primary'
                            : 'bg-background border-border hover:border-primary/50'
                    }`}
                >
                    <h4 className="font-semibold text-white">{t.form_prompt_minimal_title}</h4>
                    <p className="text-xs text-gray-400 mt-1">{t.form_prompt_minimal_desc}</p>
                </button>
                <button
                    type="button"
                    onClick={() => setPromptType('detailed')}
                    className={`flex-1 p-4 rounded-lg border text-center transition-all ${
                        promptType === 'detailed'
                            ? 'bg-primary/10 border-primary ring-2 ring-primary'
                            : 'bg-background border-border hover:border-primary/50'
                    }`}
                >
                    <h4 className="font-semibold text-white">{t.form_prompt_detailed_title}</h4>
                    <p className="text-xs text-gray-400 mt-1">{t.form_prompt_detailed_desc}</p>
                </button>
            </div>
        </FormSection>
      
      <button
        type="submit"
        disabled={isLoading || !corePurpose.trim() || !isApiKeyConfigured}
        className="w-full flex items-center justify-center bg-primary text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 filter hover:brightness-110 shadow-lg shadow-primary/20"
      >
        {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <circle className="opacity-25" cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M2 10a8 8 0 018-8v2a6 6 0 00-6 6H2z"></path>
              </svg>
              {t.button_generating}
            </>
        ) : (
            t.button_generate
        )}
      </button>
      {!isApiKeyConfigured && (
        <p className="text-center text-sm text-red-400 -mt-4">
            {t.error_apiKeyMissing}
        </p>
      )}
    </form>
  );
};