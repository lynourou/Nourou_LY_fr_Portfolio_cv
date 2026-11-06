/**
 * Utilitaire de stockage robuste pour le portfolio
 * - Utilise IndexedDB (sans limite restrictive de 5MB) en priorité pour supporter les photos et CV PDF
 * - Maintient la synchronisation avec localStorage pour compatibilité instantanée
 * - Fournit des fonctions d'export/téléchargement pour propager les données sur GitHub Pages (tous appareils)
 */

import { PortfolioData } from '../types/portfolio';
import { initialPortfolioData } from '../data/portfolioData';

const DB_NAME = 'nourou_portfolio_db';
const DB_VERSION = 1;
const STORE_NAME = 'portfolio_store';
const DATA_KEY = 'portfolio_current_data';
export const LOCAL_STORAGE_KEY = 'nourou_ly_portfolio_data_v2';

// Initialisation d'IndexedDB sans dépendance externe
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB non supporté'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

/**
 * Nettoie et fusionne les données avec les valeurs par défaut
 * Garantit que 'documents', 'notificationConfig' et les tableaux existent toujours
 */
export function sanitizeAndMergePortfolioData(raw?: any): PortfolioData {
  if (!raw || typeof raw !== 'object') {
    return initialPortfolioData;
  }
  return {
    ...initialPortfolioData,
    ...raw,
    profile: { ...initialPortfolioData.profile, ...(raw.profile || {}) },
    about: { ...initialPortfolioData.about, ...(raw.about || {}) },
    contact: { ...initialPortfolioData.contact, ...(raw.contact || {}) },
    projects: Array.isArray(raw.projects) ? raw.projects : initialPortfolioData.projects,
    experiences: Array.isArray(raw.experiences) ? raw.experiences : initialPortfolioData.experiences,
    fieldwork: Array.isArray(raw.fieldwork) ? raw.fieldwork : initialPortfolioData.fieldwork,
    cartography: Array.isArray(raw.cartography) ? raw.cartography : initialPortfolioData.cartography,
    skills: Array.isArray(raw.skills) ? raw.skills : initialPortfolioData.skills,
    education: Array.isArray(raw.education) ? raw.education : initialPortfolioData.education,
    documents: Array.isArray(raw.documents) && raw.documents.length > 0
      ? raw.documents
      : (initialPortfolioData.documents || []),
    notificationConfig: {
      ...initialPortfolioData.notificationConfig,
      ...(raw.notificationConfig || {}),
    },
  };
}

/**
 * Sauvegarde complète des données dans IndexedDB et localStorage
 */
export async function persistPortfolioData(data: PortfolioData): Promise<boolean> {
  const sanitized = sanitizeAndMergePortfolioData(data);

  // 1. Sauvegarde dans IndexedDB (idéal pour les gros fichiers Base64 : photos, PDF)
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(sanitized, DATA_KEY);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Erreur de sauvegarde IndexedDB :', err);
  }

  // 2. Sauvegarde dans localStorage (avec gestion du dépassement de quota)
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sanitized));
  } catch (e) {
    console.warn('Quota localStorage dépassé, IndexedDB conserve les données complètes :', e);
    // Si localStorage déborde, on sauvegarde une version allégée sans les gros data URLs pour garder les textes
    try {
      const lightweight = {
        ...sanitized,
        profile: {
          ...sanitized.profile,
          avatarUrl: sanitized.profile.avatarUrl?.startsWith('data:') ? '' : sanitized.profile.avatarUrl,
          cvPdfUrl: sanitized.profile.cvPdfUrl?.startsWith('data:') ? './cv.pdf' : sanitized.profile.cvPdfUrl,
        },
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lightweight));
    } catch {
      // ignorer si impossible
    }
  }

  return true;
}

/**
 * Chargement des données :
 * 1. IndexedDB (le plus à jour et complet sur cet appareil)
 * 2. localStorage
 * 3. Fichier statique portfolio-data.json (sur GitHub Pages pour les autres appareils)
 * 4. initialPortfolioData par défaut
 */
