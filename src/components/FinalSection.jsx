import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Navigation, Calendar } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';
import { RevealText, GoldDivider } from './ui/Reveal';

export default function FinalSection({ t }) {
  const scrollTo = (id) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-between py-20 px-6 bg-royal-maroon text-champagne overflow-hidden text-center">
      {/* Background Photo with Settling Parallax Scale 1.07 -> 1 */}
      <motion.div
        initial={{ scale: 1.07 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        className="absolute inset-0 bg-cover bg-center opacity-30 filter brightness-90 contrast-105"
        style={{ backgroundImage: `url(${weddingConfig.images.finalSectionBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-royal-maroonDark/90 via-royal-maroon/70 to-royal-maroonDark z-1 pointer-events-none" />

      {/* Main Content Box */}
      <div className="relative z-10 max-w-4xl mx-auto my-auto py-12 flex flex-col items-center">
        
        {/* Heart Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold mb-6 shadow-glow"
        >
          <Heart className="w-8 h-8 fill-gold text-gold" />
        </motion.div>

        {/* 3 Poem Lines Staggered Mask Reveals */}
        <div className="space-y-1 mb-4">
          <RevealText as="h2" delay={0.1} className="font-playfair text-4xl sm:text-5xl md:text-7xl font-bold text-gold-gradient tracking-tight">
            {t.final.line1}
          </RevealText>
          <RevealText as="h2" delay={0.35} className="font-playfair text-4xl sm:text-5xl md:text-7xl font-bold text-gold-gradient tracking-tight">
            {t.final.line2}
          </RevealText>
          <RevealText as="h2" delay={0.6} className="font-playfair text-4xl sm:text-5xl md:text-7xl font-bold text-gold-gradient tracking-tight">
            {t.final.line3}
          </RevealText>
        </div>

        <GoldDivider className="w-24 mx-auto my-3" delay={0.8} />

        {/* Couple Title */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="font-script text-4xl md:text-5xl text-champagne my-3"
        >
          {weddingConfig.coupleTitle}
        </motion.p>

        {/* Final Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="font-cormorant text-xl md:text-2xl text-champagne/90 italic max-w-lg mx-auto mb-8"
        >
          "{t.final.text}"
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 1.15, duration: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo('scratch-date')}
            className="px-8 py-3.5 rounded-full bg-gold-gradient text-royal-maroon font-cormorant text-lg font-bold tracking-wider shadow-glow cursor-pointer"
          >
            Save The Date
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo('venue')}
            className="px-8 py-3.5 rounded-full bg-glass border border-gold/50 text-champagne hover:text-gold font-cormorant text-lg font-semibold tracking-wider hover:border-gold transition-colors cursor-pointer"
          >
            Get Directions
          </motion.button>
        </motion.div>
      </div>

      {/* Footer Branding */}
      <div className="relative z-10 border-t border-gold/20 pt-6 text-xs font-sans tracking-widest text-champagne/60 uppercase">
        <p>{t.final.madeWithLove}</p>
      </div>
    </section>
  );
}
