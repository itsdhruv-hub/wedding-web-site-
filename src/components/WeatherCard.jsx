import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Wind, Droplets, Sparkles } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function WeatherCard({ t }) {
  const { weatherForecast } = weddingConfig;

  return (
    <section className="py-16 md:py-20 bg-cream text-softBrown overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-royal-maroon text-champagne p-8 md:p-10 rounded-3xl shadow-royal border-2 border-gold/50 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative overflow-hidden"
        >
          {/* Subtle Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.15)_0%,transparent_60%)] pointer-events-none" />

          {/* Left Weather Overview */}
          <div className="relative z-10">
            <span className="text-xs font-sans tracking-[0.25em] text-gold uppercase font-semibold block mb-1">
              {t.weather.heading}
            </span>
            <h3 className="font-playfair text-3xl md:text-4xl font-bold text-gold-gradient mb-2">
              {weatherForecast.city} • 18 Feb 2027
            </h3>
            <p className="font-cormorant text-lg text-champagne/80 italic max-w-md">
              "{weatherForecast.suggestion}"
            </p>
          </div>

          {/* Right Weather Temp & Stats */}
          <div className="relative z-10 flex flex-col items-center md:items-end shrink-0">
            <div className="flex items-center gap-3">
              <Sun className="w-10 h-10 text-gold animate-spin-slow" />
              <span className="font-cormorant text-5xl md:text-6xl font-bold text-gold-gradient">
                {weatherForecast.temp}
              </span>
            </div>
            <p className="font-sans text-sm font-semibold tracking-wider text-champagne/90 mt-1">
              {weatherForecast.condition}
            </p>

            <div className="flex items-center gap-4 mt-4 font-sans text-xs text-champagne/70">
              <span className="flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-gold" /> {weatherForecast.humidity}
              </span>
              <span className="flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-gold" /> {weatherForecast.wind}
              </span>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
