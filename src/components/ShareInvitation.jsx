import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Check, MessageSquare, Sparkles } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

const InstagramIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function ShareInvitation({ t }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `You're invited to celebrate the royal wedding of ${weddingConfig.brideName} & ${weddingConfig.groomName}! Open the digital invitation card here: ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <section className="py-10 md:py-16 bg-royal-maroon text-champagne relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        
        {/* Instagram Hashtag Section */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold mx-auto mb-4">
            <InstagramIcon className="w-6 h-6" />
          </div>

          <p className="font-cormorant text-base md:text-lg tracking-widest uppercase text-champagne/80">
            {t.share.subheading}
          </p>

          <h2 className="font-playfair text-4xl md:text-6xl text-gold-gradient font-bold my-2">
            {weddingConfig.hashtag}
          </h2>
        </motion.div>

        {/* Share Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 max-w-md mx-auto"
        >
          <button
            onClick={handleWhatsAppShare}
            className="flex-1 min-w-[180px] px-6 py-3.5 rounded-full bg-[#25D366] text-white font-sans text-sm font-semibold tracking-wider hover:brightness-105 shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>{t.share.whatsappShare}</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex-1 min-w-[180px] px-6 py-3.5 rounded-full bg-glass border border-gold text-champagne font-sans text-sm font-semibold tracking-wider hover:bg-gold-gradient hover:text-royal-maroon transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span>{t.share.linkCopied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-gold" />
                <span>{t.share.copyLink}</span>
              </>
            )}
          </button>
        </motion.div>

      </div>
    </section>
  );
}
