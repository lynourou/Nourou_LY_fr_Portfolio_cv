import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import { scrollToSection } from '../utils/helpers';
import { Menu, X, FileText, Compass, Sun, Moon, QrCode } from 'lucide-react';

interface NavbarProps {
  onDownloadCv: () => void;
  onOpenContactCard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onDownloadCv, onOpenContactCard }) => {
  const { data } = usePortfolio();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accueil', target: 'accueil' },
    { label: 'À propos', target: 'a-propos' },
    { label: 'Compétences', target: 'competences' },
    { label: 'Projets', target: 'projets' },
    { label: 'Expériences', target: 'experiences' },
    { label: 'Terrain', target: 'terrain' },
    { label: 'Cartothèque', target: 'cartotheque' },
    { label: 'Formation', target: 'formation' },
    { label: 'Contact', target: 'contact' },
  ];

  const handleNavClick = (target: string) => {
    setMobileMenuOpen(false);
    scrollToSection(target);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs py-3'
          : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs border-b border-slate-100 dark:border-slate-800/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => scrollToSection('accueil')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-8 h-8 rounded bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-mono text-xs font-semibold tracking-wider border border-slate-700">
            <Compass className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-base font-semibold tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
            {data.profile.fullName || 'Géomaticien'}
          </span>
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => handleNavClick(link.target)}
              className="hover:text-slate-900 dark:hover:text-white hover:underline decoration-emerald-600 dark:decoration-emerald-400 underline-offset-8 transition-colors whitespace-nowrap"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions (Theme Toggle, Contact Card, CV) */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Bouton de bascule Mode Clair / Sombre */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 transition-colors"
            title={theme === 'dark' ? 'Basculer en mode clair' : 'Basculer en mode sombre (console SIG)'}
            aria-label="Basculer le thème"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Bouton Fiche vCard / QR Code */}
          <button
            onClick={onOpenContactCard}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md transition-colors shadow-2xs whitespace-nowrap"
            title="Afficher la fiche contact professionnelle (vCard & QR Code)"
          >
            <QrCode className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Fiche contact</span>
          </button>

          {/* Bouton Téléchargement CV */}
          <button
            onClick={onDownloadCv}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-md transition-colors shadow-xs whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400 dark:text-white" />
            <span>Télécharger mon CV</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle & Theme Switch */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
            aria-label="Changer de thème"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white focus:outline-none rounded-md"
            aria-label="Ouvrir le menu de navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="py-2 grid grid-cols-2 gap-1 border-b border-slate-100 dark:border-slate-800 mb-3">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleNavClick(link.target)}
                className="text-left px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContactCard();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-md"
            >
              <QrCode className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Fiche contact (vCard &amp; QR Code)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onDownloadCv();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-medium text-white bg-slate-900 dark:bg-emerald-600 rounded-md hover:bg-slate-800 transition-colors"
            >
              <FileText className="w-4 h-4 text-emerald-400 dark:text-white" />
              <span>Télécharger mon CV (PDF)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
