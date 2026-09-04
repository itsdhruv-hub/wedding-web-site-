import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function InvitationEnvelope({ guestName, t, onOpenEnvelope, currentLang, onSelectLang }) {
  // Stage states: 'closed' | 'pressing' | 'releasing' | 'opening_flap' | 'card_rising' | 'zooming'
  const [stage, setStage] = useState('closed');
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // 12 Ambient Floating Gold Dust Particles
  const particles = useMemo(() => {
    return [...Array(14)].map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      scale: 0.4 + Math.random() * 0.6,
      opacity: 0.2 + Math.random() * 0.5,
      duration: 14 + Math.random() * 12,
      delay: Math.random() * 6,
    }));
  }, []);

  const handleSealClick = () => {
    if (stage !== 'closed') return;

    // Stage 1: Press Seal (200ms)
    setStage('pressing');

    setTimeout(() => {
      // Stage 2: Release Seal (250ms)
      setStage('releasing');

      setTimeout(() => {
        // Stage 3: Flap Opens (1100ms)
        setStage('opening_flap');

        setTimeout(() => {
          // Stage 5: Card Rises (900ms)
          setStage('card_rising');

          setTimeout(() => {
            // Stage 6: Zoom toward viewer (350ms) & transition to site
            setStage('zooming');

            setTimeout(() => {
              onOpenEnvelope();
            }, 400);
          }, 950);
        }, 1100);
      }, 250);
    }, 200);
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'gu', label: 'ગુજરાતી' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'desi', label: 'Desi' },
  ];

  const isFlapOpen = ['opening_flap', 'card_rising', 'zooming'].includes(stage);
  const isCardEmerging = ['card_rising', 'zooming'].includes(stage);
  const isZooming = stage === 'zooming';

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center min-h-[100dvh] w-full bg-[#1C0409] bg-[radial-gradient(ellipse_at_center,#4A0815_0%,#24040A_60%,#120205_100%)] select-none overflow-hidden p-4 sm:p-6"
    >
      {/* Subtle Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.85)] z-0" />

      {/* AMBIENT FLOATING GOLD PARTICLES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: p.opacity, scale: p.scale }}
            animate={{ 
              y: ['-10%', '110%'],
              opacity: [p.opacity, p.opacity * 1.5, p.opacity],
              rotate: [0, 360]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: p.delay,
            }}
            className="absolute text-[#D6B45C]/35 text-xs blur-[0.4px]"
          >
            ✦
          </motion.div>
        ))}
      </div>

      {/* TOP-LEFT HEADER BADGE */}
      <div className="fixed top-6 left-4 sm:top-8 sm:left-8 z-50 pointer-events-auto">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#24040A]/70 border border-[#D6B45C]/40 text-[#D6B45C] text-[11px] sm:text-[12px] font-sans tracking-[0.12em] uppercase shadow-lg backdrop-blur-md">
          <span className="text-[#D6B45C] font-semibold">✣</span>
          <span>Digital Wedding Invitation</span>
        </div>
      </div>

      {/* TOP-RIGHT SOUND BUTTON */}
      <div className="fixed top-6 right-4 sm:top-8 sm:right-8 z-50 pointer-events-auto">
        <button
          onClick={() => setIsAudioMuted(!isAudioMuted)}
          className="w-[44px] h-[44px] rounded-full bg-[#24040A]/70 border border-[#D6B45C]/40 text-[#D6B45C] flex items-center justify-center backdrop-blur-md shadow-lg hover:border-[#D6B45C] hover:shadow-[0_0_15px_rgba(214,180,92,0.4)] transition-all cursor-pointer"
          aria-label="Toggle sound"
        >
          {isAudioMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#D6B45C]" />}
        </button>
      </div>

      {/* CENTERED 3D ENVELOPE SCENE CONTAINER */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-[560px] my-auto">
        
        {/* PHYSICAL 3D ENVELOPE (LANDSCAPE 1.45 : 1 RATIO) */}
        <motion.div
          animate={{ 
            y: isZooming ? 40 : 0,
            opacity: isZooming ? 0.2 : 1,
            scale: isZooming ? 0.92 : 1
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="perspective-1200 relative w-[88vw] max-w-[520px] aspect-[1.45/1] max-h-[360px] flex items-center justify-center"
        >
          <div className="preserve-3d relative w-full h-full rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-[#B89236]/40 bg-[#380610] overflow-visible">
            
            {/* LAYER 1: ENVELOPE BACK WALL (POUCH INTERIOR) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#28040B] via-[#380610] to-[#1F0308] rounded-xl overflow-hidden z-1">
              
              {/* LAYER 2: WARM GOLDEN INNER LIGHT GLOW (Fades in when opened) */}
              <motion.div 
                animate={{ opacity: isFlapOpen ? 1 : 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(240,198,98,0.30)_0%,transparent_70%)] pointer-events-none"
              />
            </div>

            {/* LAYER 3: INVITATION CARD (EMERGES FROM INSIDE BEHIND FRONT FOLDS) */}
            <motion.div
              initial={{ y: '25%', scale: 0.94, opacity: 0 }}
              animate={{ 
                y: isZooming 
                  ? '-10%' 
                  : isCardEmerging 
                    ? '-36%' 
                    : '25%',
                scale: isZooming ? 3.5 : isCardEmerging ? 1 : 0.94,
                opacity: isCardEmerging ? 1 : 0,
              }}
              transition={{ 
                duration: isZooming ? 0.4 : 0.9, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="absolute inset-x-[4%] top-[4%] bottom-[4%] bg-[#F6EDD9] text-[#24040A] rounded-lg shadow-[0_15px_35px_rgba(0,0,0,0.5)] border border-[#B89236]/70 p-4 sm:p-5 flex flex-col justify-between items-center text-center z-3 overflow-hidden"
            >
              {/* Floral Corner Ornaments */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#B89236]/80" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#B89236]/80" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#B89236]/80" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#B89236]/80" />

              <div className="my-auto py-1 flex flex-col items-center">
                <span className="font-cormorant text-[10px] sm:text-xs tracking-[0.25em] text-[#5D0B1E] uppercase font-bold block mb-1">
                  {t.envelope?.togetherWith || 'TOGETHER WITH THEIR FAMILIES'}
                </span>

                <div className="font-script text-3xl sm:text-4xl text-[#5D0B1E] leading-tight my-0.5">
                  {weddingConfig.brideName} & {weddingConfig.groomName}
                </div>

                <p className="font-cormorant text-[10px] sm:text-xs text-[#4A3E3D]/80 tracking-widest uppercase mt-1">
                  {t.envelope?.inviteYou || 'Invite you to celebrate their wedding'}
                </p>

                <div className="mt-2.5 px-3 py-1 rounded-full bg-[#B89236]/15 border border-[#B89236]/40 text-[#5D0B1E] font-serif text-[11px] font-semibold tracking-wider uppercase">
                  {weddingConfig.weddingDateFormatted} • {weddingConfig.city}
                </div>
              </div>
            </motion.div>

            {/* LAYER 4: LEFT PAPER FOLD */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-[#24040A] via-[#4A0815] to-[#36060F] z-4 pointer-events-none drop-shadow-md"
              style={{ clipPath: 'polygon(0 0, 0 100%, 50% 50%)' }}
            />

            {/* LAYER 5: RIGHT PAPER FOLD */}
            <div 
              className="absolute inset-0 bg-gradient-to-l from-[#24040A] via-[#4A0815] to-[#36060F] z-5 pointer-events-none drop-shadow-md"
              style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)' }}
            />

            {/* LAYER 6: BOTTOM PAPER FOLD */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-[#1d0308] via-[#4A0815] to-[#5D0B1E] z-6 pointer-events-none border-t border-[#D6B45C]/30 drop-shadow-lg"
              style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)' }}
            />

            {/* SEAM HIGHLIGHT OVERLAY LINES */}
            <svg className="absolute inset-0 w-full h-full z-6 pointer-events-none opacity-40">
              <line x1="0" y1="0" x2="50%" y2="50%" stroke="#D6B45C" strokeWidth="1" />
              <line x1="100%" y1="0" x2="50%" y2="50%" stroke="#D6B45C" strokeWidth="1" />
              <line x1="0" y1="100%" x2="50%" y2="50%" stroke="#D6B45C" strokeWidth="1" />
              <line x1="100%" y1="100%" x2="50%" y2="50%" stroke="#D6B45C" strokeWidth="1" />
            </svg>

            {/* LAYER 7: 3D TOP TRIANGULAR PAPER FLAP */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ rotateX: isFlapOpen ? -165 : 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="preserve-3d backface-hidden absolute inset-0 bg-gradient-to-b from-[#5D0B1E] via-[#4A0815] to-[#24040A] z-7 origin-top drop-shadow-2xl border-b border-[#D6B45C]/40"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 50%)' }}
            />

            {/* LAYER 8: REALISTIC 3D WAX SEAL BUTTON */}
            <AnimatePresence>
              {stage !== 'releasing' && !isFlapOpen && (
                <motion.div
                  initial={{ scale: 1, z: 0, opacity: 1 }}
                  animate={{ 
                    scale: stage === 'pressing' ? 0.92 : 1,
                    z: stage === 'releasing' ? 30 : 0,
                    opacity: stage === 'releasing' ? 0 : 1
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: stage === 'pressing' ? 0.2 : 0.25 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-8 pointer-events-auto"
                >
                  <motion.button
                    whileHover={{ y: -3, scale: 1.04 }}
                    onClick={handleSealClick}
                    aria-label="Open wedding invitation"
                    className="relative group w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] rounded-full bg-gradient-to-br from-[#8C1A2B] via-[#5D0B1E] to-[#380610] p-1 flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.7),inset_0_2px_4px_rgba(255,255,255,0.3)] border-2 border-[#D6B45C] cursor-pointer transition-all"
                  >
                    {/* Inner Embossed Gold Ring */}
                    <div className="w-full h-full rounded-full border border-[#D6B45C]/70 flex flex-col items-center justify-center p-1 bg-[radial-gradient(circle_at_35%_35%,rgba(214,180,92,0.25)_0%,transparent_70%)]">
                      <Sparkles className="w-4 h-4 text-[#D6B45C] mb-0.5" />
                      <span className="font-sans text-[10px] font-black tracking-widest text-[#D6B45C] uppercase">
                        OPEN
                      </span>
                    </div>

                    {/* Outer Glow Ring on Hover */}
                    <div className="absolute inset-[-4px] rounded-full border border-[#D6B45C]/0 group-hover:border-[#D6B45C]/60 group-hover:shadow-[0_0_20px_rgba(214,180,92,0.4)] transition-all pointer-events-none" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

        {/* OPEN INSTRUCTION CAPTION BELOW SEAL */}
        <AnimatePresence>
          {!isFlapOpen && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.9, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[12px] sm:text-[13px] font-cormorant font-medium uppercase tracking-[0.18em] text-[#D6B45C] mt-6 sm:mt-8 text-center drop-shadow"
            >
              Tap to open your invitation
            </motion.p>
          )}
        </AnimatePresence>

        {/* EXTERNAL LANGUAGE SELECTOR (PLACED OUTSIDE BELOW THE ENVELOPE) */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 sm:gap-3 z-30 pointer-events-auto">
          {onSelectLang && languages.map((lang) => {
            const isActive = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onSelectLang(lang.code)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-300 cursor-pointer shadow-md ${
                  isActive
                    ? 'bg-[#D6B45C] text-[#24040A] font-bold scale-105 shadow-[0_0_12px_rgba(214,180,92,0.5)]'
                    : 'bg-[#24040A]/60 text-[#F6EDD9]/80 border border-[#D6B45C]/35 hover:bg-white/10 hover:text-[#F6EDD9]'
                }`}
              >
                {lang.label}
              </button>
            );
          })}
        </div>

      </div>

    </motion.div>
  );
}
