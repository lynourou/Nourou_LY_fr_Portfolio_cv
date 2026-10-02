/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { FieldworkSection } from './components/FieldworkSection';
import { CartographySection } from './components/CartographySection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CVModal } from './components/CVModal';
import { ContactCardModal } from './components/ContactCardModal';
import { AdminApp } from './admin/AdminApp';

/**
 * Interface publique du portfolio :
 * - Lecture seule pour les visiteurs
 * - 100% en français
 * - Mode Clair / Mode Sombre (console cartographique)
 * - Fiche contact vCard & QR Code
 */
function PublicPortfolio() {
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [contactCardOpen, setContactCardOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col selection:bg-emerald-100 dark:selection:bg-emerald-950 selection:text-emerald-900 dark:selection:text-emerald-300 transition-colors">
      {/* Barre de navigation publique avec sélecteur de thème */}
      <Navbar
        onDownloadCv={() => setCvModalOpen(true)}
        onOpenContactCard={() => setContactCardOpen(true)}
      />

      {/* Sections du portfolio */}
      <main className="flex-1">
        {/* 1. Accueil */}
        <HeroSection
          onDownloadCv={() => setCvModalOpen(true)}
          onOpenContactCard={() => setContactCardOpen(true)}
        />

        {/* 2. À propos (incluant la frise chronologique du parcours) */}
        <AboutSection />

        {/* 3. Compétences (avec matrice dynamique Compétences ⇄ Projets) */}
        <SkillsSection />

        {/* 4. Projets SIG */}
        <ProjectsSection />

        {/* 5. Expériences */}
        <ExperienceSection />

        {/* 6. Travaux de terrain */}
        <FieldworkSection />

        {/* 7. Cartothèque */}
        <CartographySection />

        {/* 8. Formation */}
        <EducationSection />

        {/* 9. Contact */}
        <ContactSection onOpenContactCard={() => setContactCardOpen(true)} />
      </main>

      {/* Pied de page */}
      <Footer />

      {/* Modale CV (PDF) */}
      <CVModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
      />

      {/* Modale Fiche contact (vCard & QR Code) */}
      <ContactCardModal
        isOpen={contactCardOpen}
        onClose={() => setContactCardOpen(false)}
      />
    </div>
  );
}

/**
 * Routeur principal séparant l'interface publique (/)
 * et l'espace privé d'administration (/admin)
 */
function RootRouter() {
  const checkIsAdmin = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    return path.includes('/admin') || path.endsWith('admin') || hash.includes('admin') || search.includes('admin');
  };

  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(checkIsAdmin);

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminRoute(checkIsAdmin());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  if (isAdminRoute) {
    return <AdminApp />;
  }

  return <PublicPortfolio />;
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <RootRouter />
      </PortfolioProvider>
    </ThemeProvider>
  );
}
