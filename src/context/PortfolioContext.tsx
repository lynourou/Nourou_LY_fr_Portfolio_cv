import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  PortfolioData,
  ProfileData,
  AboutData,
  SkillCategory,
  ProjectDetail,
  ExperienceItem,
  FieldworkItem,
  CartoItem,
  EducationItem,
  ContactData,
  AnalyticsSummary,
} from '../types/portfolio';
import { initialPortfolioData } from '../data/portfolioData';

interface PortfolioContextType {
  data: PortfolioData;
  isLoading: boolean;
  isAdmin: boolean;
  adminToken: string | null;
  // Fonctions d'authentification
  login: (password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<boolean>;
  changeAdminPassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  // Sauvegarde globale sécurisée (réservée à l'administrateur authentifié)
  savePortfolio: (newData: PortfolioData) => Promise<{ success: boolean; error?: string }>;
  // Fonctions de mise à jour pour l'espace administration
  updateProfile: (profile: ProfileData) => Promise<boolean>;
  updateAbout: (about: AboutData) => Promise<boolean>;
  updateProfileAndAbout: (profile: ProfileData, about: AboutData) => Promise<{ success: boolean; error?: string }>;
  updateContact: (contact: ContactData) => Promise<boolean>;
  // Projets
  saveProject: (project: ProjectDetail) => Promise<boolean>;
  deleteProject: (projectId: string) => Promise<boolean>;
  // Expériences
  saveExperience: (experience: ExperienceItem) => Promise<boolean>;
  deleteExperience: (experienceId: string) => Promise<boolean>;
  // Terrain
  saveFieldwork: (fieldwork: FieldworkItem) => Promise<boolean>;
  deleteFieldwork: (fieldworkId: string) => Promise<boolean>;
  // Cartes
  saveCarto: (carto: CartoItem) => Promise<boolean>;
  deleteCarto: (cartoId: string) => Promise<boolean>;
  // Compétences
  saveSkills: (skills: SkillCategory[]) => Promise<boolean>;
  // Formation
  saveEducation: (education: EducationItem) => Promise<boolean>;
  deleteEducation: (educationId: string) => Promise<boolean>;
  // Statistiques d'utilisation & engagement
  trackEvent: (type: string, targetId?: string, label?: string, category?: string) => Promise<void>;
  getAnalytics: () => Promise<AnalyticsSummary | null>;
  resetAnalytics: () => Promise<boolean>;
  // Recharger les données publiques
  refreshData: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const ADMIN_TOKEN_KEY = 'geomaticien_admin_token';
const PORTFOLIO_STORAGE_KEY = 'geomaticien_portfolio_data';
const ADMIN_PWD_KEY = 'geomaticien_admin_password';
const ANALYTICS_STORAGE_KEY = 'geomaticien_analytics_store';

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    // Initialiser avec les données en cache local si présentes
    try {
      const cached = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {
      // ignorer
    }
    return initialPortfolioData;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return sessionStorage.getItem(ADMIN_TOKEN_KEY) || localStorage.getItem(ADMIN_TOKEN_KEY);
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const token = sessionStorage.getItem(ADMIN_TOKEN_KEY) || localStorage.getItem(ADMIN_TOKEN_KEY);
    return !!token;
  });

