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
const LOCAL_STORAGE_KEY = 'nourou_ly_portfolio_data_v2';

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
 * Sauvegarde complète des données dans IndexedDB et localStorage
 */
export async function persistPortfolioData(data: PortfolioData): Promise<boolean> {
  // 1. Sauvegarde dans IndexedDB (idéal pour les gros fichiers Base64 : photos, PDF)
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(data, DATA_KEY);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Erreur de sauvegarde IndexedDB :', err);
  }

  // 2. Sauvegarde dans localStorage (avec gestion du dépassement de quota)
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Quota localStorage dépassé, IndexedDB conserve les données complètes :', e);
    // Si localStorage déborde, on sauvegarde une version allégée sans les gros data URLs pour garder les textes
    try {
      const lightweight = {
        ...data,
        profile: {
          ...data.profile,
          avatarUrl: data.profile.avatarUrl?.startsWith('data:') ? '' : data.profile.avatarUrl,
          cvPdfUrl: data.profile.cvPdfUrl?.startsWith('data:') ? './cv.pdf' : data.profile.cvPdfUrl,
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
      return idbData;
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
        return parsed;
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
        return json;
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
export function openOrDownloadPdf(pdfUrl: string, fileName = 'CV_Nourou_LY.pdf'): void {
  const resolved = resolveAssetUrl(pdfUrl);

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

  // Si URL standard ou relative
  const link = document.createElement('a');
  link.href = resolved;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
