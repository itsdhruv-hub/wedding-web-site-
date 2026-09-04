import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function Family({ t }) {
  const { family } = weddingConfig;

  return (
    <section className="py-20 md:py-28 bg-cream-light text-softBrown overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-royal-maroon font-cormorant text-sm tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Blessed Foundations</span>
          </div>

          <h2 className="font-playfair text-4xl md:text-6xl text-maroon-gradient font-bold my-2">
            {t.family.heading}
          </h2>
          <div className="w-16 h-[1px] bg-gold-gradient mx-auto my-4" />
        </motion.div>

        {/* Patel & Shah Family Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-12">
          
          {/* BRIDE FAMILY */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-cream p-8 rounded-3xl shadow-royal border border-gold/30 flex flex-col items-center text-center hover:border-gold/60 transition-all"
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

          {/* GROOM FAMILY */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-cream p-8 rounded-3xl shadow-royal border border-gold/30 flex flex-col items-center text-center hover:border-gold/60 transition-all"
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

        </div>

      </div>
    </section>
  );
}
