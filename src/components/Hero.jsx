import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronDown, Sparkles } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function Hero({ t, onSaveDate, onExploreStory }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-royal-maroon text-champagne pt-20 pb-16 px-4">
      
      {/* Background Aesthetic Looping Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={weddingConfig.images.hero}
        className="absolute inset-0 w-full h-full object-cover filter brightness-70 contrast-105 scale-105"
      >
        <source src={weddingConfig.images.heroVideo} type="video/mp4" />
      </video>

      {/* Royal Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-royal-maroonDark/85 via-royal-maroon/65 to-royal-maroonDark" />

      {/* Outer Golden Border Frame */}
      <div className="absolute top-6 left-6 right-6 bottom-6 border border-gold/30 rounded-3xl pointer-events-none hidden md:block" />

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center py-6">
        
        {/* Top Announcement Pill */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-glass-dark border border-gold/40 text-gold text-xs md:text-sm font-cormorant tracking-[0.25em] uppercase mb-6 shadow-glow"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>The Royal Wedding Celebration</span>
          <Sparkles className="w-3.5 h-3.5 text-gold" />
        </motion.div>

        {/* Couple Script Names with line-height padding to prevent text cutting */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="my-4 py-2"
        >
          <h1 className="font-script text-6xl sm:text-8xl md:text-9xl text-gold-gradient drop-shadow-md leading-normal py-1">
            {weddingConfig.brideName}
          </h1>
          <div className="flex items-center justify-center gap-4 my-2">
            <div className="w-12 md:w-24 h-[1px] bg-gold-gradient" />
            <span className="font-cormorant text-2xl md:text-4xl italic text-champagne/90 font-bold">
              &
            </span>
            <div className="w-12 md:w-24 h-[1px] bg-gold-gradient" />
          </div>
          <h1 className="font-script text-6xl sm:text-8xl md:text-9xl text-gold-gradient drop-shadow-md leading-normal py-1">
            {weddingConfig.groomName}
          </h1>
        </motion.div>

        {/* Getting Married Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-cormorant text-lg sm:text-xl md:text-2xl tracking-[0.3em] uppercase text-champagne/90 my-4 font-semibold"
        >
          {t.hero.gettingMarried}
        </motion.p>

        {/* Location Badge (Date removed as requested) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex items-center justify-center my-4 font-sans text-sm md:text-base"
        >
          <div className="flex items-center gap-2 bg-glass-dark px-5 py-2.5 rounded-full border border-gold/30">
            <MapPin className="w-4 h-4 text-gold" />
            <span className="tracking-widest font-medium">{t.hero.cityState}</span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-6"
        >
          <button
            onClick={onSaveDate}
            className="px-8 py-3.5 rounded-full bg-gold-gradient text-royal-maroon font-cormorant text-lg md:text-xl font-bold tracking-wider shadow-glow hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            {t.hero.saveTheDate}
          </button>

          <button
            onClick={onExploreStory}
            className="px-8 py-3.5 rounded-full bg-glass border border-gold/50 text-champagne hover:text-gold font-cormorant text-lg md:text-xl font-semibold tracking-wider hover:border-gold transition-all cursor-pointer"
          >
            {t.hero.exploreStory}
          </button>
        </motion.div>
      </div>

      {/* Scroll Arrow Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={onExploreStory}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold/80 hover:text-gold cursor-pointer z-20"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
}
