import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center min-h-[80vh] py-16 gap-10 lg:gap-0">

          <div className="flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
              Observatório Africano
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-tight">
              {t.hero.title}
            </h1>
            <p className="mt-6 text-lg text-slate-500 max-w-xl lg:max-w-lg leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#research-units"
                className="inline-flex items-center justify-center px-7 py-3 bg-teal-700 text-white text-sm font-semibold rounded-xl hover:bg-teal-800 transition-colors shadow-sm"
              >
                Conhecer o OCIPEA
              </a>
              <a
                href="#news"
                className="inline-flex items-center justify-center px-7 py-3 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Ver Notícias
              </a>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-xl">
              <img
                src="/Design_sem_nome.png"
                alt="OCIPEA — Pessoas formando o mapa do mundo"
                className="w-full h-auto object-contain drop-shadow-sm"
              />
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />
    </div>
  );
};

export default Hero;
