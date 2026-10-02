import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase, Calendar, MapPin, Building2, Check, FileText } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="experiences" className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2">
            <Briefcase className="w-4 h-4" />
            <span>Parcours professionnel</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Expériences professionnelles
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Postes occupés, missions confiées en géomatique, bureau d'études ou administration territoriale.
          </p>
        </div>

        {/* État vide si aucune expérience n'est renseignée */}
        {data.experiences.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-3">
            <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Aucune expérience renseignée pour le moment
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Le parcours professionnel en SIG et les missions d'ingénierie territoriale seront complétés prochainement.
            </p>
          </div>
        ) : (
          /* Timeline */
          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-32 space-y-12">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="relative pl-6 sm:pl-8 group">
                
                {/* Point de la frise chronologique */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-slate-700 group-hover:border-emerald-600 dark:group-hover:border-emerald-500 transition-colors" />

                {/* Date sur la gauche pour grands écrans */}
                {exp.period && (
                  <div className="sm:absolute sm:-left-36 sm:top-1 text-xs font-mono text-slate-500 dark:text-slate-400 font-medium sm:w-28 sm:text-right mb-2 sm:mb-0">
                    <span className="flex items-center gap-1 sm:justify-end">
                      <Calendar className="w-3 h-3 text-emerald-600 dark:text-emerald-400 inline" />
                      {exp.period}
                    </span>
                  </div>
                )}

                {/* Carte d'expérience */}
                <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-2xs group-hover:border-slate-300 dark:group-hover:border-slate-700 transition-colors">
                  
                  {/* Titre & Organisation */}
                  <div className="space-y-1 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {exp.role}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      {exp.organization && (
                        <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                          <Building2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                          {exp.organization}
                        </span>
                      )}
                      {exp.location && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {exp.location}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {exp.description && (
                    <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}

                  {/* Missions principales */}
                  {exp.missions && exp.missions.length > 0 && (
                    <div className="mt-5 space-y-2">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        Missions principales :
                      </h4>
                      <ul className="space-y-1.5">
                        {exp.missions.map((mission, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span>{mission}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Compétences mobilisées */}
                  {exp.skillsUsed && exp.skillsUsed.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono text-slate-400 dark:text-slate-500">Compétences :</span>
                      <div className="flex flex-wrap items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                        {exp.skillsUsed.map((skill, idx) => (
                          <React.Fragment key={idx}>
                            <span>{skill}</span>
                            {idx < exp.skillsUsed.length - 1 && (
                              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Documents associés */}
                  {exp.documentsOrPhotos && exp.documentsOrPhotos.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-3">
                      {exp.documentsOrPhotos.map((doc, idx) => (
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
