import React from 'react';
import { FiTwitter, FiLinkedin, FiFacebook, FiShare2 } from 'react-icons/fi';

interface SocialShareProps {
    title?: string;
    description?: string;
    url?: string;
}

export const SocialShare: React.FC<SocialShareProps> = ({
    title = 'SparkScript - AI Prompt Generator',
    description = 'Generate precise AI prompts for development, images, music, and video',
    url = typeof window !== 'undefined' ? window.location.href : 'https://www.sparkscript.tech'
}) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text: description,
                    url,
                });
            } catch {
                // Share canceled or failed - silent fail
            }
        }
    };

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 font-medium">Share:</span>
            <div className="flex gap-2">
                <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-surface border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 transition-all hover:scale-110"
                    aria-label="Share on Twitter"
                >
                    <FiTwitter size={18} />
                </a>
                <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-surface border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-all hover:scale-110"
                    aria-label="Share on LinkedIn"
                >
                    <FiLinkedin size={18} />
                </a>
                <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-surface border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#1877F2] hover:border-[#1877F2]/30 transition-all hover:scale-110"
                    aria-label="Share on Facebook"
                >
                    <FiFacebook size={18} />
                </a>
                {navigator.share && (
                    <button
                        onClick={handleNativeShare}
                        className="w-10 h-10 rounded-full bg-surface border border-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 transition-all hover:scale-110"
                        aria-label="Share"
                    >
                        <FiShare2 size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};


