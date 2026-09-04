import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Ticket, Download, Share2, Sparkles, CheckCircle } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function GuestPass({ guestName, t }) {
  const nameToDisplay = guestName || "Honored Guest";
  const qrData = `WEDDING_PASS_2027:${nameToDisplay}:${weddingConfig.weddingDateISO}`;

  const handleSharePass = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${weddingConfig.coupleTitle} Wedding VIP Pass`,
          text: `Digital VIP Wedding Pass for ${nameToDisplay} — ${weddingConfig.weddingDateFormatted}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(t.share.linkCopied);
    }
  };

  const handlePrintDownload = () => {
    window.print();
  };

  return (
    <section id="guest-pass" className="py-10 md:py-14 bg-cream-light text-softBrown overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-royal-maroon font-cormorant text-sm tracking-widest uppercase mb-3">
            <Ticket className="w-3.5 h-3.5 text-gold" />
            <span>Digital Access Pass</span>
          </div>

          <h2 className="font-playfair text-4xl md:text-6xl text-maroon-gradient font-bold my-2">
            {t.guestPass.heading}
          </h2>

          <p className="font-cormorant text-lg md:text-xl text-softBrown/70 italic max-w-md mx-auto mb-6">
            "{t.guestPass.subheading}"
          </p>
        </motion.div>

        {/* Boarding-Pass Style VIP Digital Ticket */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-lg mx-auto bg-royal-maroon text-champagne rounded-3xl p-6 md:p-8 shadow-royal border-2 border-gold/60 flex flex-col items-center text-center overflow-hidden"
        >
          {/* Subtle Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.2)_0%,transparent_70%)] pointer-events-none" />

          {/* Top Pass Header */}
          <div className="flex items-center justify-between w-full border-b border-gold/30 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="font-script text-2xl text-gold-gradient">
                {weddingConfig.coupleTitle}
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-gold/20 text-gold text-[10px] font-sans font-bold tracking-widest uppercase border border-gold/40">
              VIP Guest Pass
            </span>
          </div>

          {/* Guest Name & Details */}
          <div className="my-2">
            <p className="text-xs font-sans tracking-[0.2em] text-gold/80 uppercase font-medium">
              Guest Name
            </p>
            <h3 className="font-cormorant text-3xl md:text-4xl font-bold text-gold-gradient my-1">
              {nameToDisplay}
            </h3>
            <p className="font-sans text-xs tracking-widest text-champagne/80 mt-1">
              {t.guestPass.admitText}
            </p>
          </div>

          {/* QR Code Container */}
          <div className="my-6 p-4 rounded-2xl bg-white shadow-md border-2 border-gold flex flex-col items-center justify-center">
            <QRCodeSVG
              value={qrData}
              size={140}
              bgColor="#FFFFFF"
              fgColor="#4A0E17"
              level="H"
              includeMargin={false}
            />
            <span className="text-[10px] font-sans tracking-widest text-royal-maroon uppercase mt-2 font-bold">
              Scan at Venue Entrance
            </span>
          </div>

          {/* Pass Date & Location Footer */}
          <div className="w-full border-t border-gold/30 pt-4 flex items-center justify-between text-xs font-sans text-champagne/80">
            <div>
              <p className="text-[10px] text-gold uppercase font-semibold">Date</p>
              <p className="font-semibold">{weddingConfig.weddingDateFormatted}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gold uppercase font-semibold">Location</p>
              <p className="font-semibold">{weddingConfig.city}, Gujarat</p>
            </div>
          </div>
        </motion.div>

        {/* Pass Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            onClick={handlePrintDownload}
            className="px-6 py-3 rounded-full bg-gold-gradient text-royal-maroon font-cormorant text-base font-bold tracking-wider shadow-md hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-royal-maroon" />
            <span>{t.guestPass.downloadButton}</span>
          </button>

          <button
            onClick={handleSharePass}
            className="px-6 py-3 rounded-full bg-cream border border-gold text-royal-maroon font-cormorant text-base font-semibold tracking-wider hover:bg-gold/10 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-gold-dark" />
            <span>{t.guestPass.shareButton}</span>
          </button>
        </div>

      </div>
    </section>
  );
}
