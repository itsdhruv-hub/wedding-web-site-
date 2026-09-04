import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ currentLang, onSelectLang }) {
  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'gu', label: 'ગુજરાતી' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'desi', label: 'DESI' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed top-4 right-4 z-[80] flex items-center"
    >
      <div className="bg-glass-dark border border-gold/40 rounded-full p-1 shadow-royal backdrop-blur-md flex items-center gap-1 text-xs font-sans">
        <div className="px-2 py-1 flex items-center gap-1 text-gold/80 hidden sm:flex">
          <Globe className="w-3.5 h-3.5 text-gold" />
        </div>

        {languages.map((lang) => {
          const isActive = currentLang === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => onSelectLang(lang.code)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-gold-gradient text-royal-maroon font-semibold shadow-sm scale-105'
                  : 'text-champagne/80 hover:text-champagne hover:bg-white/10'
              }`}
            >
              {lang.label}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
