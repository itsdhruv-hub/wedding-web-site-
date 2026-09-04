import React from 'react';
import { motion } from 'framer-motion';

export default function SectionDivider({ variant = 'gold', className = '' }) {
  if (variant === 'ivory-to-maroon') {
    return (
      <div className={`relative h-8 sm:h-12 bg-gradient-to-b from-[#FAF5EE] to-[#4A0E17] flex items-center justify-center overflow-hidden z-20 ${className}`}>
        <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-sm" />
      </div>
    );
  }

  if (variant === 'maroon-to-ivory') {
    return (
      <div className={`relative h-8 sm:h-12 bg-gradient-to-b from-[#4A0E17] to-[#FAF5EE] flex items-center justify-center overflow-hidden z-20 ${className}`}>
        <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-sm" />
      </div>
    );
  }

  // Standard Compact Gold Filigree Connector
  return (
    <div className={`flex items-center justify-center gap-3 my-4 sm:my-6 pointer-events-none ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-10 sm:w-14 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]/80 origin-right"
      />
      <span className="text-[#D4AF37] text-xs font-serif opacity-80">◇</span>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-10 sm:w-14 h-[1px] bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]/80 origin-left"
      />
    </div>
  );
}
