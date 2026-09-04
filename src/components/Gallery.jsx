import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function Gallery({ t }) {
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const openLightbox = (index) => setActiveImageIndex(index);
  const closeLightbox = () => setActiveImageIndex(null);

  const prevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? weddingConfig.gallery.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setActiveImageIndex((prev) =>
      prev === weddingConfig.gallery.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section id="gallery" className="py-24 md:py-32 bg-cream-light text-softBrown overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-royal-maroon font-cormorant text-sm tracking-widest uppercase mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Editorial Gallery</span>
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-playfair text-4xl md:text-6xl text-maroon-gradient font-bold my-2"
          >
            {t.gallery.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-cormorant text-lg md:text-xl text-softBrown/70 italic"
          >
            "{t.gallery.subheading}"
          </motion.p>
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
          {weddingConfig.gallery.map((img, idx) => (
            <motion.div
              key={img.url + idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
              onClick={() => openLightbox(idx)}
              className={`relative rounded-3xl overflow-hidden shadow-royal border border-gold/30 group cursor-pointer ${img.span}`}
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-maroon/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-cormorant text-xl text-champagne font-bold tracking-wide">
                  {img.caption}
                </span>
                <div className="w-9 h-9 rounded-full bg-gold/30 text-champagne flex items-center justify-center backdrop-blur-sm">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-gold hover:text-black transition-all cursor-pointer z-10"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev & Next Controls */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-gold hover:text-black transition-all cursor-pointer z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-gold hover:text-black transition-all cursor-pointer z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Lightbox Image Display */}
            <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
              <motion.img
                key={activeImageIndex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={weddingConfig.gallery[activeImageIndex].url}
                alt={weddingConfig.gallery[activeImageIndex].caption}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl border border-gold/40 shadow-2xl"
              />
              <p className="font-cormorant text-2xl text-champagne mt-4 font-semibold tracking-wide">
                {weddingConfig.gallery[activeImageIndex].caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
