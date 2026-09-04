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
          exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1C0409] bg-[radial-gradient(ellipse_at_center,#4A0815_0%,#24040A_60%,#120205_100%)] text-[#F6EDD9] p-6 overflow-hidden select-none"
        >
          {/* Ambient Radial Golden Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,180,92,0.18)_0%,transparent_70%)] pointer-events-none" />

          {/* Luxury Monogram Box */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center text-center"
          >
            {/* Double Gold Ring Frame */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-[#D6B45C]/50 flex items-center justify-center relative p-4 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(214,180,92,0.3)] bg-[#24040A]/50 backdrop-blur-sm">
              
              {/* Rotating Dashed Outer Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-6px] rounded-full border border-dashed border-[#D6B45C]/60"
              />

              {/* Inner Gold Foil Line */}
              <div className="absolute inset-1 rounded-full border border-[#D6B45C]/30 pointer-events-none" />

              {/* Single Line Monogram */}
              <div className="flex items-center justify-center gap-1.5 whitespace-nowrap z-10 px-2">
                <span className="font-serif text-3xl md:text-4xl text-gold-gradient font-bold drop-shadow">
                  R
                </span>
                <span className="font-cormorant text-xl md:text-2xl text-[#D6B45C] italic font-semibold mx-0.5">
                  &
                </span>
                <span className="font-serif text-3xl md:text-4xl text-gold-gradient font-bold drop-shadow">
                  A
                </span>
              </div>
            </div>

            {/* Couple Full Names */}
            <motion.h1
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-7 font-cormorant text-2xl md:text-3xl tracking-[0.3em] uppercase text-[#F6EDD9] font-bold drop-shadow"
            >
              Riya & Aarav
            </motion.h1>

            {/* Shimmer Line Divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '90px' }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="h-[1.5px] bg-gradient-to-r from-transparent via-[#D6B45C] to-transparent my-3.5"
            />

            {/* Wedding Date */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="font-sans text-xs md:text-sm tracking-[0.25em] text-[#D6B45C] font-medium uppercase flex items-center gap-2"
            >
              <span>✦</span>
              <span>18 • 02 • 2027</span>
              <span>✦</span>
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
