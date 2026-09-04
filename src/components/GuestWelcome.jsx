import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { RevealText, GoldDivider } from './ui/Reveal';

export default function GuestWelcome({ guestName, t }) {
  const nameToDisplay = guestName ? guestName : null;

  return (
    <section className="relative py-8 md:py-12 bg-cream text-softBrown overflow-hidden border-y border-gold/20">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        
        {/* Decorative Ornament */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="w-12 h-12 mx-auto rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold mb-4 shadow-sm"
        >
          <Sparkles className="w-5 h-5 text-gold" />
        </motion.div>

        {/* Personalized Name Greeting Mask Reveal */}
        <RevealText as="h2" className="font-script text-4xl md:text-6xl text-maroon-gradient mb-3" delay={0.1}>
          {nameToDisplay
            ? t.guestWelcome.hello.replace('{name}', nameToDisplay)
            : t.guestWelcome.fallbackHello}
        </RevealText>

        {/* Emotional Message */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-cormorant text-xl md:text-2xl text-softBrown/80 max-w-2xl mx-auto italic leading-relaxed my-2"
        >
          "{nameToDisplay ? t.guestWelcome.text : t.guestWelcome.fallbackText}"
        </motion.p>

        {/* Bottom Decorative Divider */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <GoldDivider className="w-12" align="right" delay={0.4} />
          <Heart className="w-3.5 h-3.5 text-gold fill-gold/30" />
          <GoldDivider className="w-12" align="left" delay={0.4} />
        </div>
      </div>
    </section>
  );
}
