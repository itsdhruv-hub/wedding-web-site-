import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device is touch-enabled
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive-cursor')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      {/* Small Gold Cursor Dot */}
      <motion.div
        className="fixed w-3 h-3 bg-gold rounded-full shadow-glow pointer-events-none -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />

      {/* Trailing Outer Ring */}
      <motion.div
        className="fixed w-9 h-9 border border-gold/70 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovered ? 1.8 : 1,
          backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.15)' : 'rgba(212, 175, 55, 0)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.2 }}
      />
    </div>
  );
}
