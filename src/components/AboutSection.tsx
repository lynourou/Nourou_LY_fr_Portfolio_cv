import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Compass, Target, BookmarkCheck } from 'lucide-react';
import { CareerTimeline } from './CareerTimeline';

export const AboutSection: React.FC = () => {
  const { data } = usePortfolio();
  const { about } = data;

  return (
    <section id="a-propos" className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* En-tête de section */}
        <div>
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4" />
              <span>Présentation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              À propos de mon profil
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
              Parcours académique, démarche méthodologique et vision du métier de géomaticien.
            </p>
          </div>

          {/* Grille principale : Parcours & Profil Pro */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Blocs de texte (8 colonnes) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Mon Parcours */}
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <span className="text-emerald-700 dark:text-emerald-400 font-mono text-sm">01.</span>
                  <span>Mon parcours</span>
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base whitespace-pre-line">
                  {about.journey}
                </p>
              </div>

              {/* Mon Profil Professionnel */}
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <span className="text-emerald-700 dark:text-emerald-400 font-mono text-sm">02.</span>
                  <span>Mon profil professionnel</span>
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base whitespace-pre-line">
                  {about.profileDescription}
                </p>
              </div>

              {/* Mon Orientation Professionnelle */}
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <span className="text-emerald-700 dark:text-emerald-400 font-mono text-sm">03.</span>
                  <span>Mon orientation professionnelle</span>
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base whitespace-pre-line">
                  {about.careerGoals}
                </p>
              </div>

            </div>

            {/* Sidebar: Domaines d'intérêt (4 colonnes) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 border border-slate-800 sticky top-28 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-3">
                  <Target className="w-4 h-4" />
                  <span>Axes thématiques</span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-4 text-white">
                  Domaines d'intérêt &amp; Recherche
                </h3>

                <div className="space-y-3">
                  {about.interests.length === 0 ? (
                    <div className="text-xs text-slate-400 italic py-2">
                      Axes thématiques et domaines de recherche en cours de précision.
                    </div>
                  ) : (
                    about.interests.map((interest, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 text-sm text-slate-200"
                      >
                        <BookmarkCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{interest}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Frise chronologique interactive du parcours */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800">
          <div className="max-w-3xl mb-8">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Évolution du parcours : De la métallurgie vers la géomatique
            </h3>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
              Frise chronologique interactive retraçant chaque étape de la reconversion technique vers les sciences de l'information géographique et la foresterie.
            </p>
          </div>

          <CareerTimeline />
        </div>

      </div>
    </section>
  );
};
