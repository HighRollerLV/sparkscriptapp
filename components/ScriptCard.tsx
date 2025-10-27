import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import type { PromptData } from '../types';

interface ScriptCardProps {
    title: string;
    description: string;
    scriptData: Omit<PromptData, 'appName' | 'styling' | 'promptType'>;
    buttonText: string;
}

export const ScriptCard: React.FC<ScriptCardProps> = ({ title, description, scriptData, buttonText }) => {
    const navigate = useNavigate();

    const handleUseScript = () => {
        navigate('/prompt-builder', { state: { scriptData } });
    };

    return (
        <div className="bg-surface p-6 rounded-xl shadow-lg flex flex-col justify-between border border-transparent hover:border-primary/50 transition-all duration-300">
            <div>
                <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
                <p className="text-gray-400 text-sm mb-6">{description}</p>
            </div>
            <button
                onClick={handleUseScript}
                className="w-full mt-2 flex items-center justify-center gap-2 text-sm font-semibold text-background bg-primary rounded-md py-2.5 px-4 hover:brightness-110 transition-all"
            >
                {buttonText} <FiArrowRight />
            </button>
        </div>
    );
};
