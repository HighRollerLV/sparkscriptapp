import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { SparkEffect } from './SparkEffect';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-white font-sans flex flex-col relative overflow-x-hidden">
      {/* Background Layer: Glows and Sparks */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <motion.div 
            animate={{ 
              opacity: [0.05, 0.1, 0.05],
              scale: [1, 1.2, 1],
              x: [0, 50, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/20 blur-[140px] rounded-full"
          />
          <motion.div 
            animate={{ 
              opacity: [0.04, 0.08, 0.04],
              scale: [1, 1.3, 1],
              x: [0, -40, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-amber-600/10 blur-[160px] rounded-full"
          />
          <SparkEffect />
      </div>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow relative z-10">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};