  // Charger les données du portfolio (depuis l'API ou fallback localStorage)
  const refreshData = useCallback(async () => {
    try {
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const json = await res.json();
        setData(json);
        try {
          localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(json));
        } catch {
          // ignorer
        }
      } else {
        // En mode statique (GitHub Pages), utiliser le cache local si disponible
        const cached = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
        if (cached) {
          setData(JSON.parse(cached));
        }
      }
    } catch {
      const cached = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
      if (cached) {
        try {
          setData(JSON.parse(cached));
        } catch {
          setData(initialPortfolioData);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Vérifier la validité du token admin au démarrage
  const checkAuthStatus = useCallback(async (): Promise<boolean> => {
    const token = sessionStorage.getItem(ADMIN_TOKEN_KEY) || localStorage.getItem(ADMIN_TOKEN_KEY);
    if (!token) {
      setIsAdmin(false);
      setAdminToken(null);
      return false;
    }

    // Si token statique (GitHub Pages), valider directement
    if (token.startsWith('static-admin-')) {
      setIsAdmin(true);
      setAdminToken(token);
      return true;
    }

    try {
      const res = await fetch('/api/admin/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.authenticated) {
          setIsAdmin(true);
          setAdminToken(token);
          return true;
        }
      }
      // Si 401 explicite du serveur
      if (res.status === 401) {
        sessionStorage.removeItem(ADMIN_TOKEN_KEY);
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        setIsAdmin(false);
        setAdminToken(null);
        return false;
      }
      // Si 404 (serveur absent / GitHub Pages)
      setIsAdmin(true);
      setAdminToken(token);
      return true;
    } catch {
      // Erreur réseau ou mode statique : conserver la session
      setIsAdmin(true);
      setAdminToken(token);
      return true;
    }
  }, []);

  useEffect(() => {
    refreshData();
    checkAuthStatus();
  }, [refreshData, checkAuthStatus]);

  // Connexion administrateur hybride (Serveur avec repli autonome GitHub Pages)
  const login = async (password: string): Promise<{ success: boolean; error?: string }> => {
    // 1. Tenter l'API serveur si elle répond
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.token) {
          localStorage.setItem(ADMIN_TOKEN_KEY, json.token);
          sessionStorage.setItem(ADMIN_TOKEN_KEY, json.token);
          setAdminToken(json.token);
          setIsAdmin(true);
          return { success: true };
        }
      } else if (res.status === 401) {
        const json = await res.json().catch(() => ({}));
        return { success: false, error: json.error || 'Mot de passe incorrect.' };
      }
    } catch {
      // Le serveur n'est pas actif (hébergement statique GitHub Pages)
    }

    // 2. Mode autonome sécurisé (GitHub Pages)
    const validPassword = localStorage.getItem(ADMIN_PWD_KEY) || 'nourou2026!';
    if (password === validPassword) {
      const staticToken = 'static-admin-' + Date.now() + '-' + Math.random().toString(36).substring(2);
      localStorage.setItem(ADMIN_TOKEN_KEY, staticToken);
      sessionStorage.setItem(ADMIN_TOKEN_KEY, staticToken);
      setAdminToken(staticToken);
      setIsAdmin(true);
      return { success: true };
    }

