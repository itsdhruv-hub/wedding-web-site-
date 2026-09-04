import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Film, Sparkles } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function StoryVideo({ t }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 md:py-28 bg-royal-maroon text-champagne relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-glass-dark border border-gold/40 text-gold font-cormorant text-sm tracking-widest uppercase mb-3">
            <Film className="w-3.5 h-3.5 text-gold" />
            <span>Cinematic Film</span>
          </div>

          <h2 className="font-script text-5xl md:text-7xl text-gold-gradient my-2">
            {t.video.heading}
          </h2>

          <p className="font-cormorant text-lg md:text-xl text-champagne/80 italic max-w-lg mx-auto mb-10">
            "{t.video.subheading}"
          </p>
        </motion.div>

        {/* Video Card Poster Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-3xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-royal border-2 border-gold/50 group cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          <img
            src={weddingConfig.video.poster}
            alt={weddingConfig.video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-maroonDark/90 via-royal-maroon/30 to-transparent" />

          {/* Custom Play Button Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold-gradient text-royal-maroon flex items-center justify-center shadow-glow border-2 border-champagne mb-4"
            >
              <Play className="w-8 h-8 md:w-10 md:h-10 fill-royal-maroon text-royal-maroon ml-1" />
            </motion.div>
            <span className="font-cormorant text-xl font-bold tracking-widest uppercase text-champagne drop-shadow">
              {t.video.playButton}
            </span>
          </div>
        </motion.div>

      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-gold hover:text-black transition-all cursor-pointer z-10"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gold/40">
              <video
                src={weddingConfig.video.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
