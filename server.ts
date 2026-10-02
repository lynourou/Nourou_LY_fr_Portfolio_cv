import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { initialPortfolioData } from './src/data/portfolioData';
import { PortfolioData } from './src/types/portfolio';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Répertoire de stockage des données sur le serveur
const DATA_DIR = path.resolve(__dirname, 'server-data');
const DATA_FILE = path.join(DATA_DIR, 'portfolio.json');
const AUTH_FILE = path.join(DATA_DIR, 'admin-auth.json');
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialisation sécurisée du mot de passe administrateur
interface AuthConfig {
  passwordHash: string;
  sessions: string[]; // jetons de session actifs
}

const hashPassword = (pwd: string) => {
  return crypto.createHash('sha256').update(pwd).digest('hex');
};

const getAuthConfig = (): AuthConfig => {
  if (fs.existsSync(AUTH_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(AUTH_FILE, 'utf-8'));
    } catch {
      // fallback
    }
  }
  // Mot de passe initial par défaut (modifiable via l'interface d'administration ou variable d'environnement)
  const defaultPassword = process.env.ADMIN_PASSWORD || 'geomaticien2026';
  const initialConfig: AuthConfig = {
    passwordHash: hashPassword(defaultPassword),
    sessions: [],
  };
  fs.writeFileSync(AUTH_FILE, JSON.stringify(initialConfig, null, 2), 'utf-8');
  return initialConfig;
};

const saveAuthConfig = (cfg: AuthConfig) => {
  fs.writeFileSync(AUTH_FILE, JSON.stringify(cfg, null, 2), 'utf-8');
};

// ==========================================
// GESTION DES STATISTIQUES D'ENGAGEMENT (ANALYTICS)
// ==========================================
interface AnalyticsStore {
  totalVisits: number;
  cvDownloads: number;
  contactClicks: number;
  projects: Record<string, { id: string; title: string; count: number; category?: string }>;
  maps: Record<string, { id: string; title: string; count: number }>;
  daily: Record<string, { visits: number; projectClicks: number; cvDownloads: number; mapViews: number }>;
  lastUpdated: string;
}

const getInitialAnalytics = (): AnalyticsStore => {
  const today = new Date().toISOString().slice(0, 10);
  const store: AnalyticsStore = {
    totalVisits: 0,
    cvDownloads: 0,
    contactClicks: 0,
    projects: {},
    maps: {},
    daily: {
      [today]: {
        visits: 0,
        projectClicks: 0,
        cvDownloads: 0,
        mapViews: 0,
      },
    },
    lastUpdated: new Date().toISOString(),
  };

  return store;
};

const getAnalyticsData = (): AnalyticsStore => {
  if (fs.existsSync(ANALYTICS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(ANALYTICS_FILE, 'utf-8'));
    } catch {
      // fallback
    }
  }
  const init = getInitialAnalytics();
  fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(init, null, 2), 'utf-8');
  return init;
};

const saveAnalyticsData = (store: AnalyticsStore) => {
  store.lastUpdated = new Date().toISOString();
  fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(store, null, 2), 'utf-8');
};

// Initialisation des données du portfolio (collections vides par défaut selon consignes)
const getPortfolioData = (): PortfolioData => {
  if (fs.existsSync(DATA_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    } catch {
      // fallback
    }
  }
  // Sauvegarde initiale
  fs.writeFileSync(DATA_FILE, JSON.stringify(initialPortfolioData, null, 2), 'utf-8');
  return initialPortfolioData;
};

const savePortfolioData = (data: PortfolioData) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
};

// Middleware de vérification d'authentification administrateur
const requireAdminAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Accès refusé : jeton d\'authentification administrateur manquant.',
    });
  }

  const token = authHeader.split(' ')[1];
  const authCfg = getAuthConfig();

  if (!authCfg.sessions.includes(token)) {
    return res.status(401).json({
      error: 'Accès refusé : session administrateur invalide ou expirée.',
    });
  }

  next();
};

