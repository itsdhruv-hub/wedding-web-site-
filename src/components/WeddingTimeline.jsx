import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Music, Heart, Flame, Utensils, Star } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function WeddingTimeline({ t }) {
  const iconMap = {
    Music: Music,
    Heart: Heart,
    Flame: Flame,
    Utensils: Utensils,
    Sparkles: Star,
  };

  return (
    <section className="py-20 md:py-28 bg-royal-maroon text-champagne relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-glass-dark border border-gold/40 text-gold font-cormorant text-sm tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Wedding Day Schedule</span>
          </div>

          <h2 className="font-script text-5xl md:text-7xl text-gold-gradient my-2">
            {t.itinerary.heading}
          </h2>

          <p className="font-cormorant text-lg text-champagne/80 italic mb-12">
            "{t.itinerary.subheading}"
          </p>
        </motion.div>

        {/* Itinerary Grid List */}
        <div className="space-y-4 max-w-2xl mx-auto">
          {weddingConfig.itinerary.map((item, idx) => {
            const IconComp = iconMap[item.icon] || Heart;
            return (
              <motion.div
                key={item.time + item.title}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex items-center gap-4 md:gap-6 p-4 md:p-5 rounded-2xl bg-glass-dark border border-gold/30 shadow-md text-left hover:border-gold/60 transition-all"
              >
                {/* Icon Badge */}
                <div className="w-12 h-12 rounded-full bg-gold-gradient text-royal-maroon flex items-center justify-center shrink-0 shadow-glow font-bold">
                  <IconComp className="w-5 h-5 fill-royal-maroon" />
                </div>

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
