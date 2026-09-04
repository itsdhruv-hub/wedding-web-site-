import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';
import { RevealText, GoldDivider } from './ui/Reveal';

export default function MemoryCards({ t }) {
  return (
    <section className="py-20 md:py-28 bg-cream text-softBrown overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Section Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-royal-maroon font-cormorant text-sm tracking-widest uppercase mb-3"
          >
            <Heart className="w-3.5 h-3.5 text-gold fill-gold" />
            <span>Cherished Memories</span>
          </motion.div>

          <RevealText as="h2" className="font-playfair text-4xl md:text-6xl text-maroon-gradient font-bold my-2">
            {t.memoryCards.heading}
          </RevealText>

          <GoldDivider className="w-20 mx-auto my-3" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.2 }}
            className="font-cormorant text-lg md:text-xl text-softBrown/70 italic max-w-md mx-auto"
          >
            "{t.memoryCards.subheading}"
          </motion.p>
        </div>

        {/* 3D Tilting Polaroid Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {weddingConfig.memoryCards.map((card, idx) => (
            <motion.div
              key={card.caption}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: idx * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileTap={{ scale: 0.98 }}
              style={{ rotate: card.rotation }}
              className="bg-white p-4 pb-6 rounded-xl shadow-royal border border-gold/30 hover:shadow-2xl hover:border-gold/60 hover:-translate-y-2 hover:rotate-0 hover:z-20 transition-all duration-300 cursor-pointer flex flex-col items-center"
            >
              <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-gray-100 border border-black/5">
                <img
                  src={card.image}
                  alt={card.caption}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <h3 className="font-script text-2xl md:text-3xl text-royal-maroon">
                {card.caption}
              </h3>

              <p className="font-sans text-xs tracking-widest text-softBrown/60 uppercase mt-1">
                {card.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
