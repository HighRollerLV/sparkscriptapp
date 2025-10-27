import type { ScriptTemplate } from '../types';

export const scripts: ScriptTemplate[] = [
    {
        id: 'todo-app',
        // These keys must match the keys in translations.ts
        titleKey: 'script_title_todo',
        descriptionKey: 'script_desc_todo',
        data: {
            corePurpose: 'A minimalist to-do application to help users organize and track their daily tasks.',
            features: [
                'Users can add new tasks with a title and optional description.',
                'Users can mark tasks as complete.',
                'Users can view a list of all tasks, separated into active and completed.',
                'Users can delete tasks.',
                'Data is saved in the browser\'s local storage.'
            ],
            targetAudience: 'Individuals looking for a simple, no-frills productivity tool.',
            techStack: 'React, TypeScript, Tailwind CSS, LocalStorage for persistence.',
        }
    },
    {
        id: 'blog-platform',
        titleKey: 'script_title_blog',
        descriptionKey: 'script_desc_blog',
        data: {
            corePurpose: 'A simple, clean platform for users to write, publish, and share articles.',
            features: [
                'User authentication (signup/login).',
                'A rich text or markdown editor for writing posts.',
                'Ability to create, edit, and delete posts.',
                'Public view of all published posts.',
                'Posts can be organized by categories or tags.'
            ],
            targetAudience: 'Writers, bloggers, content creators.',
            techStack: 'Next.js, TypeScript, Tailwind CSS, a headless CMS like Strapi or a database like Supabase.',
        }
    },
    {
        id: 'developer-portfolio',
        titleKey: 'script_title_portfolio',
        descriptionKey: 'script_desc_portfolio',
        data: {
            corePurpose: 'A personal portfolio website to showcase a developer\'s projects, skills, and professional experience.',
            features: [
                'A home page with a brief introduction and hero section.',
                'A "Projects" section with cards for each project, including a description, tech stack, and links.',
                'An "About Me" section with a more detailed bio and skills list.',
                'A contact form for visitors to send messages.',
                'A responsive design that looks good on all devices.'
            ],
            targetAudience: 'Job recruiters, hiring managers, other developers.',
            techStack: 'Astro, React/Vue, TypeScript, Tailwind CSS, and a service like EmailJS for the contact form.',
        }
    },
    {
        id: 'ecommerce-storefront',
        titleKey: 'script_title_ecommerce',
        descriptionKey: 'script_desc_ecommerce',
        data: {
            corePurpose: 'A basic e-commerce storefront for a small business to display and sell products online.',
            features: [
                'A product grid/list page to display all available products.',
                'A dedicated page for each product with details, images, and an "Add to Cart" button.',
                'A shopping cart page where users can review their items and quantities.',
                'A checkout flow to collect shipping information.',
                'Integration with a payment provider like Stripe.'
            ],
            targetAudience: 'Small business owners, online shoppers.',
            techStack: 'Next.js or Shopify Hydrogen, TypeScript, Tailwind CSS, and Stripe for payments.',
        }
    },
    {
        id: 'social-media-feed',
        titleKey: 'script_title_social',
        descriptionKey: 'script_desc_social',
        data: {
            corePurpose: 'A simple social media application where users can post short updates and interact with others\' posts.',
            features: [
                'User authentication.',
                'A main feed displaying posts from all users in reverse chronological order.',
                'A form for users to create and submit a new post.',
                'The ability for users to "like" a post.',
                'A display of the like count for each post.'
            ],
            targetAudience: 'General audience, people looking to connect.',
            techStack: 'React, Firebase for authentication and database, TypeScript, Tailwind CSS.',
        }
    },
    {
        id: 'recipe-book',
        titleKey: 'script_title_recipe',
        descriptionKey: 'script_desc_recipe',
        data: {
            corePurpose: 'A digital recipe book where users can discover, save, and organize their favorite recipes.',
            features: [
                'A browsable/searchable gallery of recipes.',
                'A detailed recipe page with ingredients, instructions, cooking time, and an image.',
                'Users can create an account to save their favorite recipes to a personal collection.',
                'A feature to add your own personal recipes to the collection.',
                'Recipes can be categorized (e.g., "Dinner," "Dessert," "Vegan").'
            ],
            targetAudience: 'Home cooks, food enthusiasts.',
            techStack: 'Vue.js or Svelte, TypeScript, Tailwind CSS, and a backend service like Supabase for data.',
        }
    }
];
