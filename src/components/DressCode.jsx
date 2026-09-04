import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Palette } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function DressCode({ t }) {
  return (
    <section className="py-10 md:py-14 bg-cream-light text-softBrown overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-royal-maroon font-cormorant text-sm tracking-widest uppercase mb-3">
            <Palette className="w-3.5 h-3.5 text-gold" />
            <span>Style & Aesthetics</span>
          </div>

          <h2 className="font-playfair text-4xl md:text-6xl text-maroon-gradient font-bold my-2">
            {t.dressCode.heading}
          </h2>

          <p className="font-cormorant text-lg md:text-xl text-softBrown/70 italic max-w-md mx-auto mb-6">
            "{t.dressCode.subheading}"
          </p>
        </motion.div>

        {/* Dress Code Swatches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {weddingConfig.events.map((event, idx) => (
            <motion.div
              key={event.id + '-dress'}
              initial={{ y: 25, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-6 rounded-3xl bg-cream border border-gold/30 shadow-md text-left flex flex-col justify-between hover:border-gold/60 transition-all"
            >
              <div>
                <span className="text-xs font-sans tracking-widest text-gold-dark font-bold uppercase block mb-1">
                  {event.name}
                </span>

                <h3 className="font-playfair text-xl font-bold text-royal-maroon mb-2">
                  {event.dressCode}
                </h3>

                <p className="font-sans text-xs text-softBrown/70 mb-4">
                  Theme Palette:
                </p>
              </div>

              {/* Color Swatch Circles */}
              <div className="flex items-center gap-3 pt-4 border-t border-gold/20">
                {event.colors.map((c) => (
                  <div key={c.name} className="group relative flex items-center">
                    <div
                      className="w-8 h-8 rounded-full border-2 border-white shadow-md transition-transform group-hover:scale-110"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 rounded bg-royal-maroon text-champagne text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
