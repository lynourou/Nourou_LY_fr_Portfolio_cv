import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { FileText, Download, X } from 'lucide-react';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const { data, trackEvent } = usePortfolio();

  if (!isOpen) return null;

  const handleDownload = () => {
    trackEvent('cv_download', 'cv', 'Téléchargement CV PDF');
    window.open(data.profile.cvPdfUrl || '/cv.pdf', '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Curriculum Vitae (PDF)
              </h3>
              <p className="text-xs text-slate-500">
                Profil professionnel de géomaticien
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            Vous pouvez télécharger ou consulter le curriculum vitae au format PDF détaillant les compétences, formations et réalisations cartographiques.
          </p>

          <button
            onClick={handleDownload}
            className="w-full py-3 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Ouvrir / Télécharger le CV (PDF)</span>
          </button>
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
