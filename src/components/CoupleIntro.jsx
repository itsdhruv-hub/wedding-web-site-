import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';
import { RevealText, RevealImage, GoldDivider } from './ui/Reveal';

const InstagramIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function CoupleIntro({ t }) {
  return (
    <section className="py-20 md:py-28 bg-cream text-softBrown overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="font-cormorant text-base md:text-lg tracking-[0.25em] uppercase text-gold-dark font-semibold block mb-2"
          >
            {t.couple.heading}
          </motion.span>
          
          <RevealText as="h2" className="font-playfair text-4xl md:text-6xl text-maroon-gradient font-bold my-2">
            {weddingConfig.brideName} & {weddingConfig.groomName}
          </RevealText>

          <GoldDivider className="w-24 mx-auto my-3" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.3 }}
            className="font-cormorant text-lg md:text-xl text-softBrown/70 italic"
          >
            "{t.couple.subheading}"
          </motion.p>
        </div>

        {/* Bride & Groom Editorial Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* BRIDE CARD */}
          <motion.div
            initial={{ y: 24, rotate: -1.5, opacity: 0 }}
            whileInView={{ y: 0, rotate: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative group bg-cream-light rounded-3xl p-6 md:p-8 shadow-royal border border-gold/30 flex flex-col items-center text-center hover:border-gold/60 transition-colors"
          >
            <RevealImage className="relative w-56 h-72 md:w-64 md:h-80 rounded-2xl shadow-md mb-6 border-2 border-gold/40">
              <img
                src={weddingConfig.images.bride}
                alt={weddingConfig.brideFullName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-maroon/50 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-4 font-cormorant text-sm tracking-widest text-champagne uppercase font-medium">
                {t.couple.theBride}
              </span>
            </RevealImage>

            <h3 className="font-playfair text-3xl md:text-4xl text-maroon-gradient font-bold">
              {weddingConfig.brideFullName}
            </h3>

            <p className="font-cormorant text-base md:text-lg text-softBrown/80 mt-3 leading-relaxed max-w-sm">
              {weddingConfig.brideBio}
            </p>

            <a
              href={weddingConfig.social.brideInstagram}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-gold-dark hover:text-royal-maroon font-semibold transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-gold" />
              <span>@riya_patel</span>
            </a>
          </motion.div>

          {/* GROOM CARD */}
          <motion.div
            initial={{ y: 32, rotate: 1.5, opacity: 0 }}
            whileInView={{ y: 0, rotate: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative group bg-cream-light rounded-3xl p-6 md:p-8 shadow-royal border border-gold/30 flex flex-col items-center text-center hover:border-gold/60 transition-colors"
          >
            <RevealImage className="relative w-56 h-72 md:w-64 md:h-80 rounded-2xl shadow-md mb-6 border-2 border-gold/40">
              <img
                src={weddingConfig.images.groom}
                alt={weddingConfig.groomFullName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-maroon/50 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-4 font-cormorant text-sm tracking-widest text-champagne uppercase font-medium">
                {t.couple.theGroom}
              </span>
            </RevealImage>

            <h3 className="font-playfair text-3xl md:text-4xl text-maroon-gradient font-bold">
              {weddingConfig.groomFullName}
            </h3>

            <p className="font-cormorant text-base md:text-lg text-softBrown/80 mt-3 leading-relaxed max-w-sm">
              {weddingConfig.groomBio}
            </p>

            <a
              href={weddingConfig.social.groomInstagram}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-gold-dark hover:text-royal-maroon font-semibold transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-gold" />
              <span>@aarav_shah</span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
