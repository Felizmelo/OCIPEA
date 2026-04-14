import React, { useState } from 'react';
import { Menu, X, BookOpen, Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

const languageLabels: Record<Language, string> = {
  pt: 'PT',
  en: 'EN',
  fr: 'FR',
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src="/Designer.png" alt="OCIPEA Logo" className="h-10 w-10 object-contain" />
            <span className="ml-2 text-xl font-bold tracking-wide">OCIPEA</span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <a href="#research" className="hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.nav.researchUnits}</a>
            <a href="#laboratories" className="hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.nav.laboratories}</a>
            <a href="#services" className="hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.nav.services}</a>
            <a href="#organization" className="hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.nav.organization}</a>

            <div className="relative ml-4">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-md text-sm font-semibold transition-colors"
              >
                <Globe className="h-4 w-4" />
                {languageLabels[language]}
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-xl overflow-hidden z-50">
                  {(Object.keys(languageLabels) as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                        language === lang
                          ? 'bg-slate-100 text-slate-900'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {lang === 'pt' ? 'Português' : lang === 'en' ? 'English' : 'Français'}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 bg-slate-700 hover:bg-slate-600 px-2 py-1.5 rounded-md text-sm font-semibold transition-colors"
              >
                <Globe className="h-4 w-4" />
                {languageLabels[language]}
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-xl overflow-hidden z-50">
                  {(Object.keys(languageLabels) as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                        language === lang
                          ? 'bg-slate-100 text-slate-900'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {lang === 'pt' ? 'Português' : lang === 'en' ? 'English' : 'Français'}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#research" onClick={() => setIsOpen(false)} className="block hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium">{t.nav.researchUnits}</a>
            <a href="#laboratories" onClick={() => setIsOpen(false)} className="block hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium">{t.nav.laboratories}</a>
            <a href="#services" onClick={() => setIsOpen(false)} className="block hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium">{t.nav.services}</a>
            <a href="#organization" onClick={() => setIsOpen(false)} className="block hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium">{t.nav.organization}</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
