import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Sparkles, Music, Heart, Flame, Utensils, Star } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';
import { RevealText, GoldDivider } from './ui/Reveal';

export default function WeddingTimeline({ t }) {
  const containerRef = useRef(null);

  const iconMap = {
    Music: Music,
    Heart: Heart,
    Flame: Flame,
    Utensils: Utensils,
    Sparkles: Star,
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 80%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });

  return (
    <section className="py-20 md:py-28 bg-royal-maroon text-champagne relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        {/* Section Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-glass-dark border border-gold/40 text-gold font-cormorant text-sm tracking-widest uppercase mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Wedding Day Schedule</span>
          </motion.div>

          <RevealText as="h2" className="font-script text-5xl md:text-7xl text-gold-gradient my-2">
            {t.itinerary.heading}
          </RevealText>

          <GoldDivider className="w-20 mx-auto my-3" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.2 }}
            className="font-cormorant text-lg text-champagne/80 italic"
          >
            "{t.itinerary.subheading}"
          </motion.p>
        </div>

        {/* Itinerary Grid List with Vertical Progress Track */}
        <div ref={containerRef} className="relative space-y-4 max-w-2xl mx-auto pl-6 sm:pl-0">
          
          {/* Vertical Progress Line */}
          <motion.div
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-6 sm:left-10 top-4 bottom-4 w-[2px] bg-gold-gradient z-0 hidden sm:block"
          />

          {weddingConfig.itinerary.map((item, idx) => {
            const IconComp = iconMap[item.icon] || Heart;
            return (
              <motion.div
                key={item.time + item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: idx * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex items-center gap-4 md:gap-6 p-4 md:p-5 rounded-2xl bg-glass-dark border border-gold/30 shadow-md text-left hover:border-gold/60 transition-colors"
              >
                {/* Icon Badge (Scale entrance 0 -> 1) */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 + 0.15 }}
                  className="w-12 h-12 rounded-full bg-gold-gradient text-royal-maroon flex items-center justify-center shrink-0 shadow-glow font-bold"
                >
                  <IconComp className="w-5 h-5 fill-royal-maroon text-royal-maroon" />
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-playfair text-xl md:text-2xl font-bold text-gold-gradient truncate">
                      {item.title}
                    </h3>
                    <span className="font-sans text-xs md:text-sm font-semibold text-gold tracking-wider shrink-0 bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
                      {item.time}
                    </span>
                  </div>
                  <p className="font-sans text-xs md:text-sm text-champagne/80 mt-1">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
