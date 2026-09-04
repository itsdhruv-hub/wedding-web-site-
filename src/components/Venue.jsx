import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Compass, Sparkles, Plane, Train } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';
import { RevealText, GoldDivider } from './ui/Reveal';

export default function Venue({ t }) {
  return (
    <section id="venue" className="py-10 md:py-16 bg-cream text-softBrown overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-royal-maroon font-cormorant text-sm tracking-widest uppercase mb-3"
          >
            {/* Single Pin Drop Animation */}
            <motion.div
              initial={{ y: -8 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
            >
              <MapPin className="w-3.5 h-3.5 text-gold" />
            </motion.div>
            <span>Destination Venue</span>
          </motion.div>

          <RevealText as="h2" className="font-playfair text-4xl md:text-6xl text-maroon-gradient font-bold my-2">
            {t.venue.heading}
          </RevealText>

          <GoldDivider className="w-24 mx-auto my-3" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.2 }}
            className="font-cormorant text-lg md:text-xl text-softBrown/70 italic"
          >
            {weddingConfig.venueName}, {weddingConfig.city}
          </motion.p>
        </div>

        {/* Venue Showcase Card & Map Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
          
          {/* Left Venue Details & Travel Info */}
          <motion.div
            initial={{ y: 30, scale: 0.96, opacity: 0 }}
            whileInView={{ y: 0, scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-cream-light p-8 md:p-10 rounded-3xl shadow-royal border border-gold/30 flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-sans tracking-[0.2em] text-gold-dark font-bold uppercase block mb-2">
                Royal Reception & Ceremony Venue
              </span>

              <h3 className="font-playfair text-3xl md:text-4xl font-bold text-maroon-gradient mb-3">
                {weddingConfig.venueName}
              </h3>

              <p className="font-sans text-sm md:text-base text-softBrown/80 leading-relaxed mb-6">
                {weddingConfig.venueAddress}
              </p>

              {/* Travel Convenience Badges */}
              <div className="space-y-3 p-4 rounded-2xl bg-cream border border-gold/20 mb-8 font-sans text-sm">
                <div className="flex items-center gap-3">
                  <Plane className="w-4 h-4 text-gold shrink-0" />
                  <span className="text-softBrown/80">Vadodara Airport (BDQ) — 8.5 km</span>
                </div>
                <div className="flex items-center gap-3">
                  <Train className="w-4 h-4 text-gold shrink-0" />
                  <span className="text-softBrown/80">Vadodara Junction Station — 5.2 km</span>
                </div>
              </div>
            </div>

            {/* Map Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gold/20">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                href={weddingConfig.venueMapUrl}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 rounded-full bg-royal-maroon text-gold-light font-cormorant text-base md:text-lg font-bold tracking-wider hover:bg-gold-gradient hover:text-royal-maroon transition-colors flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>{t.venue.openMaps}</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Venue Photo Preview (Blur-to-Focus) */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.96 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, delay: 0.15 }}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-royal border-2 border-gold/40 group"
          >
            <img
              src={weddingConfig.images.venuePreview}
              alt={weddingConfig.venueName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-royal-maroon/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 text-champagne">
              <p className="font-cormorant text-2xl font-bold tracking-wide">
                {weddingConfig.venueName}
              </p>
              <p className="font-sans text-xs tracking-widest text-gold uppercase mt-1">
                Vadodara, Gujarat
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
