import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Heart, Sparkles, Send, Ticket } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';
import WhatsAppRSVP from './WhatsAppRSVP';

export default function RSVP({ guestName, t, onRsvpSuccess }) {
  const [attendance, setAttendance] = useState('accept');
  const [name, setName] = useState(guestName || '');
  const [guestCount, setGuestCount] = useState('2');
  const [foodPref, setFoodPref] = useState('veg');
  const [selectedEvents, setSelectedEvents] = useState(['mehendi', 'haldi', 'sangeet', 'wedding', 'reception']);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (guestName && !name) {
      setName(guestName);
    }
  }, [guestName]);

  const toggleEvent = (eventId) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter((id) => id !== eventId));
    } else {
      setSelectedEvents([...selectedEvents, eventId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rsvpData = {
      name,
      attendance,
      guestCount,
      foodPref,
      selectedEvents,
      message,
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem('wedding_rsvp', JSON.stringify(rsvpData));
    setIsSubmitted(true);
    if (onRsvpSuccess) onRsvpSuccess(rsvpData);
  };

  return (
    <section id="rsvp" className="py-10 md:py-16 bg-cream text-softBrown overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-royal-maroon font-cormorant text-sm tracking-widest uppercase mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>RSVP Registration</span>
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-playfair text-4xl md:text-6xl text-maroon-gradient font-bold my-2"
          >
            {t.rsvp.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-cormorant text-lg md:text-xl text-softBrown/70 italic"
          >
            "{t.rsvp.subheading}"
          </motion.p>
        </div>

        {/* RSVP Form Box */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-cream-light p-6 md:p-12 rounded-3xl shadow-royal border-2 border-gold/40 relative overflow-hidden"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-gold/20 text-royal-maroon flex items-center justify-center mx-auto mb-4 border border-gold">
                <CheckCircle2 className="w-8 h-8 text-gold-dark" />
              </div>
              <h3 className="font-playfair text-3xl font-bold text-maroon-gradient mb-2">
                {t.rsvp.successNotice}
              </h3>
              <p className="font-cormorant text-lg text-softBrown/80 italic mb-8">
                We are thrilled to celebrate with you, {name}!
              </p>

              <button
                onClick={() => {
                  const passElem = document.getElementById('guest-pass');
                  if (passElem) passElem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-full bg-gold-gradient text-royal-maroon font-cormorant text-lg font-bold tracking-wider shadow-glow hover:scale-105 transition-transform flex items-center justify-center gap-2 mx-auto cursor-pointer"
              >
                <Ticket className="w-5 h-5 text-royal-maroon" />
                <span>{t.rsvp.viewGuestPass}</span>
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Accept or Decline Radio Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setAttendance('accept')}
                  className={`flex-1 min-w-[200px] p-4 rounded-2xl border-2 font-cormorant text-lg font-bold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    attendance === 'accept'
                      ? 'bg-royal-maroon text-gold border-gold shadow-md'
                      : 'bg-white text-softBrown border-gold/30 hover:border-gold/60'
                  }`}
                >
                  <span>{t.rsvp.accept}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttendance('decline')}
                  className={`flex-1 min-w-[200px] p-4 rounded-2xl border-2 font-cormorant text-lg font-bold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    attendance === 'decline'
                      ? 'bg-royal-maroon text-champagne border-gold shadow-md'
                      : 'bg-white text-softBrown border-gold/30 hover:border-gold/60'
                  }`}
                >
                  <span>{t.rsvp.decline}</span>
                </button>
              </div>

              {/* Conditional Fields if Accepted */}
              {attendance === 'accept' && (
                <>
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-sans tracking-widest text-gold-dark font-bold uppercase mb-2">
                      {t.rsvp.guestNameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dhruv Parekh"
                      className="w-full px-5 py-3.5 rounded-xl bg-white border border-gold/40 text-softBrown font-sans focus:outline-none focus:border-gold shadow-inner"
                    />
                  </div>

                  {/* Guest Count & Food Pref Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-sans tracking-widest text-gold-dark font-bold uppercase mb-2">
                        {t.rsvp.guestCountLabel}
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full px-5 py-3.5 rounded-xl bg-white border border-gold/40 text-softBrown font-sans focus:outline-none focus:border-gold"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests (Couple)</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests (Family)</option>
                        <option value="5+">5+ Guests</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-sans tracking-widest text-gold-dark font-bold uppercase mb-2">
                        {t.rsvp.foodPrefLabel}
                      </label>
                      <select
                        value={foodPref}
                        onChange={(e) => setFoodPref(e.target.value)}
                        className="w-full px-5 py-3.5 rounded-xl bg-white border border-gold/40 text-softBrown font-sans focus:outline-none focus:border-gold"
                      >
                        <option value="veg">{t.rsvp.veg}</option>
                        <option value="jain">{t.rsvp.jain}</option>
                        <option value="other">{t.rsvp.other}</option>
                      </select>
                    </div>
                  </div>

                  {/* Events Checkboxes */}
                  <div>
                    <label className="block text-xs font-sans tracking-widest text-gold-dark font-bold uppercase mb-3">
                      {t.rsvp.eventsAttendingLabel}
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {weddingConfig.events.map((evt) => {
                        const isChecked = selectedEvents.includes(evt.id);
                        return (
                          <button
                            key={evt.id}
                            type="button"
                            onClick={() => toggleEvent(evt.id)}
                            className={`px-4 py-2.5 rounded-full text-xs font-sans font-semibold tracking-wider transition-all border cursor-pointer ${
                              isChecked
                                ? 'bg-gold-gradient text-royal-maroon border-gold font-bold shadow-sm'
                                : 'bg-white text-softBrown/70 border-gold/30 hover:border-gold'
                            }`}
                          >
                            {evt.name} {isChecked ? '✓' : ''}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* Message Note */}
              <div>
                <label className="block text-xs font-sans tracking-widest text-gold-dark font-bold uppercase mb-2">
                  {t.rsvp.messageLabel}
                </label>
                <textarea
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a warm wish or note..."
                  className="w-full px-5 py-3.5 rounded-xl bg-white border border-gold/40 text-softBrown font-sans focus:outline-none focus:border-gold shadow-inner resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gold/20">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-royal-maroon text-gold-light font-cormorant text-lg font-bold tracking-wider hover:bg-gold-gradient hover:text-royal-maroon transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4 text-gold" />
                  <span>{t.rsvp.submitButton}</span>
                </button>

                <WhatsAppRSVP guestName={name || guestName} t={t} />
              </div>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}
