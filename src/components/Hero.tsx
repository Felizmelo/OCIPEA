import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-slate-900 text-white">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-30"
          src="/WhatsApp_Image_2026-04-14_at_23.17.23.jpeg"
          alt="OCIPEA"
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {t.hero.title}
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl">
          {t.hero.subtitle}
        </p>
      </div>
    </div>
  );
};

export default Hero;