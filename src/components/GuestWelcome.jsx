import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function GuestWelcome({ guestName, t }) {
  const nameToDisplay = guestName ? guestName : null;

  return (
    <section className="relative py-12 md:py-16 bg-cream text-softBrown overflow-hidden border-y border-gold/20">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        
        {/* Subtle Decorative Ornament */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-12 h-12 mx-auto rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold mb-4 shadow-sm"
        >
          <Sparkles className="w-5 h-5 text-gold" />
        </motion.div>

        {/* Personalized Name Greeting */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-script text-4xl md:text-6xl text-maroon-gradient mb-3"
        >
          {nameToDisplay
            ? t.guestWelcome.hello.replace('{name}', nameToDisplay)
            : t.guestWelcome.fallbackHello}
        </motion.h2>

        {/* Emotional Message */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-cormorant text-xl md:text-2xl text-softBrown/80 max-w-2xl mx-auto italic leading-relaxed"
        >
          "{nameToDisplay ? t.guestWelcome.text : t.guestWelcome.fallbackText}"
        </motion.p>

        {/* Bottom Decorative Divider */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="w-12 h-[1px] bg-gold/40" />
          <Heart className="w-3.5 h-3.5 text-gold fill-gold/30" />
          <div className="w-12 h-[1px] bg-gold/40" />
        </div>
      </div>
    </section>
  );
}
