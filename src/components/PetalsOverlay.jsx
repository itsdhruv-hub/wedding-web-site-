import React from 'react';
import { motion } from 'framer-motion';

export default function PetalsOverlay({ active = true, count = 10 }) {
  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {[...Array(count)].map((_, i) => {
        const leftPos = Math.random() * 100;
        const duration = 12 + Math.random() * 10;
        const delay = Math.random() * 8;
        const size = 12 + Math.random() * 12;

        return (
          <motion.div
            key={i}
            initial={{
              x: `${leftPos}vw`,
              y: '-5vh',
              rotate: Math.random() * 180,
              opacity: 0,
            }}
            animate={{
              y: '105vh',
              x: [`${leftPos}vw`, `${leftPos + (Math.random() * 10 - 5)}vw`, `${leftPos}vw`],
              rotate: Math.random() * 360,
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: 'linear',
            }}
            className="absolute text-gold-rose/60 filter drop-shadow-sm select-none"
            style={{ width: size, height: size }}
          >
            {/* SVG Petal Shape */}
            <svg viewBox="0 0 30 30" fill="currentColor" className="w-full h-full">
              <path d="M15 0 C22 10, 30 18, 15 30 C0 18, 8 10, 15 0 Z" opacity="0.65" />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
}
