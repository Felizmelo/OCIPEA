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

const isAdmin = window.location.pathname === '/admin/team';

function App() {
  if (isAdmin) {
    return <TeamAdmin />;
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
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
