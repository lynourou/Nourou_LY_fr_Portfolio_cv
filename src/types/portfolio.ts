/**
 * Types TypeScript pour l'architecture des données du portfolio géomaticien.
 * Tous les modèles sont modulaires et extensibles.
 */

export interface ProfileData {
  fullName: string;
  title: string;
  headline: string;
  location?: string;
  availability?: string;
  avatarUrl?: string;
  cvPdfUrl: string;
}

export interface AboutData {
  journey: string; // Mon parcours
  profileDescription: string; // Mon profil professionnel
  interests: string[]; // Mes domaines d'intérêt
  careerGoals: string; // Mon orientation professionnelle
}

export interface SkillItem {
  id: string;
  name: string;
  level?: string; // Optionnel : niveau textuel ("Avancé", "Opérationnel", etc.) sans faux pourcentages
  notes?: string; // Notes techniques éventuelles
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: SkillItem[];
}

export interface ProjectDetail {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  year: string;
  tools: string[];
  mainImage: string;
  // Page détaillée du projet
  context: string;
  objective: string;
  methodology: string;
  dataUsed: string[];
  softwareAndTech: string[];
  results: string;
  mapsAndScreenshots: {
    url: string;
    caption: string;
  }[];
  links?: {
    label: string;
    url: string;
  }[];
  conclusion: string;
}

export interface ExperienceItem {
  id: string;
  role: string; // Poste / fonction
  organization: string; // Organisation / entreprise
  location: string; // Lieu
  period: string; // Période
  description: string;
  missions: string[];
  skillsUsed: string[];
  documentsOrPhotos?: {
    title: string;
    url: string;
    type?: 'document' | 'photo' | 'link';
  }[];
}

export interface FieldworkItem {
  id: string;
  mission: string; // Nom de la mission
  location: string; // Localisation géographique
  date: string; // Date ou période
  objective: string; // Objectif de l'intervention terrain
  equipment: string[]; // Matériel utilisé (GPS, RTK, récepteur GNSS, QField...)
  collectionMethods: string; // Méthodes de collecte
  results: string; // Résultats obtenus
  photos: {
    url: string;
    caption: string;
  }[];
  maps?: {
    url: string;
    caption: string;
  }[];
}

export interface CartoItem {
  id: string;
  title: string;
  description: string;
  date: string;
  studyArea: string; // Zone d'étude
  softwareUsed: string[]; // Logiciels utilisés (QGIS, ArcGIS Pro, etc.)
  imageUrl: string; // Image haute résolution
  interactiveMapUrl?: string; // Lien carte interactive éventuel
  scaleOrProjection?: string; // Échelle ou système de projection
}

export interface EducationItem {
  id: string;
  degree: string; // Diplôme
  institution: string; // Établissement
  location: string; // Lieu
  period: string; // Période
  description: string;
  documents?: {
    title: string;
    url: string;
  }[];
}

export interface ContactData {
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  location?: string;
}

export interface PortfolioData {
  profile: ProfileData;
  about: AboutData;
  skills: SkillCategory[];
  projects: ProjectDetail[];
  experiences: ExperienceItem[];
  fieldwork: FieldworkItem[];
  cartography: CartoItem[];
  education: EducationItem[];
  contact: ContactData;
}

export interface ProjectClickStat {
  id: string;
  title: string;
  count: number;
  category?: string;
}

export interface DailyActivityStat {
  date: string;
  label: string;
  visits: number;
  projectClicks: number;
  cvDownloads: number;
  mapViews: number;
}

export interface CategoryStat {
  name: string;
  value: number;
  color?: string;
}

export interface AnalyticsSummary {
  totalVisits: number;
  totalProjectClicks: number;
  totalCvDownloads: number;
  totalMapViews: number;
  totalContactClicks: number;
  projectBreakdown: ProjectClickStat[];
  dailyActivity: DailyActivityStat[];
  categoryDistribution: CategoryStat[];
  lastUpdated: string;
}
