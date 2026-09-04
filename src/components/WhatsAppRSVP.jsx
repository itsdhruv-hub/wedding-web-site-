import React from 'react';
import { MessageSquare } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function WhatsAppRSVP({ guestName, t }) {
  const nameToUse = guestName || "Guest";
  
  const generateWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello! ${nameToUse} confirms attendance for ${weddingConfig.brideName} & ${weddingConfig.groomName}'s wedding. Looking forward to celebrating with you! ❤️`
    );
    return `https://wa.me/?text=${text}`;
  };

  return (
    <a
      href={generateWhatsAppLink()}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-sans text-sm md:text-base font-semibold tracking-wider hover:brightness-105 shadow-md transition-all cursor-pointer"
    >
      <MessageSquare className="w-5 h-5 fill-white text-[#25D366]" />
      <span>{t.rsvp.confirmWhatsApp}</span>
    </a>
  );
}
