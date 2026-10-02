import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Layers,
  Database,
  Radio,
  MapPin,
  Globe,
  Wrench,
  Check,
  FolderGit2,
  ArrowRight,
  Sparkles,
  X,
  Compass,
} from 'lucide-react';
import { SkillCategory } from '../types/portfolio';
import { scrollToSection } from '../utils/helpers';

interface SkillProjectMatch {
  projectId: string;
  projectTitle: string;
  projectCategory: string;
  projectYear: string;
  usageDescription: string;
}

export const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSkillName, setSelectedSkillName] = useState<string | null>('QGIS (environnement SIG principal)');

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'sig-carto':
        return <Layers className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />;
      case 'teledetection':
        return <Radio className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />;
      case 'bases-donnees':
        return <Database className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />;
      case 'collecte-terrain':
        return <MapPin className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />;
      case 'webmapping-dev':
        return <Globe className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />;
      default:
        return <Wrench className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />;
    }
  };

  /**
   * Matrice croisée reliant les compétences aux projets réels de Nourou LY
   */
  const getProjectsForSkill = (skillName: string): SkillProjectMatch[] => {
    const s = skillName.toLowerCase();
    const matches: SkillProjectMatch[] = [];

    // QGIS
    if (s.includes('qgis')) {
      matches.push({
        projectId: 'foret-classee-mbao',
        projectTitle: 'Apport de la géomatique à la gestion de la forêt classée de Mbao',
        projectCategory: 'Télédétection & Foresterie',
        projectYear: '2024–2026',
        usageDescription: 'Environnement SIG principal pour les traitements diachroniques 1985–2025, analyses spatiales et cartographie.',
      });
      matches.push({
        projectId: 'fpt-dakar-cedt-g15',
        projectTitle: 'Cartographie des centres de formation FPT de Dakar',
        projectCategory: 'Webmapping & SIG',
        projectYear: '2026',
        usageDescription: 'Structuration de la couche géographique GeoPackage (190 entités) et vérification topologique en UTM 28N.',
      });
      matches.push({
        projectId: 'projet-terrain-defccs-mbour',
        projectTitle: 'Travaux de terrain et reboisement (DEFCCS Mbour)',
        projectCategory: 'Foresterie & Collecte terrain',
        projectYear: '2026',
        usageDescription: 'Intégration des données géoréférencées in situ des alignements de reboisement et parcelles forestières.',
      });
    }

    // ArcGIS / ArcMap / ArcScene
    if (s.includes('arcgis') || s.includes('arcmap') || s.includes('arcscene')) {
      matches.push({
        projectId: 'foret-classee-mbao',
        projectTitle: 'Apport de la géomatique à la gestion de la forêt classée de Mbao',
        projectCategory: 'SIG & Télédétection',
        projectYear: '2024–2026',
        usageDescription: 'Analyses spatiales complémentaires, gestion des géodatabases et visualisations 3D du relief sous ArcScene.',
      });
    }

    // Cartographie & Analyse spatiale
    if (s.includes('carto') || s.includes('analyse spatiale') || s.includes('topologie')) {
      matches.push({
        projectId: 'foret-classee-mbao',
        projectTitle: 'Apport de la géomatique à la gestion de la forêt classée de Mbao',
        projectCategory: 'Télédétection & Foresterie',
        projectYear: '2024–2026',
        usageDescription: 'Production cartographique multi-dates de l\'occupation du sol sur 40 ans et modélisation du bassin versant.',
      });
      matches.push({
        projectId: 'fpt-dakar-cedt-g15',
        projectTitle: 'Cartographie des centres de formation FPT de Dakar',
        projectCategory: 'Webmapping & Base de données',
        projectYear: '2026',
        usageDescription: 'Cartographie thématique des 190 établissements FPT par filières et communes dans la région de Dakar.',
      });
      matches.push({
        projectId: 'stage-mastercom-dakar',
        projectTitle: 'SIG dédié à la sécurité publique (Mastercom)',
        projectCategory: 'SIG & WebSIG',
        projectYear: '2025',
        usageDescription: 'Cartographie des incidents, géocodage et production de cartes thématiques d\'aide à la décision.',
      });
    }

    // Sentinel / Landsat / Télédétection / Indices
    if (
      s.includes('sentinel') ||
      s.includes('landsat') ||
      s.includes('indice') ||
      s.includes('télédétection') ||
      s.includes('image') ||
      s.includes('snap') ||
      s.includes('orfeo') ||
      s.includes('sol') ||
      s.includes('végétation')
    ) {
      matches.push({
        projectId: 'foret-classee-mbao',
        projectTitle: 'Apport de la géomatique à la gestion de la forêt classée de Mbao',
        projectCategory: 'Télédétection satellitaire',
        projectYear: '2024–2026',
        usageDescription: 'Calcul des indices spectraux EVI, MNDWI, BSI sur imageries Landsat (1985, 2000, 2015, 2025) et Sentinel-2 (2025).',
      });
    }

    // PostGIS / PostgreSQL / GeoPackage / GeoJSON / BDD
    if (s.includes('postgis') || s.includes('postgresql') || s.includes('geopackage') || s.includes('geojson') || s.includes('données') || s.includes('sql') || s.includes('poweramc')) {
      matches.push({
        projectId: 'foret-classee-mbao',
        projectTitle: 'Apport de la géomatique à la gestion de la forêt classée de Mbao',
        projectCategory: 'Bases de données spatiales',
        projectYear: '2024–2026',
        usageDescription: 'Structuration de la base de données spatiale regroupant couches diachroniques, relief et séries climatiques.',
      });
      matches.push({
        projectId: 'fpt-dakar-cedt-g15',
        projectTitle: 'Cartographie des centres de formation FPT de Dakar',
        projectCategory: 'Base de données & Webmapping',
        projectYear: '2026',
        usageDescription: 'Constitution du GeoPackage CENTRES_FORMATION_V2.gpkg (19 champs) et enrichissement de 190 fiches.',
      });
      matches.push({
        projectId: 'geeforet-senegal',
        projectTitle: 'GEOFORÊT SÉNÉGAL',
        projectCategory: 'Application mobile géomatique',
        projectYear: '2026',
        usageDescription: 'Modélisation des entités (Arbre, SiteReboisement, ForetClassee, ReleveGPS) et imports/exports GeoJSON RFC 7946.',
      });
      matches.push({
        projectId: 'stage-mastercom-dakar',
        projectTitle: 'SIG dédié à la sécurité publique (Mastercom)',
        projectCategory: 'Bases de données géospatiales',
        projectYear: '2025',
        usageDescription: 'Conception et structuration de la base de données géospatiale dédiée aux incidents de sécurité publique.',
      });
    }

    // QField / GPS / RTK / Terrain / Arpentage
    if (s.includes('qfield') || s.includes('gps') || s.includes('rtk') || s.includes('arpentage') || s.includes('terrain') || s.includes('kobo') || s.includes('topographie')) {
      matches.push({
        projectId: 'projet-terrain-defccs-mbour',
        projectTitle: 'Campagne de reboisement à Nianing (axe Mbour–Joal)',
        projectCategory: 'Missions de terrain',
        projectYear: '2026',
        usageDescription: 'Relevé in situ du premier et dernier arbre (espacement 10 m), délimitation de la parcelle, pépinière et zone de triage.',
      });
      matches.push({
        projectId: 'geeforet-senegal',
        projectTitle: 'GEOFORÊT SÉNÉGAL',
        projectCategory: 'Application mobile & GPS',
        projectYear: '2026',
        usageDescription: 'Arpentage GPS qualifié (4 classes de précision) et calcul des écarts de superficie de forêts classées.',
      });
    }

    // Leaflet / MapLibre / Webmapping / Flutter / WebSIG
    if (s.includes('leaflet') || s.includes('maplibre') || s.includes('flutter') || s.includes('dart') || s.includes('web') || s.includes('python')) {
      matches.push({
        projectId: 'geeforet-senegal',
        projectTitle: 'GEOFORÊT SÉNÉGAL',
        projectCategory: 'Application mobile Flutter',
        projectYear: '2026',
        usageDescription: 'Développement sous Flutter 3.29.2 et Dart 3.7.2 avec intégration du moteur cartographique MapLibre Native Android.',
      });
      matches.push({
        projectId: 'fpt-dakar-cedt-g15',
        projectTitle: 'Cartographie des centres de formation FPT de Dakar',
        projectCategory: 'Webmapping Leaflet',
        projectYear: '2026',
        usageDescription: 'Visualisation interactive avec Leaflet, flux GeoJSON et filtres par filières professionnelles et communes.',
      });
      matches.push({
        projectId: 'stage-mastercom-dakar',
        projectTitle: 'SIG dédié à la sécurité publique (Mastercom)',
        projectCategory: 'WebSIG',
        projectYear: '2025',
        usageDescription: 'Participation au développement de l\'application WebSIG pour l\'analyse et l\'aide à la décision.',
      });
    }

    return matches;
  };

  const filteredCategories =
    activeCategory === 'all'
      ? data.skills
      : data.skills.filter((c) => c.id === activeCategory);

  const totalSkillsCount = data.skills.reduce((acc, cat) => acc + cat.skills.length, 0);

  const matchedProjects = selectedSkillName ? getProjectsForSkill(selectedSkillName) : [];

  return (
    <section id="competences" className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2">
            <Layers className="w-4 h-4" />
            <span>Savoir-faire technique</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Compétences &amp; Boîte à outils SIG
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Cliquez sur un outil pour visualiser instantanément dans quels projets réels et missions il a été mis en application.
          </p>
        </div>

        {/* État vide si aucune compétence */}
        {data.skills.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-3">
            <Layers className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Compétences en cours de renseignement
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Les compétences techniques seront détaillées prochainement.
            </p>
          </div>
        ) : (
          <>
            {/* Filtres par catégories */}
            {data.skills.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    activeCategory === 'all'
                      ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Toutes les catégories ({totalSkillsCount})
                </button>

                {data.skills.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                      activeCategory === category.id
                        ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {category.title} ({category.skills.length})
                  </button>
                ))}
              </div>
            )}

            {/* Matrice dynamique : Panneau d'interconnexion Compétence ⇄ Projets réels */}
            {selectedSkillName && matchedProjects.length > 0 && (
              <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-850 border-2 border-emerald-600/30 dark:border-emerald-500/30 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                      <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                        Matrice Compétence ⇄ Projets réels
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {selectedSkillName}
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {matchedProjects.length} application{matchedProjects.length > 1 ? 's' : ''} concrète{matchedProjects.length > 1 ? 's' : ''}
                    </span>
                    <button
                      onClick={() => setSelectedSkillName(null)}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="Fermer la sélection"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Cartes des projets utilisant cette compétence */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {matchedProjects.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                            {p.projectYear}
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">
                            {p.projectCategory}
                          </span>
                        </div>
                        <h5 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                          {p.projectTitle}
                        </h5>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                          {p.usageDescription}
                        </p>
                      </div>

                      <button
                        onClick={() => scrollToSection('projets')}
                        className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 group"
                      >
                        <span>Voir la fiche projet complète</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Grille des catégories de compétences */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category: SkillCategory) => (
                <div
                  key={category.id}
                  className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-2xs p-6 flex flex-col justify-between transition-colors"
                >
                  <div>
                    {/* En-tête de catégorie */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/50">
                          {getCategoryIcon(category.id)}
                        </div>
                        <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                          {category.title}
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                        {category.skills.length} outil{category.skills.length > 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* Liste des compétences cliquables */}
                    <div className="space-y-1.5">
                      {category.skills.map((skill) => {
                        const isSelected = selectedSkillName === skill.name;
                        const hasMatches = getProjectsForSkill(skill.name).length > 0;

                        return (
                          <button
                            key={skill.id}
                            onClick={() => setSelectedSkillName(skill.name)}
                            className={`w-full flex items-center justify-between py-2 px-3 rounded-lg text-left transition-all ${
                              isSelected
                                ? 'bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-500/40 text-emerald-900 dark:text-emerald-200 shadow-2xs font-semibold'
                                : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200 border border-transparent'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                              <Check
                                className={`w-3.5 h-3.5 shrink-0 ${
                                  isSelected
                                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                                    : 'text-slate-400 dark:text-slate-600'
                                }`}
                              />
                              <span>{skill.name}</span>
                            </div>

                            {hasMatches && (
                              <span
                                className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                                  isSelected
                                    ? 'bg-emerald-200/70 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                                }`}
                                title="Projets liés"
                              >
                                {getProjectsForSkill(skill.name).length} proj.
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
};
