import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Heart } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function Navigation({ t, activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'story', label: t.nav.story },
    { id: 'events', label: t.nav.events },
    { id: 'venue', label: t.nav.venue },
    { id: 'gallery', label: t.nav.gallery },
  ];

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Subtle Scroll Progress Line */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-royal-maroon/20">
        <div
          className="h-full bg-gold-gradient transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Hamburger Menu Trigger Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed top-4 left-4 z-[80]"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="w-11 h-11 rounded-full bg-glass-dark border border-gold/40 text-gold flex items-center justify-center shadow-royal backdrop-blur-md hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-gold" />
        </button>
      </motion.div>

      {/* Fullscreen Royal Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[95] bg-royal-maroon text-champagne flex flex-col justify-between p-6 md:p-12 overflow-y-auto"
          >
            {/* Background Aesthetic Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay pointer-events-none"
              style={{ backgroundImage: `url(${weddingConfig.images.hero})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-royal-maroonDark via-royal-maroon to-royal-maroonDark opacity-90 pointer-events-none" />

            {/* Top Bar with Close Button */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-script text-3xl text-gold-gradient">R & A</span>
                <span className="text-xs font-sans tracking-widest text-champagne/60 uppercase hidden sm:inline">
                  • 18.02.2027
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-11 h-11 rounded-full bg-white/10 border border-gold/30 text-champagne flex items-center justify-center hover:bg-gold-gradient hover:text-royal-maroon transition-all cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="relative z-10 my-auto py-12 flex flex-col items-center justify-center gap-6 md:gap-8 text-center">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  onClick={() => scrollToSection(link.id)}
                  className="group relative text-2xl md:text-4xl font-cormorant tracking-widest uppercase hover:text-gold transition-colors cursor-pointer"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold-gradient group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
            </div>

            {/* Footer Quote inside Menu */}
            <div className="relative z-10 text-center border-t border-gold/20 pt-6">
              <p className="font-script text-2xl text-gold">Riya Patel & Aarav Shah</p>
              <p className="text-xs font-sans tracking-widest text-champagne/60 uppercase mt-1">
                Vadodara, Gujarat • Save The Date
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
