import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '../data/weddingConfig';
import { Heart, Sparkles } from 'lucide-react';

export default function OurStory({ t }) {
  return (
    <section id="story" className="py-24 md:py-32 bg-cream-light text-softBrown overflow-hidden relative">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/40 text-royal-maroon font-cormorant text-sm tracking-widest uppercase mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Cinematic Timeline</span>
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-playfair text-4xl md:text-6xl text-maroon-gradient font-bold my-2"
          >
            {t.story.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-cormorant text-lg md:text-xl text-softBrown/70 italic"
          >
            "{t.story.subheading}"
          </motion.p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative">
          
          {/* Vertical Central Line */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-gold/20 via-gold to-gold/20" />

          {/* Story Milestones */}
          <div className="space-y-16 md:space-y-24">
            {weddingConfig.story.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={item.year + item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Badge */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full bg-royal-maroon border-2 border-gold flex items-center justify-center shadow-glow text-gold">
                    <Heart className="w-4 h-4 fill-gold text-gold" />
                  </div>

                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                    <div className="bg-cream p-6 md:p-8 rounded-3xl shadow-royal border border-gold/30 hover:border-gold/60 transition-all">
                      <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-royal-maroon font-cormorant text-sm font-bold tracking-widest mb-3">
                        {item.year}
                      </span>

                      <h3 className="font-playfair text-2xl md:text-3xl text-maroon-gradient font-bold">
                        {item.title}
                      </h3>

                      <p className="font-cormorant text-base text-gold-dark font-medium italic mt-1 mb-3">
                        {item.subtitle}
                      </p>

                      <p className="font-sans text-sm md:text-base text-softBrown/80 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Image Box */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 mt-6 md:mt-0 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border-2 border-gold/40 group">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-royal-maroon/30 to-transparent" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
