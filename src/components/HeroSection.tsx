import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { scrollToSection, getInitials } from '../utils/helpers';
import { ArrowDown, FileText, Mail, MapPin, CheckCircle2, QrCode } from 'lucide-react';

interface HeroSectionProps {
  onDownloadCv: () => void;
  onOpenContactCard?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onDownloadCv, onOpenContactCard }) => {
  const { data } = usePortfolio();
  const { profile } = data;

  return (
    <section id="accueil" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
      {/* Grille cartographique subtile d'arrière-plan */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#0f172a_1px,transparent_1px)] dark:bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Présentation principale (Colonne gauche) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Barre de métadonnées épurée : Localisation & Disponibilité */}
            {(profile.location || profile.availability) && (
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                {profile.location && (
                  <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    {profile.location}
                  </span>
                )}
                {profile.location && profile.availability && (
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                )}
                {profile.availability && (
                  <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {profile.availability}
                  </span>
                )}
              </div>
            )}

            {/* Nom et Titre professionnel */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                {profile.fullName || '[Nom et Prénom]'}
              </h1>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-slate-700 dark:text-slate-300 font-sans">
                {profile.title || '[Titre professionnel]'}
              </h2>
            </div>

            {/* Courte phrase de présentation */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              {profile.headline || '[Courte phrase de présentation]'}
            </p>

            {/* Boutons d'action demandés : Voir mes projets, Télécharger CV, Fiche contact */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollToSection('projets')}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-md transition-colors shadow-xs flex items-center gap-2"
              >
                <span>Voir mes projets</span>
                <ArrowDown className="w-4 h-4 text-emerald-400 dark:text-white" />
              </button>

              <button
                onClick={onDownloadCv}
                className="px-5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 rounded-md transition-colors shadow-xs flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Télécharger mon CV</span>
              </button>

              {onOpenContactCard && (
                <button
                  onClick={onOpenContactCard}
                  className="px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors flex items-center gap-2"
                  title="Fiche contact professionnelle (vCard & QR Code)"
                >
                  <QrCode className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Fiche contact</span>
                </button>
              )}
            </div>
          </div>

          {/* Emplacement pour la photo professionnelle (Colonne droite) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm rounded-xl overflow-hidden bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm p-5 transition-colors">
              <div className="aspect-4/3 w-full bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden relative flex items-center justify-center border border-slate-200/80 dark:border-slate-800">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={`Photo professionnelle de ${profile.fullName}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center text-slate-400 space-y-3">
                    <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-2xl tracking-wider border border-slate-300 dark:border-slate-700">
                      {getInitials(profile.fullName)}
                    </div>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      Nourou LY — Géomaticien
                    </span>
                  </div>
                )}
              </div>

              {/* Légende minimale sous la photo */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-800 dark:text-slate-200">{profile.fullName || '[Nom et Prénom]'}</span>
                <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">{profile.title || '[Titre professionnel]'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
