import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Clock, MapPin, ArrowRight, Navigation, CalendarPlus } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';
import EventModal from './EventModal';
import { RevealText, GoldDivider } from './ui/Reveal';

export default function Events({ t }) {
  const [activeTab, setActiveTab] = useState(weddingConfig.events[0].id);
  const [selectedModalEvent, setSelectedModalEvent] = useState(null);

  const activeEvent = weddingConfig.events.find(e => e.id === activeTab) || weddingConfig.events[0];

  const downloadICS = (evt) => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Riya & Aarav Royal Wedding//EN
BEGIN:VEVENT
SUMMARY:Riya & Aarav - ${evt.name}
DESCRIPTION:${evt.description}
LOCATION:${evt.venue}
DTSTART:20270218T133000Z
DTEND:20270218T183000Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${evt.id}_event.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="events" className="py-24 md:py-32 bg-cream text-softBrown overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-royal-maroon font-cormorant text-sm tracking-widest uppercase mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Grand Celebrations</span>
          </motion.div>

          <RevealText as="h2" className="font-playfair text-4xl md:text-6xl text-maroon-gradient font-bold my-2">
            {t.events.heading}
          </RevealText>

          <GoldDivider className="w-24 mx-auto my-3" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.2 }}
            className="font-cormorant text-lg md:text-xl text-softBrown/70 italic"
          >
            "{t.events.subheading}"
          </motion.p>
        </div>

        {/* Interactive Event Function Tabs */}
        <div className="flex items-center justify-center gap-2 md:gap-4 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {weddingConfig.events.map((evt) => {
            const isActive = activeTab === evt.id;
            return (
              <button
                key={evt.id}
                onClick={() => setActiveTab(evt.id)}
                className={`px-5 py-3 rounded-full text-xs md:text-sm font-sans font-semibold tracking-wider transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-royal-maroon text-gold border-2 border-gold shadow-glow scale-105'
                    : 'bg-white/80 text-softBrown/80 border border-gold/30 hover:border-gold hover:text-royal-maroon'
                }`}
              >
                <span className="text-base">{evt.icon}</span>
                <span>{evt.name}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Luxury Showcase Card with Smooth AnimatePresence Slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvent.id}
            initial={{ opacity: 0, x: 20, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="bg-cream-light rounded-3xl shadow-2xl border-2 border-gold/50 overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Left Photo & Theme Backdrop */}
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-[460px] overflow-hidden group">
              <img
                src={activeEvent.bgImage}
                alt={activeEvent.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-maroonDark/90 via-royal-maroon/40 to-transparent pointer-events-none" />

              <div className="absolute top-6 left-6">
                <span
                  className="px-4 py-1.5 rounded-full text-xs font-sans font-bold tracking-widest uppercase shadow-md border border-white/20"
                  style={{ backgroundColor: activeEvent.themeColor, color: activeEvent.textColor }}
                >
                  {activeEvent.badge}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-champagne">
                <p className="font-cormorant text-2xl md:text-3xl font-bold">
                  {activeEvent.name}
                </p>
                <p className="font-sans text-xs tracking-widest text-gold uppercase mt-1">
                  {activeEvent.date} • {activeEvent.time}
                </p>
              </div>
            </div>

            {/* Right Detailed Event Information */}
            <div className="lg:col-span-7 p-6 md:p-10 flex flex-col justify-between">
              <div>
                <h3 className="font-playfair text-3xl md:text-4xl font-bold text-maroon-gradient mb-2">
                  {activeEvent.name}
                </h3>
                <p className="font-cormorant text-lg text-gold-dark italic font-semibold mb-4">
                  "{activeEvent.tagline}"
                </p>

                <p className="font-sans text-sm md:text-base text-softBrown/80 leading-relaxed mb-6">
                  {activeEvent.description}
                </p>

                {/* Event Schedule Preview */}
                {activeEvent.schedule && (
                  <div className="mb-6">
                    <h4 className="font-cormorant text-base font-bold text-royal-maroon uppercase tracking-wider mb-2">
                      Schedule Timeline
                    </h4>
                    <div className="space-y-2">
                      {activeEvent.schedule.map((item) => (
                        <div key={item.time} className="flex items-center gap-3 text-xs md:text-sm font-sans bg-white/70 p-2.5 rounded-xl border border-gold/20">
                          <span className="font-semibold text-gold-dark min-w-[70px]">{item.time}</span>
                          <span className="text-softBrown">{item.activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dress Code Colors */}
                <div className="mb-6">
                  <h4 className="font-cormorant text-base font-bold text-royal-maroon uppercase tracking-wider mb-2">
                    Recommended Palette ({activeEvent.dressCode})
                  </h4>
                  <div className="flex items-center gap-4">
                    {activeEvent.colors.map((c) => (
                      <div key={c.name} className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full border border-black/20 shadow-sm" style={{ backgroundColor: c.hex }} />
                        <span className="text-xs font-sans text-softBrown/70">{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gold/20 mt-4">
                <div className="flex items-center gap-3">
                  <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    href={weddingConfig.venueMapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-full bg-royal-maroon text-gold-light font-cormorant text-sm md:text-base font-bold tracking-wider hover:bg-gold-gradient hover:text-royal-maroon transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>{t.events.getDirections}</span>
                  </motion.a>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => downloadICS(activeEvent)}
                    className="px-5 py-3 rounded-full bg-white border border-gold text-royal-maroon font-cormorant text-sm md:text-base font-semibold tracking-wider hover:bg-gold/10 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <CalendarPlus className="w-4 h-4 text-gold-dark" />
                    <span>{t.events.addToCalendar}</span>
                  </motion.button>
                </div>

                <button
                  onClick={() => setSelectedModalEvent(activeEvent)}
                  className="text-xs font-sans font-bold uppercase tracking-widest text-gold-dark hover:text-royal-maroon flex items-center gap-1 cursor-pointer"
                >
                  <span>Full Overview</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Expanded Modal */}
      <EventModal
        event={selectedModalEvent}
        onClose={() => setSelectedModalEvent(null)}
        t={t}
      />
    </section>
  );
}
