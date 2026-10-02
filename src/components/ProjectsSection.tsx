import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectDetail } from '../types/portfolio';
import { FolderGit2, ArrowRight, X, ExternalLink, Calendar, Wrench, Database, Layers, CheckCircle2 } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { data, trackEvent } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);

  const handleOpenProject = (project: ProjectDetail) => {
    setSelectedProject(project);
    trackEvent('project_click', project.id, project.title, project.category);
  };

  return (
    <section id="projets" className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2">
            <FolderGit2 className="w-4 h-4" />
            <span>Réalisations &amp; Études</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Projets SIG &amp; Analyse spatiale
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Études géomatiques, cartographies thématiques, modélisation et valorisation de données territoriales.
          </p>
        </div>

        {/* État vide si aucun projet n'est publié */}
        {data.projects.length === 0 ? (
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-3">
            <FolderGit2 className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Aucun projet publié pour le moment
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Les études et projets d'analyse spatiale seront consultables dans cette galerie dès leur publication.
            </p>
          </div>
        ) : (
          /* Grille des projets */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects.map((project) => (
              <article
                key={project.id}
                className="group flex flex-col bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* Image ou bandeau cartographique du projet */}
                <div className="relative aspect-16/10 bg-slate-100 dark:bg-slate-900 overflow-hidden border-b border-slate-100 dark:border-slate-800">
                  {project.mainImage ? (
                    <img
                      src={project.mainImage}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 text-slate-400 p-4 text-center">
                      <FolderGit2 className="w-8 h-8 text-slate-400 dark:text-slate-600 mb-2" />
                      <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        {project.category}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {project.year && (
                    <div className="absolute top-3 right-3 font-mono text-[11px] text-white/90 bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded">
                      {project.year}
                    </div>
                  )}
                </div>

                {/* Corps de la carte */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      {project.category}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {project.tools.length > 0 && (
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono flex flex-wrap items-center gap-1.5">
                        {project.tools.map((tool, idx) => (
                          <React.Fragment key={idx}>
                            <span>{tool}</span>
                            {idx < project.tools.length - 1 && (
                              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={() => handleOpenProject(project)}
                      className="w-full py-2.5 px-4 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-900 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white rounded-md transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <span>Voir le projet en détail</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Modal de détail du projet */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* En-tête de la modal */}
              <div className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{selectedProject.category}</span>
                    {selectedProject.year && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {selectedProject.year}
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contenu complet de la fiche projet */}
              <div className="p-6 sm:p-8 space-y-8 text-slate-700 dark:text-slate-300">
                {/* 1. Contexte */}
                {selectedProject.context && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Contexte de l'étude
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                      {selectedProject.context}
                    </p>
                  </div>
                )}

                {/* 2. Objectifs */}
                {selectedProject.objective && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Objectifs assignés
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                      {selectedProject.objective}
                    </p>
                  </div>
                )}

                {/* 3. Méthodologie */}
                {selectedProject.methodology && (
                  <div className="space-y-2 bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                      <span>Méthodologie &amp; Chaîne de traitement</span>
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
                      {selectedProject.methodology}
                    </p>
                  </div>
                )}

                {/* 4. Données mobilisées & Outils */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Données utilisées */}
                  {selectedProject.dataUsed && selectedProject.dataUsed.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-slate-500" />
                        <span>Données utilisées</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        {selectedProject.dataUsed.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Logiciels et technologies */}
                  {selectedProject.softwareAndTech && selectedProject.softwareAndTech.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-slate-500" />
                        <span>Outils &amp; Technologies</span>
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.softwareAndTech.map((tech, idx) => (
                          <span
                            key={idx}
                            className="font-mono text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. Résultats */}
                {selectedProject.results && (
                  <div className="space-y-2 border-l-2 border-emerald-600 dark:border-emerald-500 pl-4 py-1">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Résultats obtenus
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                      {selectedProject.results}
                    </p>
                  </div>
                )}

                {/* 6. Conclusion / Apport */}
                {selectedProject.conclusion && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 italic">
                    <span className="font-semibold not-italic text-slate-900 dark:text-white block mb-1">
                      Apport et perspectives :
                    </span>
                    {selectedProject.conclusion}
                  </div>
                )}
              </div>

              {/* Pied de la modal */}
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
                >
                  Fermer la fiche
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
