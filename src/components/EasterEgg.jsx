import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';

export default function EasterEgg() {
  const [clickCount, setClickCount] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const handleClick = () => {
    const next = clickCount + 1;
    setClickCount(next);

    if (next >= 5) {
      triggerEasterEgg();
      setClickCount(0);
    }
  };

  const triggerEasterEgg = () => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#D4AF37', '#F5E6BA', '#6B1724', '#FAF5EE'],
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <>
      <span
        onClick={handleClick}
        className="font-cormorant italic text-gold font-semibold cursor-pointer select-none px-1 hover:scale-125 transition-transform inline-block"
        title="Click me 5 times for a secret surprise!"
      >
        &
      </span>

      {/* Secret Pop-up Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.8 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[100] bg-royal-maroon text-gold border-2 border-gold rounded-full px-6 py-3 shadow-royal flex items-center gap-3 backdrop-blur-md"
          >
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="font-cormorant text-lg md:text-xl font-bold tracking-wide">
              "Love always finds a way." ❤️
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
