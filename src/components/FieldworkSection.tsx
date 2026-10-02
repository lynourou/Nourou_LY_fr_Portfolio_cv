import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { MapPin, Calendar, Compass, Wrench, CheckCircle2, Image as ImageIcon, X } from 'lucide-react';
import { FieldworkItem } from '../types/portfolio';

export const FieldworkSection: React.FC = () => {
  const { data } = usePortfolio();
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<{ url: string; caption: string } | null>(null);

  const activeMission: FieldworkItem | undefined =
    data.fieldwork.find((f) => f.id === activeMissionId) || data.fieldwork[0];

  return (
    <section id="terrain" className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4" />
            <span>Acquisition in situ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Travaux &amp; Missions de terrain
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Campagnes de mesures, relevés GPS/GNSS haute précision, inventaires spatiaux et calage de données.
          </p>
        </div>

        {/* État vide si aucune mission de terrain n'est encore saisie */}
        {data.fieldwork.length === 0 ? (
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-3">
            <Compass className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Aucune mission de terrain renseignée pour le moment
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Les activités de terrain seront documentées ici.
            </p>
          </div>
        ) : (
          <>
            {/* Sélecteur de mission */}
            {data.fieldwork.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-slate-100 dark:border-slate-800">
                {data.fieldwork.map((mission, index) => (
                  <button
                    key={mission.id}
                    onClick={() => setActiveMissionId(mission.id)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap text-left ${
                      activeMission?.id === mission.id
                        ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-emerald-400 dark:text-emerald-200">0{index + 1}.</span>
                      <span className="max-w-[280px] truncate">{mission.mission}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Fiche détaillée de la mission active */}
            {activeMission && (
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xs space-y-8 transition-colors">
                
                {/* En-tête de la fiche de terrain */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {activeMission.mission}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1 font-mono">
                      {activeMission.date && (
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                          {activeMission.date}
                        </span>
                      )}
                      {activeMission.location && (
                        <>
                          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                          <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-sans">
                            <MapPin className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                            {activeMission.location}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contenu : Objectif, Matériel, Méthodologie, Résultats */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Colonne gauche (7 cols) : Démarche et Résultats */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Objectif */}
                    {activeMission.objective && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          Objectif de la mission
                        </h4>
                        <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                          {activeMission.objective}
                        </p>
                      </div>
                    )}

                    {/* Méthodes de collecte */}
                    {activeMission.collectionMethods && (
                      <div className="space-y-2 bg-white dark:bg-slate-850 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                          <span>Protocole &amp; Méthodes de collecte</span>
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                          {activeMission.collectionMethods}
                        </p>
                      </div>
                    )}

                    {/* Résultats */}
                    {activeMission.results && (
                      <div className="space-y-2 border-l-2 border-emerald-600 dark:border-emerald-500 pl-4 py-1">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          Résultats obtenus
                        </h4>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {activeMission.results}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Colonne droite (5 cols) : Matériel et Photos */}
                  <div className="lg:col-span-5 space-y-6">
                    {/* Matériel utilisé */}
                    {activeMission.equipment && activeMission.equipment.length > 0 && (
                      <div className="bg-white dark:bg-slate-850 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <Wrench className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                          <span>Équipement &amp; Instruments mobilisés</span>
                        </h4>
                        <ul className="space-y-2">
                          {activeMission.equipment.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Photographies de terrain */}
                    {activeMission.photos && activeMission.photos.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Photographies de terrain</span>
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {activeMission.photos.map((photo, idx) => (
                            <div
                              key={idx}
                              onClick={() => setPreviewImage(photo)}
                              className="group cursor-pointer relative aspect-4/3 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-200 dark:bg-slate-800"
                            >
                              <img
                                src={photo.url}
                                alt={photo.caption || 'Photo de terrain'}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                <span className="text-[10px] text-white font-medium line-clamp-1">
                                  {photo.caption}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            )}
          </>
        )}

      </div>

      {/* Lightbox / Zoom photo */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {previewImage.caption || 'Photographie de terrain'}
              </span>
              <button
                onClick={() => setPreviewImage(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2">
              <img
                src={previewImage.url}
                alt={previewImage.caption}
                referrerPolicy="no-referrer"
                className="w-full max-h-[75vh] object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
