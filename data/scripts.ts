import type { ScriptTemplate } from '../types';

export const scripts: ScriptTemplate[] = [
    // WEBSITE & APP
    {
        id: 'todo-app',
        titleKey: 'script_title_todo',
        descriptionKey: 'script_desc_todo',
        data: {
            category: 'website',
            corePurpose: 'A minimalist to-do application to help users organize and track their daily tasks.',
            features: [
                'Add tasks with priority levels',
                'Dark/Light mode toggle',
                'LocalStorage persistence',
                'Drag-and-drop reordering'
            ],
            targetAudience: 'Productivity seekers',
            techStack: 'React, TypeScript, Tailwind CSS',
        }
    },
    {
        id: 'blog-platform',
        titleKey: 'script_title_blog',
        descriptionKey: 'script_desc_blog',
        data: {
            category: 'website',
            corePurpose: 'A clean platform for writers to publish markdown articles.',
            features: [
                'Markdown preview',
                'Category filtering',
                'Search functionality',
                'Newsletter signup'
            ],
            targetAudience: 'Writers and bloggers',
            techStack: 'Next.js, Supabase',
        }
    },
    {
        id: 'developer-portfolio',
        titleKey: 'script_title_portfolio',
        descriptionKey: 'script_desc_portfolio',
        data: {
            category: 'website',
            corePurpose: 'A personal portfolio to showcase a developer\'s projects and skills.',
            features: [
                'Interactive project cards',
                'Skills timeline',
                'Contact form with validation',
                'Social media integration'
            ],
            targetAudience: 'Recruiters and managers',
            techStack: 'Astro, Tailwind',
        }
    },

    // IMAGE GENERATION
    {
        id: 'img-cyberpunk',
        titleKey: 'script_title_img_cyber',
        descriptionKey: 'script_desc_img_cyber',
        data: {
            category: 'image',
            corePurpose: 'A bustling futuristic city street at night.',
            features: [
                'Neon holographic advertisements',
                'Wet pavement reflections',
                'Cybernetic pedestrians',
                'Cinematic fog'
            ],
            artStyle: 'Cinematic Photorealism',
            aspectRatio: '16:9',
            lighting: 'High-contrast neon glow',
            colorPalette: 'Cyan, Magenta, Deep Shadow',
            styling: 'Blade Runner aesthetic, high detail, 8k',
        }
    },
    {
        id: 'img-macro',
        titleKey: 'script_title_img_macro',
        descriptionKey: 'script_desc_img_macro',
        data: {
            category: 'image',
            corePurpose: 'Close up of a dew drop on a spider web.',
            features: [
                'Microscopic details',
                'Refraction in water',
                'Perfectly sharp web silk',
                'Early morning light'
            ],
            artStyle: 'Macro Photography',
            aspectRatio: '1:1',
            lighting: 'Soft golden hour morning sun',
            colorPalette: 'Emerald green and silver',
            styling: 'National Geographic style, bokeh background',
        }
    },
    {
        id: 'img-abstract',
        titleKey: 'script_title_img_abstract',
        descriptionKey: 'script_desc_img_abstract',
        data: {
            category: 'image',
            corePurpose: 'Flowing liquid metal spheres in a void.',
            features: [
                'Mercury-like texture',
                'Iridescent reflections',
                'Clean minimalism',
                'Depth of field'
            ],
            artStyle: '3D Render / Abstract',
            aspectRatio: '4:3',
            lighting: 'Studio softbox lighting',
            colorPalette: 'Metallic chrome, pastel purple',
            styling: 'Futuristic gallery art, octane render',
        }
    },

    // MUSIC & LYRICS
    {
        id: 'mus-lofi',
        titleKey: 'script_title_mus_lofi',
        descriptionKey: 'script_desc_mus_lofi',
        data: {
            category: 'music',
            corePurpose: 'Lo-fi study track with a cozy, rainy-night atmosphere.',
            genre: 'Lo-Fi Hip Hop',
            mood: 'Relaxed / Melancholic',
            tempo: '85 bpm',
            lyricalTheme: 'Raining outside a window in an empty city',
            features: [
                'Vinyl crackle background',
                'Muffled Rhodes piano',
                'Boom bap drum beat',
                'Subtle rain sfx'
            ],
            styling: 'Chillhop study girl vibes',
        }
    },
    {
        id: 'mus-epic',
        titleKey: 'script_title_mus_epic',
        descriptionKey: 'script_desc_mus_epic',
        data: {
            category: 'music',
            corePurpose: 'Epic cinematic anthem with heroic rise and powerful climax.',
            genre: 'Orchestral Cinematic',
            mood: 'Triumphant / Powerful',
            tempo: '110 bpm',
            lyricalTheme: 'The rise of a forgotten hero',
            features: [
                'Heavy brass sections',
                'Staccato violins',
                'Taiko war drums',
                'Etherial choir'
            ],
            styling: 'Hans Zimmer inspired trailer music',
        }
    },
    {
        id: 'mus-synth',
        titleKey: 'script_title_mus_synth',
        descriptionKey: 'script_desc_mus_synth',
        data: {
            category: 'music',
            corePurpose: 'High-energy retro synth track for late-night highway drives.',
            genre: 'Synthwave / Outrun',
            mood: 'Energetic / Nostalgic',
            tempo: '125 bpm',
            lyricalTheme: 'Driving at midnight in a 1984 Ferrari',
            features: [
                'Analog bass pulses',
                'Gated reverb snare',
                'Glittering arpeggios',
                'Dreamy pads'
            ],
            styling: 'Retro-futurism, driving music',
        }
    },

    // VIDEO GENERATION
    {
        id: 'vid-drone',
        titleKey: 'script_title_vid_drone',
        descriptionKey: 'script_desc_vid_drone',
        data: {
            category: 'video',
            corePurpose: 'Aerial drone shot over snowy mountain peaks.',
            features: [
                'Sun breaking over the horizon',
                'Snow blowing off the ridges',
                'Sharp mountain textures',
                'Cinematic scale'
            ],
            motion: 'Medium',
            cameraMovement: 'Smooth orbiting drone shot',
            frameRate: '24fps',
            styling: 'Hyper-realistic nature documentary',
        }
    },
    {
        id: 'vid-speed',
        titleKey: 'script_title_vid_speed',
        descriptionKey: 'script_desc_vid_speed',
        data: {
            category: 'video',
            corePurpose: 'POV of a high-speed chase through a neon city.',
            features: [
                'Motion blur streaks',
                'Reflecting light on wet roads',
                'Passing futuristic skyscrapers',
                'Vibrant light trails'
            ],
            motion: 'High',
            cameraMovement: 'Fast tracking / POV',
            frameRate: '60fps',
            styling: 'Cyberpunk cinematic sequence',
        }
    },
    {
        id: 'vid-portrait',
        titleKey: 'script_title_vid_port',
        descriptionKey: 'script_desc_vid_port',
        data: {
            category: 'video',
            corePurpose: 'A cyborg woman waking up in a lab.',
            features: [
                'Slow blink of eyes',
                'Opening micro-panels on skin',
                'Steam venting from machinery',
                'Soft lab lighting'
            ],
            motion: 'Low',
            cameraMovement: 'Extreme close-up pan',
            frameRate: '30fps',
            styling: 'Deeply emotional sci-fi realism',
        }
    }
];