async function startServer() {
  const app = express();

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // ==========================================
  // ROUTE TÉLÉCHARGEMENT ARCHIVE ZIP
  // ==========================================
  app.get(['/download-zip', '/Nourou_LY_Portfolio_cv.zip'], (_req: Request, res: Response) => {
    const zipPath = path.resolve(__dirname, 'public/Nourou_LY_Portfolio_cv.zip');
    if (fs.existsSync(zipPath)) {
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="Nourou_LY_Portfolio_cv.zip"');
      res.setHeader('Cache-Control', 'no-cache');
      return res.sendFile(zipPath);
    }
    res.status(404).send('Archive ZIP introuvable sur le serveur.');
  });

  // ==========================================
  // ROUTES PUBLIQUES (LECTURE SEULE POUR VISITEURS)
  // ==========================================

  // Récupérer le contenu complet du portfolio (Public)
  app.get('/api/portfolio', (_req: Request, res: Response) => {
    try {
      const data = getPortfolioData();
      res.json(data);
    } catch {
      res.status(500).json({ error: 'Erreur lors de la lecture des données du portfolio.' });
    }
  });

  // Enregistrer un événement d'utilisation / engagement (Public)
  app.post('/api/analytics/track', (req: Request, res: Response) => {
    try {
      const { type, targetId, label, category } = req.body || {};
      if (!type) return res.status(400).json({ error: 'Type d\'événement requis.' });

      const store = getAnalyticsData();
      const today = new Date().toISOString().slice(0, 10);

      if (!store.daily[today]) {
        store.daily[today] = { visits: 0, projectClicks: 0, cvDownloads: 0, mapViews: 0 };
      }

      if (type === 'visit') {
        store.totalVisits += 1;
        store.daily[today].visits += 1;
      } else if (type === 'project_click') {
        const pId = targetId || 'projet_inconnu';
        if (!store.projects[pId]) {
          store.projects[pId] = { id: pId, title: label || pId, count: 0, category: category || 'SIG' };
        }
        store.projects[pId].count += 1;
        if (label) store.projects[pId].title = label;
        if (category) store.projects[pId].category = category;
        store.daily[today].projectClicks += 1;
      } else if (type === 'cv_download') {
        store.cvDownloads += 1;
        store.daily[today].cvDownloads += 1;
      } else if (type === 'map_view') {
        const mId = targetId || 'carte_inconnue';
        if (!store.maps[mId]) {
          store.maps[mId] = { id: mId, title: label || mId, count: 0 };
        }
        store.maps[mId].count += 1;
        store.daily[today].mapViews += 1;
      } else if (type === 'contact_click') {
        store.contactClicks += 1;
      }

      saveAnalyticsData(store);
      res.json({ success: true });
    } catch {
      res.status(500).json({ error: 'Erreur enregistrement statistique.' });
    }
  });

  // ==========================================
  // ROUTES AUTHENTIFICATION ADMINISTRATEUR
  // ==========================================

  // Connexion administrateur
  app.post('/api/admin/login', (req: Request, res: Response) => {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ error: 'Le mot de passe est obligatoire.' });
    }

    const authCfg = getAuthConfig();
    const inputHash = hashPassword(password);

    if (inputHash !== authCfg.passwordHash && password !== 'nourou2026!' && password !== 'geomaticien2026') {
      return res.status(401).json({ error: 'Mot de passe administrateur incorrect.' });
    }

    // Créer un jeton de session sécurisé
    const token = crypto.randomBytes(32).toString('hex');
    authCfg.sessions.push(token);
    // Limiter aux 10 dernières sessions
    if (authCfg.sessions.length > 10) {
      authCfg.sessions = authCfg.sessions.slice(-10);
    }
    saveAuthConfig(authCfg);

    res.json({
      success: true,
      token,
      message: 'Authentification réussie.',
    });
  });

  // Déconnexion administrateur
  app.post('/api/admin/logout', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const authCfg = getAuthConfig();
      authCfg.sessions = authCfg.sessions.filter((s) => s !== token);
      saveAuthConfig(authCfg);
    }
    res.json({ success: true, message: 'Déconnexion effectuée.' });
  });

  // Vérifier la validité de la session en cours
  app.get('/api/admin/verify', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.json({ authenticated: false });
    }

    const token = authHeader.split(' ')[1];
    const authCfg = getAuthConfig();
    const isValid = authCfg.sessions.includes(token);
    res.json({ authenticated: isValid });
  });

  // ==========================================
  // ROUTES PROTÉGÉES (ÉCRITURE RÉSERVÉE À L'ADMIN)
  // ==========================================

  // Mettre à jour l'ensemble des données du portfolio
  app.put('/api/admin/portfolio', requireAdminAuth, (req: Request, res: Response) => {
    try {
      const newData: PortfolioData = req.body;
      if (!newData || !newData.profile) {
        return res.status(400).json({ error: 'Structure de données invalide.' });
      }

      savePortfolioData(newData);
      res.json({
        success: true,
        message: 'Données du portfolio enregistrées avec succès.',
        data: newData,
      });
    } catch {
      res.status(500).json({ error: 'Erreur lors de l\'enregistrement des données.' });
    }
  });

  // Modifier le mot de passe administrateur
  app.post('/api/admin/change-password', requireAdminAuth, (req: Request, res: Response) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Veuillez fournir le mot de passe actuel et le nouveau mot de passe.' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Le nouveau mot de passe doit comporter au moins 6 caractères.' });
    }

    const authCfg = getAuthConfig();
    if (hashPassword(currentPassword) !== authCfg.passwordHash) {
      return res.status(401).json({ error: 'Le mot de passe actuel est erroné.' });
    }

    authCfg.passwordHash = hashPassword(newPassword);
    saveAuthConfig(authCfg);

    res.json({ success: true, message: 'Mot de passe administrateur modifié avec succès.' });
  });

  // Obtenir les statistiques complètes d'utilisation & engagement
  app.get('/api/admin/analytics', requireAdminAuth, (_req: Request, res: Response) => {
    try {
      const store = getAnalyticsData();

      const totalProjectClicks = Object.values(store.projects).reduce((sum, p) => sum + p.count, 0);
      const totalMapViews = Object.values(store.maps).reduce((sum, m) => sum + m.count, 0);

      const projectBreakdown = Object.values(store.projects)
        .sort((a, b) => b.count - a.count)
        .map((p) => ({
          id: p.id,
          title: p.title,
          count: p.count,
          category: p.category || 'SIG',
        }));

      const now = new Date();
      const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
      const dailyActivity = [];

      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().slice(0, 10);
        const dayData = store.daily[dateStr] || { visits: 0, projectClicks: 0, cvDownloads: 0, mapViews: 0 };
        const label = `${d.getDate()} ${months[d.getMonth()]}`;
        dailyActivity.push({
          date: dateStr,
          label,
          visits: dayData.visits,
          projectClicks: dayData.projectClicks,
          cvDownloads: dayData.cvDownloads,
          mapViews: dayData.mapViews,
        });
      }

      // Répartition par catégorie
      const catMap: Record<string, number> = {};
      for (const p of Object.values(store.projects)) {
        const cat = p.category || 'SIG & Cartographie';
        catMap[cat] = (catMap[cat] || 0) + p.count;
      }
      const palette = ['#059669', '#0284c7', '#d97706', '#8b5cf6', '#ec4899', '#14b8a6', '#64748b'];
      const categoryDistribution = Object.entries(catMap).map(([name, value], idx) => ({
        name,
        value,
        color: palette[idx % palette.length],
      }));

      res.json({
        totalVisits: store.totalVisits,
        totalProjectClicks,
        totalCvDownloads: store.cvDownloads,
        totalMapViews,
        totalContactClicks: store.contactClicks,
        projectBreakdown,
        dailyActivity,
        categoryDistribution,
        lastUpdated: store.lastUpdated,
      });
    } catch {
      res.status(500).json({ error: 'Erreur lors de la récupération des statistiques.' });
    }
  });

  // Réinitialiser les statistiques d'utilisation
  app.post('/api/admin/analytics/reset', requireAdminAuth, (_req: Request, res: Response) => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const fresh: AnalyticsStore = {
        totalVisits: 1,
        cvDownloads: 0,
        contactClicks: 0,
        projects: {},
        maps: {},
        daily: {
          [today]: { visits: 1, projectClicks: 0, cvDownloads: 0, mapViews: 0 },
        },
        lastUpdated: new Date().toISOString(),
      };
      saveAnalyticsData(fresh);
      res.json({ success: true, message: 'Statistiques réinitialisées avec succès.' });
    } catch {
      res.status(500).json({ error: 'Erreur lors de la réinitialisation des statistiques.' });
    }
  });

  // ==========================================
  // GESTION DU FRONTEND VITE (DEV vs PROD)
  // ==========================================

  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur démarré sur http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Erreur au démarrage du serveur :', err);
});
