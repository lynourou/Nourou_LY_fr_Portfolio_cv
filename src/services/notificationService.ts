/**
 * Service de notification multi-canaux (Email, Formspree, Webhook, Telegram)
 * Envoie les alertes instantanées de consultation du portfolio à Nourou LY
 */

import { NotificationConfig } from '../types/portfolio';

const VISITOR_SESSION_KEY = 'nourou_portfolio_session_notified';

export interface VisitorDetails {
  timestamp: string;
  referrer: string;
  screen: string;
  userAgent: string;
  language: string;
  eventType?: 'visit' | 'cv_download' | 'contact_click' | 'project_click';
  eventLabel?: string;
}

export async function sendNotificationEvent(
  config?: NotificationConfig,
  details?: Partial<VisitorDetails>
): Promise<boolean> {
  const visitor: VisitorDetails = {
    timestamp: new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Dakar' }),
    referrer: document.referrer || 'Accès direct',
    screen: `${window.screen.width}x${window.screen.height}`,
    userAgent: navigator.userAgent,
    language: navigator.language,
    eventType: 'visit',
    ...details,
  };

  let success = false;

  // 1. Tenter le serveur Express si actif
  try {
    const res = await fetch('/api/notify/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(visitor),
    });
    if (res.ok) success = true;
  } catch {
    // Mode statique GitHub Pages
  }

  // 2. Formspree (Envoi direct d'email instantané sans aucun backend)
  const formspreeKey = config?.formspreeId?.replace(/^https?:\/\/formspree\.io\/f?\/?/i, '').trim();
  if (formspreeKey) {
    try {
      const formspreeUrl = `https://formspree.io/f/${formspreeKey}`;
      const res = await fetch(formspreeUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          subject: `🔔 Consultation Portfolio Nourou LY (${visitor.eventType === 'visit' ? 'Nouvelle visite' : visitor.eventType})`,
          email: config?.notifyEmail || 'lynourou12@gmail.com',
          message: `Nouveau visiteur sur votre portfolio géomaticien :\n\n- Date & Heure : ${visitor.timestamp}\n- Événement : ${visitor.eventType || 'Visite'}\n- Provenance : ${visitor.referrer}\n- Résolution d'écran : ${visitor.screen}\n- Navigateur : ${visitor.userAgent}\n- Langue : ${visitor.language}`,
          ...visitor,
        }),
      });
      if (res.ok) success = true;
    } catch (e) {
      console.warn('Erreur envoi notification Formspree:', e);
    }
  }

  // 3. Webhook universel (Discord, Slack, Make, Zapier)
  if (config?.webhookUrl && config.webhookUrl.startsWith('http')) {
    try {
      const isDiscord = config.webhookUrl.includes('discord.com');
      const isSlack = config.webhookUrl.includes('slack.com');

      let payload: any = { ...visitor };

      if (isDiscord) {
        payload = {
          content: `🔔 **Alerte Visiteur - Portfolio Géomaticien Nourou LY**`,
          embeds: [
            {
              title: visitor.eventType === 'cv_download' ? '📄 Téléchargement du CV' : '👀 Nouvelle ouverture du portfolio',
              color: 0x10b981, // Emerald green
              fields: [
                { name: '📅 Date / Heure (Dakar)', value: visitor.timestamp, inline: true },
                { name: '🌐 Provenance', value: visitor.referrer, inline: true },
                { name: '📱 Écran / Format', value: visitor.screen, inline: true },
                { name: '🧭 Navigateur', value: visitor.userAgent.slice(0, 100), inline: false },
              ],
              footer: { text: 'Portfolio Professionnel · Nourou LY' },
            },
          ],
        };
      } else if (isSlack) {
        payload = {
          text: `🔔 *Nouveau visiteur sur votre portfolio Nourou LY*\n• *Date :* ${visitor.timestamp}\n• *Provenance :* ${visitor.referrer}\n• *Format :* ${visitor.screen}`,
        };
      }

      const res = await fetch(config.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) success = true;
    } catch (e) {
      console.warn('Erreur webhook:', e);
    }
  }

  // 4. Telegram Bot
  if (config?.telegramNotificationsEnabled && config.telegramBotToken && config.telegramChatId) {
    try {
      const text = encodeURIComponent(
        `🗺️ *Alerte Portfolio — Nourou LY*\n\n` +
        `📅 *Date :* ${visitor.timestamp}\n` +
        `🎯 *Action :* ${visitor.eventLabel || visitor.eventType || 'Visite'}\n` +
        `🌐 *Provenance :* ${visitor.referrer}\n` +
        `📱 *Écran :* ${visitor.screen}\n`
      );
      const res = await fetch(
        `https://api.telegram.org/bot${config.telegramBotToken}/sendMessage?chat_id=${config.telegramChatId}&text=${text}&parse_mode=Markdown`
      );
      if (res.ok) success = true;
    } catch (e) {
      console.warn('Erreur Telegram:', e);
    }
  }

  return success;
}

/**
 * Déclencheur automatique de visite (une fois par session)
 */
export async function notifyPortfolioOpened(config?: NotificationConfig): Promise<void> {
  const alreadyNotified = sessionStorage.getItem(VISITOR_SESSION_KEY);
  if (alreadyNotified) return;

  sessionStorage.setItem(VISITOR_SESSION_KEY, 'true');
  await sendNotificationEvent(config, { eventType: 'visit' });
}

/**
 * Envoie un message reçu depuis le formulaire de contact
 */
export async function sendContactMessageNotification(
  config?: NotificationConfig,
  details?: { name: string; email: string; subject: string; message: string }
): Promise<boolean> {
  if (!details) return false;

  const formspreeKey = config?.formspreeId?.replace(/^https?:\/\/formspree\.io\/f?\/?/i, '').trim();
  let dispatched = false;

  if (formspreeKey) {
    try {
      const formspreeUrl = `https://formspree.io/f/${formspreeKey}`;
      const res = await fetch(formspreeUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: details.name,
          _replyto: details.email,
          email: details.email,
          subject: `📩 [Portfolio] Message de ${details.name} : ${details.subject || 'Demande de contact'}`,
          message: details.message,
          timestamp: new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Dakar' }),
        }),
      });
      if (res.ok) dispatched = true;
    } catch (e) {
      console.warn('Erreur envoi Formspree contact :', e);
    }
  }

  // Également notifier via sendNotificationEvent (serveur / webhook discord)
  await sendNotificationEvent(config, {
    eventType: 'contact_click',
    eventLabel: `Message de ${details.name} (${details.email}) : "${details.subject}"`,
    referrer: `Formulaire de contact - ${details.name}`,
  });

  return dispatched || true;
}
