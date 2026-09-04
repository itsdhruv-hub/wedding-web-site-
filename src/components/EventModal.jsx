import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, Sparkles, Navigation, CalendarPlus } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function EventModal({ event, onClose, t }) {
  if (!event) return null;

  const downloadEventICS = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Riya & Aarav Royal Wedding//EN
BEGIN:VEVENT
SUMMARY:Riya & Aarav - ${event.name}
DESCRIPTION:${event.description}
LOCATION:${event.venue}
DTSTART:20270218T133000Z
DTEND:20270218T183000Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.id}_event.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-cream-light text-softBrown rounded-3xl p-6 md:p-10 shadow-2xl border-2 border-gold/50 my-auto overflow-hidden text-left"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Decorative Color Accent Bar */}
          <div
            className="absolute top-0 left-0 right-0 h-3"
            style={{ backgroundColor: event.themeColor }}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-gold/10 text-royal-maroon flex items-center justify-center hover:bg-royal-maroon hover:text-gold transition-all cursor-pointer"
            aria-label="Close event modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Event Header Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-royal-maroon font-cormorant text-xs tracking-widest uppercase mb-4 mt-2">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>{event.badge}</span>
          </div>

          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-maroon-gradient mb-2">
            {event.name}
          </h2>
          <p className="font-cormorant text-lg text-gold-dark italic font-semibold mb-6">
            "{event.tagline}"
          </p>

          {/* Quick Date, Time & Venue Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-cream border border-gold/30 mb-6 font-sans text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gold shrink-0" />
              <div>
                <p className="text-[10px] text-softBrown/60 uppercase font-semibold">Date</p>
                <p className="font-semibold text-royal-maroon">{event.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold shrink-0" />
              <div>
                <p className="text-[10px] text-softBrown/60 uppercase font-semibold">Time</p>
                <p className="font-semibold text-royal-maroon">{event.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold shrink-0" />
              <div>
                <p className="text-[10px] text-softBrown/60 uppercase font-semibold">Venue</p>
                <p className="font-semibold text-royal-maroon truncate">{event.venue}</p>
              </div>
            </div>
          </div>

          <p className="font-sans text-sm md:text-base text-softBrown/80 leading-relaxed mb-6">
            {event.description}
          </p>

          {/* Schedule Timeline in Modal */}
          {event.schedule && (
            <div className="mb-6">
              <h3 className="font-cormorant text-xl font-bold text-royal-maroon tracking-wider uppercase mb-3">
                Event Schedule
              </h3>
              <div className="space-y-2">
                {event.schedule.map((item) => (
                  <div
                    key={item.time}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/60 border border-gold/20 font-sans text-sm"
                  >
                    <span className="font-semibold text-gold-dark min-w-[80px]">{item.time}</span>
                    <span className="text-softBrown">{item.activity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dress Code Swatches */}
          <div className="mb-8">
            <h3 className="font-cormorant text-xl font-bold text-royal-maroon tracking-wider uppercase mb-2">
              {t.events.dressCodeTitle}
            </h3>
            <p className="font-sans text-sm text-softBrown/80 font-medium mb-3">
              {event.dressCode}
            </p>
            <div className="flex items-center gap-4">
              {event.colors.map((color) => (
                <div key={color.name} className="flex items-center gap-2">
                  <span
                    className="w-5 h-5 rounded-full border border-black/20 shadow-sm"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs font-sans text-softBrown/70">{color.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gold/20">
            <a
              href={weddingConfig.venueMapUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-royal-maroon text-gold-light font-cormorant text-base font-bold tracking-wider hover:bg-gold-gradient hover:text-royal-maroon transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Navigation className="w-4 h-4" />
              <span>{t.events.getDirections}</span>
            </a>

            <button
              onClick={downloadEventICS}
              className="px-6 py-3 rounded-full bg-cream border border-gold text-royal-maroon font-cormorant text-base font-semibold tracking-wider hover:bg-gold/10 transition-all flex items-center gap-2 cursor-pointer"
            >
              <CalendarPlus className="w-4 h-4 text-gold-dark" />
              <span>{t.events.addToCalendar}</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
