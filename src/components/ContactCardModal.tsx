import React, { useState } from 'react';
import { X, QrCode, Download, Check, Copy, Phone, Mail, Linkedin, MapPin, Smartphone } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { downloadVCard } from '../utils/vcard';

interface ContactCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactCardModal: React.FC<ContactCardModalProps> = ({ isOpen, onClose }) => {
  const { data } = usePortfolio();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const fullName = data.profile.fullName || 'Nourou LY';
  const title = data.profile.title || 'Géomaticien';
  const phone = data.contact.phone || '77 670 60 35';
  const email = data.contact.email || 'lynourou12@gmail.com';
  const linkedin = data.contact.linkedin || 'https://www.linkedin.com/in/nourou-ly';
  const location = data.contact.location || 'Sénégal';

  // Format vCard text for QR Code encoding
  const cleanPhone = phone.replace(/\s+/g, '');
  const mecardContent = `MECARD:N:LY,Nourou;TEL:+221${cleanPhone};EMAIL:${email};URL:${linkedin};NOTE:Géomaticien;;`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    mecardContent
  )}&color=0f172a&bgcolor=ffffff&qzone=2`;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDownload = () => {
    downloadVCard({
      fullName,
      title,
      phone,
      email,
      linkedin,
      location,
      note: 'Géomaticien — SIG, Cartographie, Télédétection, Analyse spatiale, Foresterie',
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Fiche contact professionnelle
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                vCard &amp; QR Code pour recruteurs et partenaires
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corps modal */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
          {/* Bloc QR Code & instruction */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <div className="relative shrink-0 p-2.5 bg-white rounded-xl shadow-xs border border-slate-200/80">
              <img
                src={qrCodeUrl}
                alt="QR Code Contact Nourou LY"
                className="w-36 h-36 object-contain"
                loading="lazy"
              />
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <Smartphone className="w-3 h-3" />
                <span>Scan instantané</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                Ajoutez directement à vos contacts
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Scannez ce QR Code avec l'appareil photo de votre smartphone pour enregistrer instantanément les coordonnées complètes de <strong>{fullName}</strong>.
              </p>
            </div>
          </div>

          {/* Coordonnées détaillées */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Coordonnées directes
            </h4>

            {/* Téléphone */}
            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-[11px] text-slate-400">Téléphone</span>
                  <span className="font-mono text-slate-900 dark:text-slate-100 font-medium">
                    +221 {phone}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleCopy(`+221 ${phone}`, 'phone')}
                className="p-1.5 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Copier le numéro"
              >
                {copiedField === 'phone' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-[11px] text-slate-400">Email</span>
                  <span className="font-mono text-slate-900 dark:text-slate-100 font-medium">
                    {email}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleCopy(email, 'email')}
                className="p-1.5 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Copier l'email"
              >
                {copiedField === 'email' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* LinkedIn */}
            {linkedin && (
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <Linkedin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400">LinkedIn</span>
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium text-xs truncate max-w-[240px] block"
                    >
                      {linkedin.replace('https://', '')}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(linkedin, 'linkedin')}
                  className="p-1.5 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Copier le lien LinkedIn"
                >
                  {copiedField === 'linkedin' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}

            {/* Localisation */}
            <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm">
              <div className="w-7 h-7 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="block text-[11px] text-slate-400">Zone de disponibilité</span>
                <span className="text-slate-900 dark:text-slate-100 font-medium">
                  {location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton d'action principal */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Fermer
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Télécharger la fiche (.vcf)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