    return { success: false, error: 'Mot de passe incorrect.' };
  };

  // Déconnexion administrateur
  const logout = async () => {
    if (adminToken && !adminToken.startsWith('static-admin-')) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${adminToken}` },
        });
      } catch {
        // ignorer
      }
    }
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setAdminToken(null);
    setIsAdmin(false);
  };

  // Modifier le mot de passe administrateur
  const changeAdminPassword = async (currentPassword: string, newPassword: string) => {
    const validPassword = localStorage.getItem(ADMIN_PWD_KEY) || 'nourou2026!';
    if (currentPassword !== validPassword) {
      return { success: false, error: 'Mot de passe actuel incorrect.' };
    }

    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: 'Le nouveau mot de passe doit comporter au moins 6 caractères.' };
    }

    localStorage.setItem(ADMIN_PWD_KEY, newPassword);

    if (adminToken && !adminToken.startsWith('static-admin-')) {
      try {
        await fetch('/api/admin/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        });
      } catch {
        // ignorer
      }
    }

    return { success: true };
  };

  // Sauvegarder les données de façon sécurisée (Serveur + Cache local synchrone)
  const savePortfolio = async (newData: PortfolioData): Promise<{ success: boolean; error?: string }> => {
    if (!adminToken) {
      return { success: false, error: 'Accès refusé : session administrateur requise.' };
    }

    // Toujours persister immédiatement en cache local pour garantir la pérennité
    try {
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.warn('Impossible de sauvegarder dans le localStorage :', e);
    }
    setData(newData);

    // Si serveur présent, synchroniser avec le backend
    if (!adminToken.startsWith('static-admin-')) {
      try {
        const res = await fetch('/api/admin/portfolio', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify(newData),
        });

        if (res.ok) {
          return { success: true };
        } else if (res.status === 401) {
          setIsAdmin(false);
          setAdminToken(null);
          return { success: false, error: 'Session expirée. Veuillez vous reconnecter.' };
        }
      } catch {
        // Mode déconnecté / GitHub Pages : la sauvegarde locale a déjà réussi
      }
    }

    return { success: true };
  };

  // Fonctions pratiques pour l'espace admin
  const updateProfile = async (profile: ProfileData) => {
    const updated = { ...data, profile };
    const res = await savePortfolio(updated);
    return res.success;
  };

  const updateAbout = async (about: AboutData) => {
    const updated = { ...data, about };
    const res = await savePortfolio(updated);
    return res.success;
  };

  const updateProfileAndAbout = async (profile: ProfileData, about: AboutData) => {
    const updated = { ...data, profile, about };
    const res = await savePortfolio(updated);
    return res;
  };

  const updateContact = async (contact: ContactData) => {
    const updated = { ...data, contact };
    const res = await savePortfolio(updated);
    return res.success;
  };

  const saveProject = async (project: ProjectDetail) => {
    const exists = data.projects.some((p) => p.id === project.id);
    const projects = exists
      ? data.projects.map((p) => (p.id === project.id ? project : p))
      : [project, ...data.projects];
    const res = await savePortfolio({ ...data, projects });
    return res.success;
  };

  const deleteProject = async (projectId: string) => {
    const projects = data.projects.filter((p) => p.id !== projectId);
    const res = await savePortfolio({ ...data, projects });
    return res.success;
  };

  const saveExperience = async (experience: ExperienceItem) => {
    const exists = data.experiences.some((e) => e.id === experience.id);
    const experiences = exists
      ? data.experiences.map((e) => (e.id === experience.id ? experience : e))
      : [experience, ...data.experiences];
    const res = await savePortfolio({ ...data, experiences });
    return res.success;
  };

  const deleteExperience = async (experienceId: string) => {
    const experiences = data.experiences.filter((e) => e.id !== experienceId);
    const res = await savePortfolio({ ...data, experiences });
    return res.success;
  };

  const saveFieldwork = async (fieldwork: FieldworkItem) => {
    const exists = data.fieldwork.some((f) => f.id === fieldwork.id);
    const fieldworkList = exists
      ? data.fieldwork.map((f) => (f.id === fieldwork.id ? fieldwork : f))
      : [fieldwork, ...data.fieldwork];
    const res = await savePortfolio({ ...data, fieldwork: fieldworkList });
    return res.success;
  };

  const deleteFieldwork = async (fieldworkId: string) => {
    const fieldwork = data.fieldwork.filter((f) => f.id !== fieldworkId);
    const res = await savePortfolio({ ...data, fieldwork });
    return res.success;
  };

  const saveCarto = async (carto: CartoItem) => {
    const exists = data.cartography.some((c) => c.id === carto.id);
    const cartography = exists
      ? data.cartography.map((c) => (c.id === carto.id ? carto : c))
      : [carto, ...data.cartography];
    const res = await savePortfolio({ ...data, cartography });
    return res.success;
  };

  const deleteCarto = async (cartoId: string) => {
    const cartography = data.cartography.filter((c) => c.id !== cartoId);
    const res = await savePortfolio({ ...data, cartography });
    return res.success;
  };

  const saveSkills = async (skills: SkillCategory[]) => {
    const res = await savePortfolio({ ...data, skills });
    return res.success;
  };

  const saveEducation = async (education: EducationItem) => {
    const exists = data.education.some((e) => e.id === education.id);
    const educationList = exists
      ? data.education.map((e) => (e.id === education.id ? education : e))
      : [education, ...data.education];
    const res = await savePortfolio({ ...data, education: educationList });
    return res.success;
  };

  const deleteEducation = async (educationId: string) => {
    const education = data.education.filter((e) => e.id !== educationId);
    const res = await savePortfolio({ ...data, education });
    return res.success;
  };

  // Suivi anonyme d'engagement & consultation (Serveur avec fallback local)
  const trackEvent = useCallback(async (type: string, targetId?: string, label?: string, category?: string) => {
    // 1. Mise à jour du stockage local d'analytics
    try {
      const today = new Date().toISOString().slice(0, 10);
      const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
      const store = raw ? JSON.parse(raw) : {
        totalVisits: 1,
        cvDownloads: 0,
        contactClicks: 0,
        projects: {},
        maps: {},
        daily: { [today]: { visits: 1, projectClicks: 0, cvDownloads: 0, mapViews: 0 } },
        lastUpdated: new Date().toISOString(),
      };

      if (!store.daily[today]) {
        store.daily[today] = { visits: 0, projectClicks: 0, cvDownloads: 0, mapViews: 0 };
      }

      if (type === 'visit') {
        store.totalVisits = (store.totalVisits || 0) + 1;
        store.daily[today].visits = (store.daily[today].visits || 0) + 1;
      } else if (type === 'cv_download') {
        store.cvDownloads = (store.cvDownloads || 0) + 1;
        store.daily[today].cvDownloads = (store.daily[today].cvDownloads || 0) + 1;
      } else if (type === 'contact_click') {
        store.contactClicks = (store.contactClicks || 0) + 1;
      } else if (type === 'project_view' && targetId) {
        store.projects[targetId] = (store.projects[targetId] || 0) + 1;
        store.daily[today].projectClicks = (store.daily[today].projectClicks || 0) + 1;
      } else if (type === 'map_view' && targetId) {
        store.maps[targetId] = (store.maps[targetId] || 0) + 1;
        store.daily[today].mapViews = (store.daily[today].mapViews || 0) + 1;
      }
      store.lastUpdated = new Date().toISOString();
      localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(store));
    } catch {
      // ignorer
    }

    // 2. Synchronisation serveur si actif
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, targetId, label, category }),
      });
    } catch {
      // Ignorer si hébergement statique
    }
  }, []);

  // Récupération des statistiques pour le tableau de bord (Serveur ou local)
  const getAnalytics = useCallback(async (): Promise<AnalyticsSummary | null> => {
    const token = sessionStorage.getItem(ADMIN_TOKEN_KEY) || localStorage.getItem(ADMIN_TOKEN_KEY);
    if (!token) return null;

    if (!token.startsWith('static-admin-')) {
      try {
        const res = await fetch('/api/admin/analytics', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          return await res.json();
        }
      } catch {
        // Fallback local ci-dessous
      }
    }

    // Générer le résumé depuis le stockage local (GitHub Pages)
    try {
      const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
      if (raw) {
        const store = JSON.parse(raw);
        const topProjects = Object.entries(store.projects || {}).map(([id, views]) => {
          const p = data.projects.find((item) => item.id === id);
          return { id, title: p ? p.title : id, views: Number(views) };
        }).sort((a, b) => b.views - a.views);

        const topMaps = Object.entries(store.maps || {}).map(([id, views]) => {
          const m = data.cartography.find((item) => item.id === id);
          return { id, title: m ? m.title : id, views: Number(views) };
        }).sort((a, b) => b.views - a.views);

        const dailyTimeline = Object.entries(store.daily || {}).map(([date, d]: [string, any]) => ({
          date,
          visits: d.visits || 0,
          projectClicks: d.projectClicks || 0,
          cvDownloads: d.cvDownloads || 0,
          mapViews: d.mapViews || 0,
        })).sort((a, b) => a.date.localeCompare(b.date));

        return {
          totalVisits: store.totalVisits || 1,
          cvDownloads: store.cvDownloads || 0,
          contactClicks: store.contactClicks || 0,
          topProjects,
          topMaps,
          dailyTimeline,
          lastUpdated: store.lastUpdated || new Date().toISOString(),
        };
      }
    } catch {
      // ignorer
    }

    return {
      totalVisits: 1,
      cvDownloads: 0,
      contactClicks: 0,
      topProjects: [],
      topMaps: [],
      dailyTimeline: [{
        date: new Date().toISOString().slice(0, 10),
        visits: 1,
        projectClicks: 0,
        cvDownloads: 0,
        mapViews: 0,
      }],
      lastUpdated: new Date().toISOString(),
    };
  }, [data.projects, data.cartography]);

  // Réinitialiser les statistiques
  const resetAnalytics = useCallback(async (): Promise<boolean> => {
    const token = sessionStorage.getItem(ADMIN_TOKEN_KEY) || localStorage.getItem(ADMIN_TOKEN_KEY);
    if (!token) return false;

    localStorage.removeItem(ANALYTICS_STORAGE_KEY);

    if (!token.startsWith('static-admin-')) {
      try {
        const res = await fetch('/api/admin/analytics/reset', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
        return res.ok;
      } catch {
        // Fallback local réussi
      }
    }
    return true;
  }, []);

  // Enregistrer automatiquement la visite de session une seule fois
  useEffect(() => {
    if (!sessionStorage.getItem('session_visited_geomaticien')) {
      sessionStorage.setItem('session_visited_geomaticien', '1');
      trackEvent('visit');
    }
  }, [trackEvent]);

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isLoading,
        isAdmin,
        adminToken,
        login,
        logout,
        checkAuthStatus,
        changeAdminPassword,
        savePortfolio,
        updateProfile,
        updateAbout,
        updateProfileAndAbout,
        updateContact,
        saveProject,
        deleteProject,
        saveExperience,
        deleteExperience,
        saveFieldwork,
        deleteFieldwork,
        saveCarto,
        deleteCarto,
        saveSkills,
        saveEducation,
        deleteEducation,
        trackEvent,
        getAnalytics,
        resetAnalytics,
        refreshData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio doit être utilisé au sein d\'un PortfolioProvider');
  }
  return context;
};
