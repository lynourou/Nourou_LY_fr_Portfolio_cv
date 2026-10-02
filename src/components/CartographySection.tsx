import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { CartoItem } from '../types/portfolio';
import { Map, Maximize2, ExternalLink, Calendar, MapPin, X } from 'lucide-react';

export const CartographySection: React.FC = () => {
  const { data, trackEvent } = usePortfolio();
  const [fullscreenMap, setFullscreenMap] = useState<CartoItem | null>(null);

  const handleOpenMap = (item: CartoItem) => {
    setFullscreenMap(item);
    trackEvent('map_view', item.id, item.title);
  };

  return (
    <section id="cartotheque" className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2">
            <Map className="w-4 h-4" />
            <span>Production graphique</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Cartothèque
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Galerie des cartes thématiques, sémiologie graphique, représentations territoriales et atlas.
          </p>
        </div>

        {/* État vide si aucune carte n'est encore saisie */}
        {data.cartography.length === 0 ? (
          <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-3 transition-colors">
            <Map className="w-8 h-8 text-slate-400 dark:text-slate-500 mx-auto" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Aucune carte publiée pour le moment
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              La cartothèque sera alimentée avec vos cartes thématiques, cartes d'occupation du sol et atlas territoriaux réels.
            </p>
          </div>
        ) : (
          /* Grille des cartes */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.cartography.map((mapItem) => (
              <div
                key={mapItem.id}
                className="group bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
              >
                {/* Image de la carte avec bouton plein écran */}
                <div className="relative aspect-16/10 bg-slate-900 overflow-hidden">
                  {mapItem.imageUrl ? (
                    <img
                      src={mapItem.imageUrl}
                      alt={mapItem.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <Map className="w-10 h-10" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors" />

                  {/* Bouton pour agrandir */}
                  {mapItem.imageUrl && (
                    <button
                      onClick={() => handleOpenMap(mapItem)}
                      className="absolute top-3 right-3 p-2 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-xs transition-colors"
                      title="Afficher en plein écran"
                      aria-label="Agrandir la carte"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Métadonnées cartographiques */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {mapItem.studyArea && (
                        <span className="flex items-center gap-1 font-sans text-slate-700 dark:text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                          {mapItem.studyArea}
                        </span>
                      )}
                      {mapItem.studyArea && mapItem.date && (
                        <span aria-hidden="true">·</span>
                      )}
                      {mapItem.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {mapItem.date}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {mapItem.title}
                    </h3>

                    {mapItem.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {mapItem.description}
                      </p>
                    )}
                  </div>

                  {/* Spécifications techniques */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {mapItem.scaleOrProjection && (
                        <div>
                          <span className="text-slate-400 dark:text-slate-500 block">Échelle / Projection :</span>
                          <span className="text-slate-700 dark:text-slate-300 font-semibold">{mapItem.scaleOrProjection}</span>
                        </div>
                      )}
                      {mapItem.softwareUsed && mapItem.softwareUsed.length > 0 && (
                        <div>
                          <span className="text-slate-400 dark:text-slate-500 block">Logiciels :</span>
                          <span className="text-slate-700 dark:text-slate-300 font-semibold">{mapItem.softwareUsed.join(', ')}</span>
                        </div>
                      )}
                    </div>

                    {mapItem.interactiveMapUrl && (
                      <div className="pt-2">
                        <a
                          href={mapItem.interactiveMapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Consulter la carte interactive</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modal d'affichage plein écran */}
      {fullscreenMap && fullscreenMap.imageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setFullscreenMap(null)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {fullscreenMap.title}
                </h3>
                {fullscreenMap.scaleOrProjection && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {fullscreenMap.scaleOrProjection}
                  </p>
                )}
              </div>

              <button
                onClick={() => setFullscreenMap(null)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950">
              <img
                src={fullscreenMap.imageUrl}
                alt={fullscreenMap.title}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[78vh] object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
