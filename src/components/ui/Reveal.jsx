import React from 'react';
import { motion } from 'framer-motion';

// Reusable viewport trigger config
const defaultViewport = { once: true, amount: 0.25 };

// 1. DIRECTIONAL REVEAL WIDGET
export function Reveal({
  children,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
  delay = 0,
  duration = 0.7,
  className = '',
  viewport = defaultViewport,
}) {
  const getVariants = () => {
    switch (direction) {
      case 'up':
        return { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 } };
      case 'down':
        return { initial: { opacity: 0, y: -28 }, animate: { opacity: 1, y: 0 } };
      case 'left':
        return { initial: { opacity: 0, x: -28 }, animate: { opacity: 1, x: 0 } };
      case 'right':
        return { initial: { opacity: 0, x: 28 }, animate: { opacity: 1, x: 0 } };
      case 'scale':
        return { initial: { opacity: 0, scale: 0.94 }, animate: { opacity: 1, scale: 1 } };
      case 'fade':
      default:
        return { initial: { opacity: 0 }, animate: { opacity: 1 } };
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      initial={variants.initial}
      whileInView={variants.animate}
      viewport={viewport}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 2. OVERFLOW MASK TEXT REVEAL (For Titles & Headings)
export function RevealText({
  children,
  delay = 0,
  duration = 0.85,
  className = '',
  as = 'h2',
  viewport = defaultViewport,
}) {
  const Component = motion[as] || motion.div;

  return (
    <div className={`overflow-hidden py-1 ${className}`}>
      <Component
        initial={{ y: '110%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={viewport}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </Component>
    </div>
  );
}

// 3. IMAGE CURTAIN CLIP-PATH REVEAL
export function RevealImage({
  children,
  delay = 0,
  duration = 0.95,
  className = '',
  viewport = defaultViewport,
}) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0.2 }}
      whileInView={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
      viewport={viewport}
      transition={{ duration, delay, ease: [0.25, 1, 0.5, 1] }}
      className={`overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}

// 4. STAGGER GROUP CONTAINER & ITEMS
export function StaggerGroup({
  children,
  staggerChildren = 0.12,
  delayChildren = 0,
  className = '',
  viewport = defaultViewport,
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
  direction = 'up',
}) {
  const getItemVariants = () => {
    switch (direction) {
      case 'scale':
        return { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } };
      case 'left':
        return { hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0 } };
      case 'right':
        return { hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } };
      case 'up':
      default:
        return { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };
    }
  };

  return (
    <motion.div
      variants={getItemVariants()}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 5. EXPANDING GOLD ACCENT DIVIDER
export function GoldDivider({
  className = '',
  delay = 0.3,
  align = 'center', // 'center' | 'left' | 'right'
  viewport = defaultViewport,
}) {
  const origin = align === 'left' ? 'left' : align === 'right' ? 'right' : 'center';

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={viewport}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: origin }}
      className={`h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent ${className}`}
    />
  );
}
