import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '../data/weddingConfig';

export default function Countdown({ t }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(weddingConfig.weddingDateISO) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  const units = [
    { label: t.countdown.days, value: formatNumber(timeLeft.days) },
    { label: t.countdown.hours, value: formatNumber(timeLeft.hours) },
    { label: t.countdown.minutes, value: formatNumber(timeLeft.minutes) },
    { label: t.countdown.seconds, value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <section className="py-20 md:py-28 bg-royal-maroon text-champagne relative overflow-hidden">
      {/* Background Ornament Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        
        {/* Section Header with generous line-height to prevent script font text cutting */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="py-4"
        >
          <span className="font-cormorant text-base md:text-lg tracking-[0.3em] uppercase text-gold font-semibold block mb-2">
            The Countdown
          </span>

          <h2 className="font-script text-5xl sm:text-6xl md:text-7xl text-gold-gradient leading-normal py-3 px-2">
            {t.countdown.heading}
          </h2>

          <div className="w-20 h-[1px] bg-gold-gradient mx-auto my-4" />
        </motion.div>

        {/* 4 Countdown Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto mt-6">
          {units.map((unit, idx) => (
            <motion.div
              key={unit.label}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative group p-6 rounded-2xl bg-glass-dark border border-gold/30 shadow-royal flex flex-col items-center justify-center hover:border-gold/60 transition-all"
            >
              <span className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-bold text-gold-gradient tracking-tight">
                {unit.value}
              </span>
              <span className="font-sans text-xs md:text-sm tracking-widest text-champagne/70 uppercase mt-2 font-medium">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
