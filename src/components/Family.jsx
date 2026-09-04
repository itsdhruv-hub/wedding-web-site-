import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';
import { RevealText, GoldDivider } from './ui/Reveal';

export default function Family({ t }) {
  const { family } = weddingConfig;

  return (
    <section className="py-10 md:py-14 bg-cream-light text-softBrown overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center">
        
        {/* Section Header */}
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-royal-maroon font-cormorant text-sm tracking-widest uppercase mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Blessed Foundations</span>
          </motion.div>

          <RevealText as="h2" className="font-playfair text-4xl md:text-6xl text-maroon-gradient font-bold my-2">
            {t.family.heading}
          </RevealText>

          <GoldDivider className="w-20 mx-auto my-3" />
        </div>

        {/* Patel & Shah Family Showcase Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
          
          {/* BRIDE FAMILY (Left Reveal) */}
          <motion.div
            initial={{ opacity: 0, x: -24, y: 16 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="bg-cream p-8 rounded-3xl shadow-royal border border-gold/30 flex flex-col items-center text-center hover:border-gold/60 transition-colors"
          >
            <span className="text-xs font-sans tracking-[0.2em] text-gold-dark uppercase font-bold mb-2">
              {t.family.brideSide}
            </span>

            <h3 className="font-playfair text-2xl md:text-3xl text-maroon-gradient font-bold my-2">
              {family.brideParents}
            </h3>

            <p className="font-cormorant text-base md:text-lg text-softBrown/80 italic mt-2 leading-relaxed">
              "{family.brideFamilyNote}"
            </p>
          </motion.div>

          {/* GROOM FAMILY (Right Reveal) */}
          <motion.div
            initial={{ opacity: 0, x: 24, y: 16 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="bg-cream p-8 rounded-3xl shadow-royal border border-gold/30 flex flex-col items-center text-center hover:border-gold/60 transition-colors"
          >
            <span className="text-xs font-sans tracking-[0.2em] text-gold-dark uppercase font-bold mb-2">
              {t.family.groomSide}
            </span>

            <h3 className="font-playfair text-2xl md:text-3xl text-maroon-gradient font-bold my-2">
              {family.groomParents}
            </h3>

            <p className="font-cormorant text-base md:text-lg text-softBrown/80 italic mt-2 leading-relaxed">
              "{family.groomFamilyNote}"
            </p>
          </motion.div>

          {/* Connecting Heart Ornament */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gold-gradient text-royal-maroon flex items-center justify-center shadow-lg border-2 border-white hidden md:flex"
          >
            <Heart className="w-4 h-4 fill-royal-maroon text-royal-maroon" />
          </motion.div>

        </div>

      </div>
    </section>
  );
}
