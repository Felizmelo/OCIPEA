import React from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ResearchUnits from './components/ResearchUnits';
import Laboratories from './components/Laboratories';
import Services from './components/Services';
import Organization from './components/Organization';
import Footer from './components/Footer';
import Team from './components/Team';
import TeamAdmin from './components/TeamAdmin';
import News from './components/News';
import NewsAdmin from './components/NewsAdmin';

const path = window.location.pathname;

function App() {
  if (path === '/admin/team') {
    return <TeamAdmin />;
  }

  if (path === '/admin/news') {
    return <NewsAdmin />;
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        <ResearchUnits />
        <Laboratories />
        <Services />
        <Organization />
        <Team />
        <News />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
