import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Send, MessageSquareQuote } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function Blessings({ guestName, t }) {
  const [blessings, setBlessings] = useState([]);
  const [name, setName] = useState(guestName || '');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('wedding_blessings');
    if (saved) {
      try {
        setBlessings(JSON.parse(saved));
      } catch (e) {
        setBlessings(weddingConfig.initialBlessings);
      }
    } else {
      setBlessings(weddingConfig.initialBlessings);
    }
  }, []);

  const handlePostBlessing = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newBlessing = {
      id: Date.now(),
      name: name.trim() || 'Well Wisher',
      message: message.trim(),
      date: 'Just now',
    };

    const updated = [newBlessing, ...blessings];
    setBlessings(updated);
    localStorage.setItem('wedding_blessings', JSON.stringify(updated));
    setMessage('');
  };

  return (
    <section className="py-24 md:py-32 bg-cream text-softBrown overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-royal-maroon font-cormorant text-sm tracking-widest uppercase mb-3"
          >
            <Heart className="w-3.5 h-3.5 text-gold fill-gold" />
            <span>Digital Shagun & Wishes</span>
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-playfair text-4xl md:text-6xl text-maroon-gradient font-bold my-2"
          >
            {t.blessings.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-cormorant text-lg md:text-xl text-softBrown/70 italic max-w-md mx-auto"
          >
            "{t.blessings.subheading}"
          </motion.p>
        </div>

        {/* Two-Column Grid: Form + Live Wall */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Post Message Form */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 bg-cream-light p-6 md:p-8 rounded-3xl shadow-royal border border-gold/30"
          >
            <h3 className="font-playfair text-2xl font-bold text-maroon-gradient mb-2">
              {t.blessings.leaveMessageTitle}
            </h3>

            <form onSubmit={handlePostBlessing} className="space-y-4 mt-6">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.blessings.namePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gold/40 text-softBrown font-sans text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <textarea
                  rows="4"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.blessings.messagePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gold/40 text-softBrown font-sans text-sm focus:outline-none focus:border-gold resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-royal-maroon text-gold-light font-cormorant text-base font-bold tracking-wider hover:bg-gold-gradient hover:text-royal-maroon transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4 text-gold" />
                <span>{t.blessings.postMessage}</span>
              </button>
            </form>
          </motion.div>

          {/* Live Messages Wall */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-4"
          >
            <h3 className="font-playfair text-2xl font-bold text-maroon-gradient mb-6">
              {t.blessings.wallTitle}
            </h3>

            <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2">
              {blessings.map((b) => (
                <div
                  key={b.id}
                  className="p-5 rounded-2xl bg-white border border-gold/30 shadow-sm relative group hover:border-gold/60 transition-all"
                >
                  <MessageSquareQuote className="w-5 h-5 text-gold/40 absolute top-4 right-4" />
                  <p className="font-cormorant text-lg text-softBrown italic leading-relaxed">
                    "{b.message}"
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gold/15 text-xs font-sans">
                    <span className="font-semibold text-royal-maroon">{b.name}</span>
                    <span className="text-softBrown/50">{b.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
