import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function MemoryCards({ t }) {
  return (
    <section className="py-20 md:py-28 bg-cream text-softBrown overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-royal-maroon font-cormorant text-sm tracking-widest uppercase mb-3">
            <Heart className="w-3.5 h-3.5 text-gold fill-gold" />
            <span>Cherished Memories</span>
          </div>

          <h2 className="font-playfair text-4xl md:text-6xl text-maroon-gradient font-bold my-2">
            {t.memoryCards.heading}
          </h2>

          <p className="font-cormorant text-lg md:text-xl text-softBrown/70 italic max-w-md mx-auto mb-16">
            "{t.memoryCards.subheading}"
          </p>
        </motion.div>

        {/* 3D Tilting Polaroid Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {weddingConfig.memoryCards.map((card, idx) => (
            <motion.div
              key={card.caption}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.04, rotate: '0deg', zIndex: 10 }}
              style={{ rotate: card.rotation }}
              className="bg-white p-4 pb-6 rounded-xl shadow-royal border border-gold/30 transition-transform duration-300 cursor-pointer flex flex-col items-center"
            >
              <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-gray-100 border border-black/5">
                <img
                  src={card.image}
                  alt={card.caption}
                  className="w-full h-full object-cover"
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
