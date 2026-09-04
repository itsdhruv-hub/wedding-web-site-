import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoader({ onFinish }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onFinish) onFinish();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-royal-maroon text-champagne p-6 overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none" />

          {/* Monogram Box */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative flex flex-col items-center"
          >
            {/* Gold Ring */}
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border border-gold/40 flex items-center justify-center relative p-3 shadow-glow">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-gold/60"
              />
              <span className="font-script text-4xl md:text-5xl text-gold-gradient tracking-wide">
                R & A
              </span>
            </div>

            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-6 font-cormorant text-xl md:text-2xl tracking-[0.25em] uppercase text-champagne/90"
            >
              Riya & Aarav
            </motion.p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '80px' }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="h-[1px] bg-gold-gradient my-3"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="font-sans text-xs md:text-sm tracking-widest text-gold/80"
            >
              18 • 02 • 2027
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
