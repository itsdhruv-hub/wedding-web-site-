import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function LoveNote({ quote, bgImage }) {
  return (
    <section className="relative py-10 md:py-16 flex items-center justify-center text-center overflow-hidden bg-royal-maroon text-champagne">
      {/* Background Image with Fixed Parallax Effect */}
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-30 mix-blend-overlay filter brightness-90"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-royal-maroonDark/80 via-royal-maroon/70 to-royal-maroonDark" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Heart className="w-8 h-8 text-gold fill-gold/30 mx-auto mb-6" />

          <p className="font-cormorant text-2xl md:text-4xl text-gold-gradient font-serif italic leading-relaxed">
            "{quote || 'Out of all the people, in all the world, we found each other.'}"
          </p>

          <div className="w-16 h-[1px] bg-gold-gradient mx-auto mt-6" />
        </motion.div>
      </div>
    </section>
  );
}