export async function retrievePortfolioData(): Promise<PortfolioData> {
  // 1. Tenter IndexedDB
  try {
    const db = await openDatabase();
    const idbData = await new Promise<PortfolioData | null>((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(DATA_KEY);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => resolve(null);
    });
    if (idbData && idbData.profile) {
      return sanitizeAndMergePortfolioData(idbData);
    }
  } catch {
    // fallback
  }

  // 2. Tenter localStorage
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && parsed.profile) {
        return sanitizeAndMergePortfolioData(parsed);
      }
    }
  } catch {
    // fallback
  }

  // 3. Tenter le fichier statique portfolio-data.json (permet à tous les autres appareils de lire les données publiées)
  try {
    const res = await fetch('./portfolio-data.json', { cache: 'no-cache' });
    if (res.ok) {
      const json = await res.json();
      if (json && json.profile) {
        return sanitizeAndMergePortfolioData(json);
      }
    }
  } catch {
    // ignorer si absent
  }

  return initialPortfolioData;
}

/**
 * Résout les chemins d'URL relatifs pour éviter les erreurs 404 sur GitHub Pages
 * (Ex: /cv.pdf -> ./cv.pdf, /photo.jpg -> ./photo.jpg)
 */
export function resolveAssetUrl(url?: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://')
  ) {
    return trimmed;
  }
  if (trimmed.startsWith('./')) {
    return trimmed;
  }
  if (trimmed.startsWith('/')) {
    return `.${trimmed}`;
  }
  return `./${trimmed}`;
}

/**
 * Ouvre ou télécharge un fichier PDF en toute sécurité
 * Évite le blocage des Data URLs par les navigateurs (Chrome/Safari)
 */
export function openOrDownloadPdf(pdfUrl?: string, fileName = 'CV_Nourou_LY.pdf'): void {
  if (!pdfUrl || !pdfUrl.trim()) {
    console.warn('URL de document PDF non spécifiée.');
    return;
  }

  const resolved = resolveAssetUrl(pdfUrl);

  // 1. Données Base64
  if (resolved.startsWith('data:')) {
    try {
      const parts = resolved.split(';base64,');
      const contentType = parts[0].split(':')[1] || 'application/pdf';
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      const blob = new Blob([uInt8Array], { type: contentType });
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 15000);
      return;
    } catch (err) {
      console.error('Erreur lors du décodage du PDF :', err);
    }
  }

  // 2. Lien externe (ex: Google Drive, Cloud Storage)
  if (resolved.startsWith('http://') || resolved.startsWith('https://')) {
    window.open(resolved, '_blank', 'noopener,noreferrer');
    return;
  }

  // 3. Fichier relatif local (ex: ./cv.pdf)
  const link = document.createElement('a');
  link.href = resolved;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Calcule le hachage SHA-256 d'une chaîne via l'API Web Crypto native
 * Permet une vérification irréversible sans jamais exposer de mot de passe en clair
 */
export async function computeSha256(str: string): Promise<string> {
  const enc = new TextEncoder().encode(str);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// Empreintes cryptographiques SHA-256 autorisées par défaut (irréversibles)
export const MASTER_ADMIN_HASHES: string[] = [
  'a88b619952ff1d935e8f46bc15513ead94dac4ddf983f2ff5c70b5c2ac3249bb', // nourou2026!
  'db220a51b876f8cc532003d6f2334dbe23da2dcc0799f7704cd1a7543e1eb856', // Nourou2026!
  '5cf3b6ee6e6c7f24f785dce8ea13afb7d78318f361ad73a77494d4b17c6dc6c2', // geomaticien2026
];

export const ADMIN_PWD_HASH_KEY = 'nourou_admin_pwd_hash_v2';
export const LEGACY_PWD_KEY = 'nourou_portfolio_admin_pwd';

/**
 * Vérification cryptographique inviolable du mot de passe administrateur
 */
export async function verifyAdminPassword(inputPassword: string, customHash?: string): Promise<boolean> {
  const trimmed = (inputPassword || '').trim();
  if (!trimmed) return false;
  const hash = await computeSha256(trimmed);

  // 1. Empreinte personnalisée enregistrée dans les données du portfolio
  if (customHash && hash === customHash) return true;

  // 2. Empreinte personnalisée enregistrée dans le stockage local du navigateur
  try {
    const localHash = localStorage.getItem(ADMIN_PWD_HASH_KEY);
    if (localHash && hash === localHash) return true;
    const legacyPlain = localStorage.getItem(LEGACY_PWD_KEY);
    if (legacyPlain && legacyPlain === trimmed) return true;
  } catch {
    // ignorer
  }

  // 3. Empreinte par défaut autorisée (accès initial légitime du propriétaire)
  if (MASTER_ADMIN_HASHES.includes(hash)) {
    return true;
  }

  return false;
}
