import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { scrollToSection } from '../utils/helpers';
import { Compass, Linkedin, Github, Mail, ArrowUp, Download } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data } = usePortfolio();
  const currentYear = 2026;

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 lg:py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Ligne principale du footer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Identité & Profession */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-7 h-7 rounded bg-slate-800 text-emerald-400 flex items-center justify-center font-mono text-xs font-semibold">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-bold text-base tracking-tight">
                {data.profile.fullName}
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm">
              {data.profile.title}
            </p>

            <p className="text-xs text-slate-500 font-mono">
              Systèmes d'Information Géographique · Télédétection · Cartographie Thématique
            </p>
          </div>

          {/* Navigation rapide */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Navigation rapide
            </h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
              <button
                onClick={() => scrollToSection('accueil')}
                className="text-left hover:text-white transition-colors"
              >
                Accueil
              </button>
              <button
                onClick={() => scrollToSection('a-propos')}
                className="text-left hover:text-white transition-colors"
              >
                À propos
              </button>
              <button
                onClick={() => scrollToSection('competences')}
                className="text-left hover:text-white transition-colors"
              >
                Compétences
              </button>
              <button
                onClick={() => scrollToSection('projets')}
                className="text-left hover:text-white transition-colors"
              >
                Projets SIG
              </button>
              <button
                onClick={() => scrollToSection('experiences')}
                className="text-left hover:text-white transition-colors"
              >
                Expériences
              </button>
              <button
                onClick={() => scrollToSection('terrain')}
                className="text-left hover:text-white transition-colors"
              >
                Travaux de terrain
              </button>
              <button
                onClick={() => scrollToSection('cartotheque')}
                className="text-left hover:text-white transition-colors"
              >
                Cartothèque
              </button>
              <button
                onClick={() => scrollToSection('formation')}
                className="text-left hover:text-white transition-colors"
              >
                Formation
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left hover:text-white transition-colors"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Liens professionnels & retour haut */}
          <div className="md:col-span-3 space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
                Liens professionnels
              </h4>
              <div className="flex items-center gap-3">
                {data.contact.email && (
                  <a
                    href={`mailto:${data.contact.email}`}
                    className="p-2 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                    title="Envoyer un email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
                {data.contact.linkedin && (
                  <a
                    href={data.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {data.contact.github && (
                  <a
                    href={data.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <button
              onClick={() => scrollToSection('accueil')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors self-start"
            >
              <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Haut de page</span>
            </button>
          </div>

        </div>

        {/* Ligne copyright basse */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div>
            © {currentYear} {data.profile.fullName} · Portfolio professionnel Géomaticien
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/download-zip"
              download="Nourou_LY_Portfolio_cv.zip"
              className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-500 hover:text-emerald-400 transition-colors"
              title="Télécharger l'archive ZIP du code source"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Archive ZIP</span>
            </a>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="font-mono text-[11px] text-slate-600">
              Ingénierie territoriale &amp; environnementale
            </span>
            {/* Lien direct et sécurisé vers l'espace d'administration */}
            <a
              href="#admin"
              className="text-slate-500 hover:text-emerald-400 transition-colors text-[11px] font-mono ml-1"
              title="Accès espace d'administration"
            >
              Administration
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
