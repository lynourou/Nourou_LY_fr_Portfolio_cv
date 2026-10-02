import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap, Calendar, MapPin, School, FileText } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="formation" className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>Cursus académique</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Formation &amp; Diplômes
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Diplômes universitaires, spécialisations en sciences de l'information géographique et apprentissages fondamentaux.
          </p>
        </div>

        {/* État vide si aucune formation n'est encore renseignée */}
        {data.education.length === 0 ? (
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-3">
            <GraduationCap className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Formation en cours de renseignement
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Le cursus universitaire et les diplômes en géomatique et sciences géographiques seront détaillés ici.
            </p>
          </div>
        ) : (
          /* Frise chronologique */
          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-32 space-y-10">
            {data.education.map((edu) => (
              <div key={edu.id} className="relative pl-6 sm:pl-8 group">
                
                {/* Point frise */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-slate-700 group-hover:border-emerald-600 dark:group-hover:border-emerald-500 transition-colors" />

                {/* Période */}
                {edu.period && (
                  <div className="sm:absolute sm:-left-36 sm:top-1 text-xs font-mono text-slate-500 dark:text-slate-400 font-medium sm:w-28 sm:text-right mb-2 sm:mb-0">
                    <span className="flex items-center gap-1 sm:justify-end">
                      <Calendar className="w-3 h-3 text-emerald-600 dark:text-emerald-400 inline" />
                      {edu.period}
                    </span>
                  </div>
                )}

                {/* Carte formation */}
                <div className="bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-2xs group-hover:border-slate-300 dark:group-hover:border-slate-700 transition-colors">
                  
                  <div className="space-y-1 pb-4 border-b border-slate-200/70 dark:border-slate-800">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      {edu.institution && (
                        <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                          <School className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                          {edu.institution}
                        </span>
                      )}
                      {edu.location && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {edu.location}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {edu.description && (
                    <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                      {edu.description}
                    </p>
                  )}

                  {edu.documents && edu.documents.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800 flex flex-wrap gap-3">
                      {edu.documents.map((doc, idx) => (
                        <a
                          key={idx}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 hover:underline"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{doc.title}</span>
                        </a>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
