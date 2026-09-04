import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, CalendarCheck, Heart } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';
import { RevealText, GoldDivider } from './ui/Reveal';

export default function ScratchDate({ t }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [hasStartedScratching, setHasStartedScratching] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    initCanvas();
    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Draw luxury metallic rose-gold scratch surface
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#D4AF37'); // Gold
    gradient.addColorStop(0.3, '#F5E6BA');
    gradient.addColorStop(0.6, '#B8860B');
    gradient.addColorStop(1, '#9A7B1C');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative Text pattern on top of scratch surface
    ctx.fillStyle = 'rgba(74, 14, 23, 0.5)';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH WITH FINGER OR CURSOR ✨', canvas.width / 2, canvas.height / 2);
  };

  const getPointerPos = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const scratch = (e) => {
    if (!isDrawing.current || isScratched) return;
    if (!hasStartedScratching) setHasStartedScratching(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getPointerPos(e);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 32, 0, Math.PI * 2);
    ctx.fill();

    checkPercentage();
  };

  const checkPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentCount = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentCount++;
    }

    const percent = Math.round((transparentCount / (pixels.length / 4)) * 100);
    setScratchPercent(percent);

    if (percent > 45 && !isScratched) {
      setIsScratched(true);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      triggerSparkleBurst();
    }
  };

  const triggerSparkleBurst = () => {
    confetti({
      particleCount: 110,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#D4AF37', '#F5E6BA', '#6B1724', '#FFFFFF'],
    });
  };

  const handleStart = (e) => {
    isDrawing.current = true;
    scratch(e);
  };

  const handleEnd = () => {
    isDrawing.current = false;
  };

  const downloadICS = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Riya & Aarav Royal Wedding//EN
BEGIN:VEVENT
SUMMARY:Riya & Aarav Royal Wedding
DESCRIPTION:We invite you to celebrate our wedding in Vadodara, Gujarat.
LOCATION:The Palace Convention Center, Vadodara, Gujarat
DTSTART:20270218T133000Z
DTEND:20270218T183000Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Riya_Aarav_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="scratch-date" className="py-10 md:py-14 bg-cream text-softBrown overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* Section Header */}
        <div className="mb-5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-royal-maroon font-cormorant text-sm tracking-widest uppercase mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Scratch To Unlock</span>
          </motion.div>

          <RevealText as="h2" className="font-playfair text-3xl md:text-5xl text-maroon-gradient font-bold mb-2">
            {t.scratchDate.heading}
          </RevealText>

          <GoldDivider className="w-20 mx-auto my-3" />

          <p className="font-sans text-sm md:text-base text-softBrown/70 max-w-md mx-auto">
            {t.scratchDate.subheading}
          </p>
        </div>

        {/* Scratch Card Container (3D Tilt Entrance) */}
        <motion.div
          ref={containerRef}
          initial={{ scale: 0.92, rotateX: 7, opacity: 0 }}
          whileInView={{ scale: 1, rotateX: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-md mx-auto aspect-[16/9] rounded-3xl overflow-hidden shadow-royal border-2 border-gold/60 bg-royal-maroon text-champagne p-6 flex flex-col items-center justify-center select-none [perspective:1000px]"
        >
          {/* Revealed Underlying 3D Wedding Date Card */}
          <AnimatePresence>
            <motion.div
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-royal-maroonDark via-royal-maroon to-royal-maroonDark rounded-2xl text-center border border-gold/40 shadow-inner"
            >
              <div className="inline-flex items-center gap-1.5 text-gold text-xs font-sans tracking-[0.25em] uppercase mb-1">
                <Heart className="w-3.5 h-3.5 fill-gold" />
                <span>{t.scratchDate.revealedTitle}</span>
              </div>
              
              <h3 className="font-cormorant text-3xl md:text-5xl font-bold text-gold-gradient my-1 tracking-wider">
                {weddingConfig.weddingDateFormatted}
              </h3>
              
              <p className="font-sans text-sm tracking-widest text-champagne/90 font-medium">
                {weddingConfig.weddingDay} • {weddingConfig.weddingTime}
              </p>
              
              <p className="font-serif text-xs italic text-gold/80 mt-2">
                {weddingConfig.venueName}, Vadodara
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Interactive Scratch Canvas Overlay */}
          {!isScratched && (
            <canvas
              ref={canvasRef}
              onMouseDown={handleStart}
              onMouseMove={scratch}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={scratch}
              onTouchEnd={handleEnd}
              className="absolute inset-0 w-full h-full cursor-pointer touch-none z-10"
            />
          )}

          {/* Swipe Hint Overlay (Pulses twice then stops) */}
          {!isScratched && !hasStartedScratching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1, 0] }}
              transition={{ duration: 3, times: [0, 0.25, 0.5, 0.75, 1] }}
              className="absolute pointer-events-none z-20 flex flex-col items-center text-champagne text-xs font-sans tracking-widest uppercase bg-black/40 px-3 py-1.5 rounded-full border border-gold/40 backdrop-blur-sm"
            >
              <span>👆 Swipe across to reveal</span>
            </motion.div>
          )}
        </motion.div>

        {/* Scratch Progress & Actions */}
        <div className="mt-6 flex flex-col items-center gap-4">
          {!isScratched ? (
            <p className="text-xs font-sans tracking-widest text-gold-dark font-semibold">
              {t.scratchDate.scratchedPercent.replace('{percent}', scratchPercent)}
            </p>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-wrap items-center justify-center gap-4 mt-2"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadICS}
                className="px-8 py-3.5 rounded-full bg-gold-gradient text-royal-maroon font-cormorant text-base md:text-lg font-bold tracking-wider shadow-glow flex items-center gap-2 cursor-pointer"
              >
                <CalendarCheck className="w-5 h-5 text-royal-maroon" />
                <span>{t.scratchDate.addToCalendar}</span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
