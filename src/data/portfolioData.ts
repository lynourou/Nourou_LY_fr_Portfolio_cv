import { PortfolioData } from '../types/portfolio';

export const initialPortfolioData: PortfolioData = {
  profile: {
    fullName: 'Nourou LY',
    title: 'Géomaticien',
    headline:
      'Géomaticien orienté vers les systèmes d\'information géographique, la cartographie, la télédétection, l\'analyse spatiale, la collecte de données de terrain et la gestion des ressources naturelles.',
    location: 'Sénégal',
    availability: 'Disponible pour opportunités professionnelles',
    avatarUrl: '', // Monogramme sobre NL par défaut
    cvPdfUrl: '/cv.pdf',
  },

  about: {
    journey:
      'Diplômé d\'un BTS en Géomatique au CEDT Le G15 en 2026, mon parcours s\'est résolument orienté vers les sciences de l\'information géographique, l\'analyse spatiale et la gestion environnementale. Mon parcours a débuté par une solide formation technique en métallurgie, mécanique des métaux et génie industriel, avant d\'évoluer de manière progressive et cohérente vers la géomatique : métallurgie et travail des métaux → formation technique → génie industriel → géomatique → SIG et cartographie → télédétection → collecte de données terrain → foresterie et environnement → bases de données spatiales → webmapping et applications mobiles géographiques.',
    profileDescription:
      'Technicien supérieur en géomatique spécialisé dans les systèmes d\'information géographique (SIG), la cartographie numérique, la télédétection et les bases de données géospatiales. Mon travail couvre l\'ensemble du cycle de la donnée spatiale : collecte in situ (QField, GPS, RTK), modélisation et structuration (PostgreSQL / PostGIS, GeoPackage), traitements et analyses spatiales sous QGIS, classification et traitement d\'images satellitaires (Sentinel-2, Landsat) par indices spectraux (EVI, MNDWI, BSI), et développement d\'outils de diffusion cartographique (WebSIG avec Leaflet, MapLibre et applications mobiles Flutter).',
    interests: [
      'Systèmes d\'information géographique (SIG) et analyse spatiale',
      'Cartographie numérique et thématique',
      'Télédétection et traitement d\'images satellitaires',
      'Gestion des ressources naturelles, foresterie et environnement',
      'Occupation et utilisation du sol, suivi diachronique',
      'Collecte de données géographiques sur le terrain et arpentage GPS',
      'Bases de données spatiales et géodonnées',
      'Webmapping et applications mobiles de collecte géographique',
    ],
    careerGoals:
      'Mettre mes compétences en géomatique, analyse spatiale et télédétection au service de projets de gestion durable des ressources naturelles, d\'aménagement du territoire, de suivi forestier et de valorisation des données géospatiales.',
  },

  skills: [
    {
      id: 'sig-carto',
      title: 'SIG & Cartographie',
      skills: [
        { id: 'qgis', name: 'QGIS (environnement SIG principal)' },
        { id: 'arcgis-pro', name: 'ArcGIS Pro' },
        { id: 'arcmap', name: 'ArcMap' },
        { id: 'arcgis', name: 'ArcGIS' },
        { id: 'arcscene', name: 'ArcScene' },
        { id: 'prod-carto', name: 'Production et mise en page cartographique' },
        { id: 'analyse-spatiale', name: 'Analyse spatiale et géoréférencement' },
        { id: 'topologie', name: 'Topologie et gestion des projections' },
        { id: 'symbologie', name: 'Symbologie et sémiologie graphique' },
      ],
    },
    {
      id: 'teledetection',
      title: 'Télédétection & Imagerie',
      skills: [
        { id: 'traitement-images', name: 'Traitement d\'images satellitaires' },
        { id: 'sentinel2', name: 'Sentinel-2' },
        { id: 'landsat', name: 'Landsat (5 TM, 8 OLI/TIRS)' },
        { id: 'indices-spectraux', name: 'Indices spectraux (EVI, MNDWI, BSI)' },
        { id: 'classification-sol', name: 'Classification de l\'occupation du sol' },
        { id: 'analyse-temporelle', name: 'Analyse temporelle et diachronique' },
        { id: 'analyse-vegetation', name: 'Analyse de la végétation et de l\'eau' },
        { id: 'snap-orfeo', name: 'Logiciels ESA SNAP & ORFEO' },
        { id: 'gee-erdas', name: 'Google Earth Engine, Google Earth Pro, ERDAS' },
      ],
    },
    {
      id: 'bases-donnees',
      title: 'Bases de données spatiales',
      skills: [
        { id: 'postgresql', name: 'PostgreSQL' },
        { id: 'postgis', name: 'PostGIS' },
        { id: 'geopackage', name: 'GeoPackage' },
        { id: 'geojson', name: 'GeoJSON' },
        { id: 'shapefile', name: 'Shapefiles et Géodatabases' },
        { id: 'structuration', name: 'Structuration et gestion de bases de données' },
        { id: 'sql-spatial', name: 'Requêtes spatiales SQL' },
        { id: 'poweramc-looping', name: 'Modélisation conceptuelle (PowerAMC, Looping)' },
      ],
    },
    {
      id: 'collecte-terrain',
      title: 'Collecte de données terrain & Topographie',
      skills: [
        { id: 'qfield', name: 'QField' },
        { id: 'gps-rtk', name: 'GPS, GPS de poche et RTK' },
        { id: 'arpentage', name: 'Arpentage GPS et relevés de terrain' },
        { id: 'geometrie-terrain', name: 'Collecte de points, lignes et polygones' },
        { id: 'attributs-terrain', name: 'Collecte d\'attributs et mode hors ligne' },
        { id: 'outils-mobiles', name: 'KoboCollect, Mobile Topographer, Locus Map, OSM Tracker' },
        { id: 'photogrammetrie', name: 'Topographie, photogrammétrie et drones (Metashape, Pix4D)' },
      ],
    },
    {
      id: 'webmapping-dev',
      title: 'Webmapping & Programmation',
      skills: [
        { id: 'leaflet', name: 'Leaflet' },
        { id: 'maplibre', name: 'MapLibre' },
        { id: 'flutter-dart', name: 'Flutter 3.29 & Dart (applications mobiles géographiques)' },
        { id: 'firebase-firestore', name: 'Firebase / Firestore' },
        { id: 'python', name: 'Python (niveau débutant)' },
        { id: 'web-dev', name: 'HTML, CSS, GeoJSON' },
      ],
    },
    {
      id: 'autres-outils',
      title: 'Autres logiciels techniques & DAO',
      skills: [
        { id: 'autocad', name: 'AutoCAD' },
        { id: 'solidworks', name: 'SolidWorks' },
        { id: 'sketchup', name: 'SketchUp' },
        { id: 'office', name: 'Pack Office' },
      ],
    },
    {
      id: 'langues',
      title: 'Langues',
      skills: [
        { id: 'francais', name: 'Français (courant)' },
        { id: 'espagnol', name: 'Espagnol (excellente maîtrise)' },
        { id: 'anglais', name: 'Anglais (intermédiaire / débutant)' },
      ],
    },
  ],

  projects: [
    {
      id: 'foret-classee-mbao',
      title: 'Apport de la géomatique à la gestion de la forêt classée de Mbao',
      category: 'Télédétection & Gestion forestière',
      shortDescription:
        'Travail de fin d\'études de BTS Géomatique (document de 136 pages, 9 mois de recherche) analysant l\'occupation du sol, la dynamique de la végétation, le stock de carbone, le relief et les projections climatiques.',
      year: '2024–2026',
      tools: ['QGIS', 'Sentinel-2', 'Landsat', 'Indices spectraux (EVI, MNDWI, BSI)', 'MNT ANAT', 'PostGIS'],
      mainImage: '',
      context:
        'Mémoire de fin d\'études pour l\'obtention du BTS Géomatique au CEDT Le G15, réalisé sur une durée d\'environ 9 mois et soutenu le 20 juillet 2026. Le document final compte 136 pages. L\'étude se concentre sur la forêt classée de Mbao au Sénégal, écosystème forestier stratégique soumis aux pressions périurbaines et aux changements climatiques.',
      objective:
        'Identifier les caractéristiques spatiales de la forêt, cartographier les différentes composantes territoriales, analyser l\'évolution temporelle de l\'occupation du sol, étudier la végétation et le stock de carbone, intégrer les séries climatiques, analyser le relief et le bassin versant, et structurer les données dans une base spatiale pour proposer des outils de gestion durable.',
      methodology:
        'Approche méthodologique structurée : Identifier, Cartographier, Analyser, Proposer. Analyse diachronique mobilisant l\'imagerie satellitaire Landsat (Landsat 5 TM en 1985 et 2000, Landsat 8 OLI/TIRS en 2015 et 2025) et Sentinel-2 (2025). Calcul et interprétation des indices spectraux : EVI pour la végétation, MNDWI pour l\'eau et les zones humides, BSI pour les sols nus. Traitement spatial sous QGIS complété par SNAP et ORFEO. Analyse topographique et hydrologique à partir du MNT ANAT (résolution 5 m) et des données PGIIS (résolution 50 cm). Intégration de séries climatiques NASA POWER (température, précipitations, humidité), ERA5 et CHIRPS.',
      dataUsed: [
        'Imagerie satellitaire Sentinel-2 (2025)',
        'Imageries Landsat 5 TM (1985, 2000) et Landsat 8 OLI/TIRS (2015, 2025)',
        'Modèle Numérique de Terrain ANAT (résolution 5 m)',
        'Données PGIIS (résolution 50 cm)',
        'Données climatiques NASA POWER, ERA5 et CHIRPS (température, précipitations, humidité)',
        'Données statistiques et socio-économiques ANSD',
      ],
      softwareAndTech: ['QGIS (environnement SIG principal)', 'ArcGIS', 'ArcMap', 'ArcGIS Pro', 'ArcScene', 'SNAP', 'ORFEO', 'QField', 'PostgreSQL / PostGIS'],
      results:
        'Cartographie diachronique complète de l\'occupation du sol sur 40 ans (1985–2025), caractérisation de la dynamique du couvert végétal par indices EVI/BSI/MNDWI, analyse du relief et délimitation du bassin versant, structuration d\'une base de données géospatiale et propositions d\'outils cartographiques pour la gestion durable et la résilience face au changement climatique.',
      mapsAndScreenshots: [],
      links: [],
      conclusion:
        'Ce mémoire démontre l\'apport indispensable de la géomatique et de la télédétection pour objectiver les dynamiques territoriales, orienter la gestion forestière et anticiper les impacts environnementaux.',
    },
    {
      id: 'geeforet-senegal',
      title: 'GEOFORÊT SÉNÉGAL',
      category: 'Application mobile géomatique & Foresterie',
      shortDescription:
        'Application mobile de collecte, d\'arpentage GPS et de gestion des données forestières développée sous Flutter pour fiabiliser le suivi in situ des reboisements et des forêts classées.',
      year: '2026',
      tools: ['Flutter 3.29.2', 'Dart 3.7.2', 'MapLibre Native Android', 'GeoJSON', 'GPS', 'UTM Zone 28N'],
      mainImage: '',
      context:
        'Conception d\'un outil mobile robuste adapté aux exigences des interventions de terrain forestier au Sénégal, garantissant le fonctionnement hors ligne, la précision géodésique et la traçabilité des limites spatiales.',
      objective:
        'Développer une application mobile pour la collecte, la gestion et la visualisation de données forestières sur le terrain, dotée d\'une base de données locale, d\'un module d\'arpentage GPS qualifié, de formulaires de saisie et d\'un moteur cartographique hors ligne.',
      methodology:
        'Développement sous Flutter 3.29.2 et Dart 3.7.2 (environnement Windows 11). Moteur cartographique MapLibre Native Android avec fond cartographique OpenStreetMap en ligne et attribution. Format GeoJSON conforme RFC 7946, EPSG:4326 et projection de travail en UTM Zone 28N (EPSG:32628). Positionnement GPS via FusedLocationProviderClient avec mécanisme de fallback et 4 classes de qualité géodésique : OPTIMALE (< 5 m), BONNE (< 10 m), ACCEPTABLE (< 20 m), DÉGRADÉE (> 20 m). Attributs GPS enregistrés : latitude, longitude, altitude, nombre de satellites, bearing, vitesse, horodatage UTC ISO. Entités structurées dans la base : Utilisateur, Arbre, SiteReboisement, AxeReboisement, ForetClassee, CoucheReference, ReleveGPS, Photo, JournalModification.',
      dataUsed: [
        'GeoJSON conforme RFC 7946 (EPSG:4326 et UTM Zone 28N EPSG:32628)',
        'Fonds cartographiques OpenStreetMap',
        'Données d\'arpentage GPS qualifiées in situ',
      ],
      softwareAndTech: ['Flutter 3.29.2', 'Dart 3.7.2', 'MapLibre Native Android', 'Android SDK', 'GeoJSON', 'Windows 11'],
      results:
        'Version V1 opérationnelle comprenant base de données locale, arpentage GPS, formulaires terrain, visualisation cartographique MapLibre, import/export GeoJSON, fonctionnement hors ligne et un module spécifique de gestion des forêts classées maintenant rigoureusement séparées l\'ancienne limite (décret/archives) et la nouvelle limite (relevé GPS), sans jamais écraser l\'ancienne, avec calcul automatique des écarts de superficie en hectares et en pourcentage.',
      mapsAndScreenshots: [],
      links: [],
      conclusion:
        'GEOFORÊT SÉNÉGAL fournit une solution technologique mobile souveraine et rigoureuse répondant aux besoins opérationnels des agents forestiers sur le terrain.',
    },
    {
      id: 'fpt-dakar-cedt-g15',
      title: 'Cartographie des centres de formation FPT de Dakar (CEDT Le G15)',
      category: 'Webmapping & Bases de données spatiales',
      shortDescription:
        'Plateforme cartographique et base de données géospatiale recensant et qualifiant 190 centres de Formation Professionnelle et Technique (FPT) de la région de Dakar.',
      year: '2026',
      tools: ['Leaflet', 'GeoJSON', 'GeoPackage (CENTRES_FORMATION_V2.gpkg)', 'QGIS', 'EPSG:32628', 'Firebase'],
      mainImage: '',
      context:
        'Projet réalisé dans le cadre du cursus au CEDT Le G15 pour répondre au besoin d\'accessibilité et de visibilité géographique sur l\'offre de formation professionnelle et technique dans la région de Dakar.',
      objective:
        'Créer une plateforme permettant de cartographier les centres de formation FPT de Dakar et d\'aider les jeunes et les professionnels à identifier les opportunités de formation.',
      methodology:
        'Constitution d\'une couche géographique initiale de 190 entités sous projection UTM Zone 28N (EPSG:32628). Fichier principal de données géographiques : CENTRES_FORMATION_V2.gpkg (couche centres_formation, 190 entités) structuré autour de 19 champs clés (fid, id, nom, nom_officiel, type, statut, commune, adresse, telephone, email, site_web, formation, filiere, diplomes, date_creation, description, capacite, photo, source). Enrichissement méthodique via fichier Excel de travail CENTRES_FORMATION_ENRICHIS_WEB_V2.xlsx (190 lignes, 21 colonnes, 23 enregistrements modifiés et 88 valeurs ajoutées). Développement de la plateforme cartographique interactive avec Leaflet, flux GeoJSON et architecture backend Firebase / Firestore garantissant la lecture publique et réservant l\'écriture et l\'administration au gestionnaire.',
      dataUsed: [
        'Couche ponctuelle de 190 centres de formation FPT',
        'Fichier géographique final CENTRES_FORMATION_V2.gpkg (190 entités, 19 champs)',
        'Table attributaire enrichie CENTRES_FORMATION_ENRICHIS_WEB_V2.xlsx (190 lignes, 21 colonnes)',
        'Découpage administratif communal de la région de Dakar',
      ],
      softwareAndTech: ['QGIS', 'GeoPackage', 'Leaflet', 'GeoJSON', 'Firebase / Firestore', 'Excel'],
      results:
        'Base de données géospatiale normalisée des 190 établissements FPT de la région de Dakar et plateforme cartographique interactive dotée d\'un tableau de bord administrateur permettant l\'ajout, l\'import GeoJSON et la mise à jour sécurisée des informations.',
      mapsAndScreenshots: [],
      links: [],
      conclusion:
        'Valorisation concrète de l\'information géographique publique au service de l\'orientation des jeunes et du développement des compétences professionnelles.',
    },
    {
      id: 'projet-terrain-defccs-mbour',
      title: 'Travaux de terrain et reboisement — Direction des Eaux et Forêts (Mbour)',
      category: 'Foresterie & Collecte terrain',
      shortDescription:
        'Activités de collecte de données géographiques in situ, relevé d\'alignements de reboisement et délimitation de parcelles forestières auprès de la DEFCCS de Mbour.',
      year: '2026',
      tools: ['QField', 'GPS de terrain', 'Cartographie in situ', 'Google Maps'],
      mainImage: '',
      context:
        'Travaux techniques réalisés dans le cadre du stage auprès de la Direction des Eaux, Forêts, Chasses et de la Conservation des Sols (DEFCCS) de Mbour.',
      objective:
        'Assurer la collecte de données géographiques sur le terrain, le géoréférencement des plants de reboisement, la délimitation des parcelles et l\'appui au suivi forestier.',
      methodology:
        'Relevés géographiques in situ à l\'aide d\'outils mobiles (QField sur smartphone et GPS), repérage des alignements de reboisement, enregistrement des extrémités de lignes (premier et dernier arbre), contrôle du respect de l\'espacement de 10 m entre chaque sujet, et levé des emprises de parcelles, pépinières et zones de triage.',
      dataUsed: [
        'Données de positionnement GPS relevées in situ',
        'Limites administratives et cadastrales locales',
        'Plans de reboisement de la DEFCCS',
      ],
      softwareAndTech: ['QField', 'Google Maps', 'GPS', 'QGIS'],
      results:
        'Géoréférencement précis des campagnes de reboisement sur l\'axe Mbour–Joal, identification des contraintes de connectivité réseau sur smartphone et formulation de recommandations pour l\'usage de GPS de poche dédié.',
      mapsAndScreenshots: [],
      links: [],
      conclusion:
        'Pratique concrète de l\'acquisition de données spatiales en milieu forestier réel, reliant outils numériques et exigences de terrain.',
    },
  ],

  experiences: [
    {
      id: 'stage-defccs-mbour',
      role: 'Stagiaire en Géomatique et Gestion Forestière',
      organization: 'Direction des Eaux, Forêts, Chasses et de la Conservation des Sols (DEFCCS)',
      location: 'Mbour, Sénégal',
      period: 'Août – Septembre 2026 (Début le 24 août 2026)',
      description:
        'Participation aux activités de terrain liées à la collecte, au suivi et à la cartographie des données forestières et environnementales au sein des services forestiers de Mbour.',
      missions: [
        'Collecte et relevé de données géographiques sur le terrain',
        'Participation aux opérations de reboisement et au suivi des parcelles reboisées',
        'Délimitation et identification de parcelles, de zones de triage et de pépinières',
        'Utilisation d\'outils mobiles de géolocalisation (QField, GPS)',
      ],
      skillsUsed: ['Collecte terrain', 'QField', 'GPS', 'Cartographie', 'Foresterie', 'Reboisement'],
      documentsOrPhotos: [],
    },
    {
      id: 'stage-mastercom-dakar',
      role: 'Stagiaire en Géomatique',
      organization: 'Mastercom',
      location: 'Dakar, Sénégal (Stage hybride)',
      period: 'Août 2025 – Septembre 2025',
      description:
        'Participation à la conception et au développement d\'un Système d\'Information Géographique (SIG) dédié à la sécurité publique au Sénégal. Cette expérience constitue une première expérience professionnelle significative en géomatique, avant le BTS et les travaux orientés vers la foresterie, l\'environnement et la gestion des ressources naturelles.',
      missions: [
        'Analyse des besoins en information géographique',
        'Conception et structuration d\'une base de données géospatiale',
        'Intégration et traitement des données géographiques',
        'Géocodage et cartographie des incidents liés au trafic de drogue',
        'Production de cartes thématiques',
        'Réalisation d\'analyses spatiales pour l\'aide à la décision',
        'Participation au développement d\'un WebSIG / système de cartographie web',
        'Mise à jour et intégration des données',
        'Contrôle de la qualité des données géographiques',
        'Production de cartes destinées à faciliter l\'analyse et l\'aide à la décision',
      ],
      skillsUsed: [
        'SIG',
        'Bases de données géospatiales',
        'Cartographie thématique',
        'Analyse spatiale',
        'Géocodage',
        'WebSIG / Webmapping',
        'Contrôle qualité des données',
        'Aide à la décision',
      ],
      documentsOrPhotos: [],
    },
    {
      id: 'entrepreneur-soudure',
      role: 'Entrepreneur en Soudure et Menuiserie Métallique',
      organization: 'Atelier personnel de métallurgie',
      location: 'Guinée Équatoriale',
      period: '2023',
      description:
        'Expérience technique pratique dans les métiers de la métallurgie, fabrication et assemblage métallique, développant rigueur géométrique, lecture de plans et sens du travail bien fait avant l\'orientation complète vers la géomatique.',
      missions: [
        'Travaux de fabrication mécanique et soudure de structures métalliques',
        'Contrôle qualité dimensionnel et respect des tolérances',
      ],
      skillsUsed: ['Métallurgie', 'Lecture de plans', 'Rigueur dimensionnelle'],
      documentsOrPhotos: [],
    },
    {
      id: 'btd-formateur-adjoint',
      role: 'Stage Formateur adjoint en Métallurgie',
      organization: 'BTD Services',
      location: 'Guinée Équatoriale',
      period: '2022',
      description:
        'Assistance à la formation technique et encadrement pratique des apprenants en métallomécanique et travail des métaux.',
      missions: [
        'Accompagnement pédagogique des stagiaires en atelier',
        'Application des consignes de sécurité et des normes de fabrication',
      ],
      skillsUsed: ['Métallomécanique', 'Formation technique', 'Règles d\'atelier'],
      documentsOrPhotos: [],
    },
    {
      id: 'btd-technicien-usinage',
      role: 'Technicien en usinage',
      organization: 'BTD Services',
      location: 'Guinée Équatoriale',
      period: '2021',
      description: 'Opérations d\'usinage mécanique, réglage de machines et fabrication de pièces mécaniques.',
      missions: [
        'Usinage de pièces de précision selon spécifications techniques',
        'Contrôle dimensionnel à l\'aide d\'instruments de métrologie',
      ],
      skillsUsed: ['Usinage mécanique', 'Métrologie', 'Précision technique'],
      documentsOrPhotos: [],
    },
  ],

  fieldwork: [
    {
      id: 'terrain-reboisement-nianing',
      mission: 'Campagne de reboisement sur l\'axe routier Mbour–Joal (Nianing)',
      location: 'Axe routier Mbour–Joal, zone de Nianing, Sénégal',
      date: '27 août 2026',
      objective:
        'Repérage des arbres, inventaire géoréférencé et délimitation spatiale des parcelles de reboisement, de la pépinière et de la zone de triage.',
      equipment: [
        'Application mobile QField sur smartphone',
        'Google Maps (utilisé ponctuellement en appoint en raison de difficultés de précision rencontrées avec QField en conditions de réseau faibles)',
        'GPS (identification de l\'intérêt d\'un GPS de poche dédié pour fiabiliser les relevés terrain)',
      ],
      collectionMethods:
        'Repérage méthodique des arbres le long de l\'axe routier. Enregistrement systématique du premier arbre et du dernier arbre avec prise en compte d\'un espacement prévu de 10 m entre les arbres. Délimitation du contour de la parcelle de reboisement. Délimitation de la pépinière située dans la zone de triage et délimitation de la zone de triage. Collecte et représentation cartographique des données géographiques.',
      results:
        'Données géographiques de la parcelle reboisée, de la pépinière et de la zone de triage collectées et formalisées. Constat opérationnel sur l\'impact des faibles conditions de réseau sur la précision mobile et préconisation d\'un GPS de poche.',
      photos: [],
      maps: [],
    },
    {
      id: 'terrain-reboisement-cimetiere',
      mission: 'Travaux de délimitation sur zone de reboisement (secteur cimetière)',
      location: 'Zone de reboisement (secteur cimetière), secteur de Mbour, Sénégal',
      date: '29 août 2026',
      objective:
        'Participation à des travaux techniques liés à une zone de reboisement au niveau d\'un cimetière.',
      equipment: ['Matériel de collecte de données géographiques de terrain'],
      collectionMethods:
        'Observation in situ et reconnaissance des aménagements de reboisement (les informations complémentaires seront ajoutées au fur et à mesure).',
      results: 'Localisation et délimitation spatiale de la zone de reboisement.',
      photos: [],
      maps: [],
    },
  ],

  cartography: [], // Prête à recevoir les cartes réelles (Mbao, occupation du sol, etc.) sans aucune carte fictive

  education: [
    {
      id: 'edu-bts-geomatique',
      degree: 'BTS en Géomatique',
      institution: 'CEDT Le G15 (Centre d\'Entrepreneuriat et de Développement Technique)',
      location: 'Dakar, Sénégal',
      period: '2024 – 2026 (Obtenu en 2026, soutenance le 20 juillet 2026)',
      description:
        'Formation supérieure spécialisée en sciences géomatiques : systèmes d\'information géographique, cartographie numérique, topographie, géodésie, télédétection, photogrammétrie, bases de données spatiales, programmation appliquée à la géomatique, WebSIG et analyses spatiales. Travail de fin d\'études (136 pages, 9 mois) : « Apport de la géomatique à la gestion de la forêt classée de Mbao ».',
    },
    {
      id: 'edu-bts-metallurgie',
      degree: 'BTS en Métallurgie',
      institution: 'San José Obrero',
      location: 'Guinée Équatoriale',
      period: '2019 – 2021',
      description: 'Formation technique en métallurgie, mécanique des métaux, chaudronnerie et métrologie.',
    },
    {
      id: 'edu-ingenierie-industrielle',
      degree: 'Ingénierie Industrielle (Licence I)',
      institution: 'Université Nationale de Guinée Équatoriale (UNGE)',
      location: 'Guinée Équatoriale',
      period: '2020 – 2021',
      description: 'Première année d\'études universitaires en sciences de l\'ingénieur et génie industriel.',
    },
    {
      id: 'edu-baccalaureat-technologies',
      degree: 'Baccalauréat en Technologies',
      institution: 'Nuestra Señora de Bisila',
      location: 'Guinée Équatoriale',
      period: '2017 – 2019',
      description: 'Formation secondaire technique et scientifique.',
    },
  ],

  contact: {
    email: 'lynourou12@gmail.com',
    phone: '77 670 60 35',
    linkedin: 'https://www.linkedin.com/in/nourou-ly',
    github: '',
    location: 'Sénégal',
  },
};
