import React from 'react';
import type { Language } from '../types';
import type { Translations } from '../utils/translations';


interface FeatureInputProps {
  features: string[];
  setFeatures: React.Dispatch<React.SetStateAction<string[]>>;
  t: Translations[Language];
}

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);

export const FeatureInput: React.FC<FeatureInputProps> = ({ features, setFeatures, t }) => {
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeature = () => {
    setFeatures([...features, '']);
  };

  const removeFeature = (index: number) => {
    if (features.length > 1) {
      const newFeatures = features.filter((_, i) => i !== index);
      setFeatures(newFeatures);
    }
  };

  return (
    <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">{t.feature_label}</label>
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            value={feature}
            onChange={(e) => handleFeatureChange(index, e.target.value)}
            placeholder={`${t.feature_placeholder} ${index + 1}`}
            className="flex-grow bg-background border border-border rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
          <button
            type="button"
            onClick={() => removeFeature(index)}
            disabled={features.length <= 1}
            className="p-2 bg-surface text-gray-400 rounded-md hover:bg-background hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
            aria-label={t.feature_remove_aria}
          >
            <TrashIcon />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addFeature}
        className="w-full mt-2 flex items-center justify-center gap-2 text-sm text-primary bg-primary/10 border border-dashed border-primary/50 rounded-md py-2 px-4 hover:bg-primary/20 transition"
      >
        <PlusIcon /> {t.feature_add}
      </button>
    </div>
  );
};