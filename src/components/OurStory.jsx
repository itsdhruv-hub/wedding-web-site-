import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { weddingConfig } from '../data/weddingConfig';
import { Heart, Sparkles } from 'lucide-react';
import { RevealText, RevealImage, GoldDivider } from './ui/Reveal';

export default function OurStory({ t }) {
  const containerRef = useRef(null);

  // Scroll-linked timeline vertical line progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 80%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <section id="story" className="py-10 md:py-16 bg-cream-light text-softBrown overflow-hidden relative">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/40 text-royal-maroon font-cormorant text-sm tracking-widest uppercase mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Cinematic Timeline</span>
          </motion.div>

          <RevealText as="h2" className="font-playfair text-4xl md:text-6xl text-maroon-gradient font-bold my-2">
            {t.story.heading}
          </RevealText>

          <GoldDivider className="w-24 mx-auto my-3" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.2 }}
            className="font-cormorant text-lg md:text-xl text-softBrown/70 italic"
          >
            "{t.story.subheading}"
          </motion.p>
        </div>

        {/* Vertical Timeline Container */}
        <div ref={containerRef} className="relative">
          
          {/* Timeline Background Track */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-[2px] bg-gold/20" />

          {/* Progressive Growing Gold Timeline Line */}
          <motion.div
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-[2.5px] bg-gradient-to-b from-[#D4AF37] via-[#B8860B] to-[#9A7B1C] shadow-[0_0_10px_rgba(212,175,55,0.6)] z-10"
          />

          {/* Story Milestones */}
          <div className="space-y-8 md:space-y-12 relative z-20">
            {weddingConfig.story.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={item.year + item.title}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Badge */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: [0, 1.2, 1], opacity: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6 }}
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 z-30 w-10 h-10 rounded-full bg-royal-maroon border-2 border-gold flex items-center justify-center shadow-glow text-gold"
                  >
                    <Heart className="w-4 h-4 fill-gold text-gold" />
                  </motion.div>

                  {/* Content Box */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 24 : -24, y: 16 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}
                  >
                    <div className="bg-cream p-6 md:p-8 rounded-3xl shadow-royal border border-gold/30 hover:border-gold/60 transition-colors">
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
                  </motion.div>

                  {/* Image Box */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 mt-6 md:mt-0 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    <RevealImage className="relative aspect-[4/3] rounded-2xl shadow-md border-2 border-gold/40 group">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-royal-maroon/30 to-transparent pointer-events-none" />
                    </RevealImage>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
