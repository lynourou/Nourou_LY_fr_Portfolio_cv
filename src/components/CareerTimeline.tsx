import React, { useState } from 'react';
import {
  Compass,
  GraduationCap,
  Briefcase,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  year: string;
  period: string;
  title: string;
  organization: string;
  location: string;
  category: 'geomatique' | 'formation' | 'technique';
  categoryLabel: string;
  summary: string;
  highlights: string[];
  skills: string[];
}

export const CareerTimeline: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'geomatique' | 'technique'>('all');
  const [selectedEventId, setSelectedEventId] = useState<string>('tfe-mbao-2026');

  const events: TimelineEvent[] = [
    {
      id: 'bachillerato-2017',
      year: '2017–2019',
      period: '2017 – 2019',
      title: 'Bachillerato Tecnologías',
      organization: 'Nuestra Señora de Bisila',
      location: 'Guinée Équatoriale',
      category: 'technique',
      categoryLabel: 'Formation initiale',
      summary: 'Cycle secondaire général à forte dominante technologique et scientifique, posant les bases du raisonnement technique.',
      highlights: ['Sciences et technologies', 'Calcul appliqué et méthodologie'],
      skills: ['Sciences techniques', 'Rigueur analytique'],
    },
    {
      id: 'bts-metallurgie-2019',
      year: '2019–2021',
      period: '2019 – 2021',
      title: 'BTS en Métallurgie',
      organization: 'San José Obrero',
      location: 'Guinée Équatoriale',
      category: 'technique',
      categoryLabel: 'Formation technique',
      summary: 'Formation technique appliquée aux matériaux, à la mécanique des métaux, à l\'usinage et au contrôle dimensionnel.',
      highlights: ['Métallomécanique et usinage', 'Contrôle qualité et métrologie de précision'],
      skills: ['Métallurgie', 'Lecture de plans', 'Tolérances dimensionnelles'],
    },
    {
      id: 'unge-genie-industriel-2020',
      year: '2020–2021',
      period: '2020 – 2021',
      title: 'Première année de Génie Industriel (Licence I)',
      organization: 'Universidad Nacional de Guinea Ecuatorial (UNGE)',
      location: 'Guinée Équatoriale',
      category: 'technique',
      categoryLabel: 'Enseignement universitaire',
      summary: 'Formation universitaire fondamentale aux sciences de l\'ingénieur, à la physique appliquée et aux méthodologies industrielles.',
      highlights: ['Mathématiques de l\'ingénieur', 'Organisation industrielle et rigueur conceptuelle'],
      skills: ['Physique appliquée', 'Mécanique', 'Méthodologie de l\'ingénieur'],
    },
    {
      id: 'btd-technicien-2021',
      year: '2021',
      period: '2021',
      title: 'Technicien en usinage',
      organization: 'BTD Services',
      location: 'Guinée Équatoriale',
      category: 'technique',
      categoryLabel: 'Expérience technique',
      summary: 'Réalisation d\'opérations d\'usinage mécanique de pièces de précision selon spécifications industrielles.',
      highlights: ['Usinage selon plans d\'ingénierie', 'Respect strict des tolérances mécaniques'],
      skills: ['Usinage', 'Métrologie', 'Précision d\'atelier'],
    },
    {
      id: 'btd-formateur-2022',
      year: '2022',
      period: '2022',
      title: 'Stage Formateur adjoint en métallurgie',
      organization: 'BTD Services',
      location: 'Guinée Équatoriale',
      category: 'technique',
      categoryLabel: 'Expérience technique',
      summary: 'Accompagnement pédagogique et formation pratique d\'apprenants aux procédés d\'atelier et règles de fabrication.',
      highlights: ['Transmission des savoir-faire d\'atelier', 'Sécurité et rigueur procédurale'],
      skills: ['Pédagogie technique', 'Normes d\'atelier', 'Coordination'],
    },
    {
      id: 'atelier-soudure-2023',
      year: '2023',
      period: '2023',
      title: 'Entrepreneur en Soudure et Travail des Métaux',
      organization: 'Atelier personnel',
      location: 'Guinée Équatoriale',
      category: 'technique',
      categoryLabel: 'Expérience autonome',
      summary: 'Activité autonome de fabrication d\'ouvrages métalliques, consolidant l\'autonomie et la précision géométrique avant l\'orientation vers la géomatique.',
      highlights: ['Conception et assemblage de structures', 'Rigueur géométrique et autonomie'],
      skills: ['Précision géométrique', 'Autonomie de chantier', 'Gestion de matériel'],
    },
    {
      id: 'bts-geomatique-2024',
      year: '2024–2026',
      period: '2024 – 2026',
      title: 'BTS en Géomatique',
      organization: 'CEDT Le G15',
      location: 'Dakar, Sénégal',
      category: 'geomatique',
      categoryLabel: 'Spécialisation Géomatique',
      summary: 'Formation d\'excellence aux sciences géomatiques : SIG, cartographie numérique, analyse spatiale, télédétection satellitaire, bases de données spatiales, géodésie et WebSIG.',
      highlights: ['Diplôme d\'État obtenu en 2026', 'Maîtrise approfondie de QGIS, ArcGIS, PostGIS et télédétection'],
      skills: ['QGIS', 'ArcGIS', 'Télédétection', 'PostGIS', 'WebSIG', 'Arpentage GPS'],
    },
    {
      id: 'stage-mastercom-2025',
      year: 'Août–Sept 2025',
      period: 'Août 2025 – Septembre 2025',
      title: 'Stagiaire en Géomatique — SIG Sécurité Publique',
      organization: 'Mastercom',
      location: 'Dakar, Sénégal (Stage hybride)',
      category: 'geomatique',
      categoryLabel: 'Expérience Géomatique',
      summary: 'Première expérience professionnelle en géomatique : modélisation de base de données spatiale, géocodage d\'incidents et développement d\'un WebSIG.',
      highlights: ['Base de données géospatiale', 'Cartographie thématique d\'aide à la décision et WebSIG'],
      skills: ['Bases de données spatiales', 'Géocodage', 'Analyse spatiale', 'WebSIG'],
    },
    {
      id: 'tfe-mbao-2026',
      year: 'Juillet 2026',
      period: 'Novembre 2025 – Juillet 2026 (Soutenu le 20 juillet 2026)',
      title: 'Mémoire de fin d\'études — Forêt classée de Mbao',
      organization: 'CEDT Le G15',
      location: 'Dakar, Sénégal',
      category: 'geomatique',
      categoryLabel: 'Recherche appliquée',
      summary: 'Étude d\'environ 9 mois (136 pages) sur l\'apport de la géomatique à la gestion durable de la forêt de Mbao : analyse diachronique sur 40 ans (Landsat / Sentinel-2), indices EVI/BSI/MNDWI, relief et projections climatiques.',
      highlights: ['Document de recherche de 136 pages', 'Analyse multi-dates 1985–2025, MNT 5 m et séries ERA5/CHIRPS'],
      skills: ['Télédétection', 'Sentinel-2', 'Landsat', 'Indices spectraux', 'MNT ANAT', 'QGIS'],
    },
    {
      id: 'stage-defccs-2026',
      year: 'Depuis Août 2026',
      period: 'Depuis le 24 août 2026',
      title: 'Stagiaire en Géomatique & Foresterie — DEFCCS Mbour',
      organization: 'Direction des Eaux, Forêts, Chasses et de la Conservation des Sols',
      location: 'Mbour, Sénégal',
      category: 'geomatique',
      categoryLabel: 'Mission opérationnelle',
      summary: 'Activités de terrain et cartographie forestière : levés in situ des alignements de reboisement (axe Mbour–Joal à Nianing), délimitation de parcelles et pépinières avec QField et GPS.',
      highlights: ['Campagne de reboisement à Nianing (arbres espacés de 10 m)', 'Délimitation de parcelles et de pépinières de triage'],
      skills: ['QField', 'GPS de terrain', 'Reboisement', 'Cartographie in situ', 'Gestion forestière'],
    },
  ];

  const filteredEvents = events.filter((e) => {
    if (filter === 'all') return true;
    if (filter === 'geomatique') return e.category === 'geomatique';
    if (filter === 'technique') return e.category === 'technique';
    return true;
  });

  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[events.length - 1];

  return (
    <div className="space-y-8">
      {/* Contrôle de filtrage et fil d'Ariane de la progression */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
            Progression chronologique
          </span>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Du travail technique initial vers la géomatique et la gestion forestière.
          </p>
        </div>

        {/* Boutons de filtre */}
        <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-2xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              filter === 'all'
                ? 'bg-slate-900 text-white dark:bg-emerald-600 dark:text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Toutes les étapes ({events.length})
          </button>
          <button
            onClick={() => setFilter('geomatique')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              filter === 'geomatique'
                ? 'bg-emerald-700 text-white dark:bg-emerald-600 dark:text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Géomatique &amp; SIG
          </button>
          <button
            onClick={() => setFilter('technique')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              filter === 'technique'
                ? 'bg-slate-800 text-white dark:bg-slate-700 dark:text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Parcours technique initial
          </button>
        </div>
      </div>

      {/* Frise chronologique avec sélection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Colonne gauche : liste des étapes temporelles */}
        <div className="lg:col-span-7 relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {filteredEvents.map((evt) => {
            const isSelected = evt.id === selectedEventId;
            const isGeomatique = evt.category === 'geomatique';

            return (
              <div
                key={evt.id}
                onClick={() => setSelectedEventId(evt.id)}
                className={`relative group cursor-pointer p-4 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800/90 border-emerald-600 dark:border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-850 hover:border-slate-300'
                }`}
              >
                {/* Puce sur l'axe temporel */}
                <div
                  className={`absolute -left-[30px] sm:-left-[37px] top-5 w-4 h-4 rounded-full border-2 transition-transform duration-200 ${
                    isSelected
                      ? 'bg-emerald-600 border-white dark:border-slate-900 scale-125 shadow-xs'
                      : isGeomatique
                      ? 'bg-emerald-500 border-white dark:border-slate-900'
                      : 'bg-slate-400 border-white dark:border-slate-900'
                  }`}
                />

                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {evt.year}
                    </span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                        isGeomatique
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {evt.categoryLabel}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {evt.location}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {evt.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  {evt.organization}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {evt.summary}
                </p>
              </div>
            );
          })}
        </div>

        {/* Colonne droite : Fiche détaillée de l'étape sélectionnée */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-white dark:bg-slate-850 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="font-mono text-xs text-emerald-700 dark:text-emerald-400 font-semibold px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/50">
                {selectedEvent.period}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {selectedEvent.location}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {selectedEvent.title}
              </h3>
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400 mt-0.5">
                {selectedEvent.organization}
              </p>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedEvent.summary}
            </p>

            {/* Points d'impact */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Éléments clés
              </span>
              <ul className="space-y-1.5">
                {selectedEvent.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outils & Compétences mobilisés */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Compétences associées
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedEvent.skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[11px] px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
