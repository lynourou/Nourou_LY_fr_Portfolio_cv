import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { compressImageFile, readDocumentFile } from '../../utils/imageCompressor';

interface FileInputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  accept?: string;
  placeholder?: string;
  isImage?: boolean;
  helperText?: string;
}

export const FileInputField: React.FC<FileInputFieldProps> = ({
  label,
  value,
  onChange,
  accept = 'image/jpeg,image/png,image/webp,image/avif',
  placeholder = 'Ou collez une URL directe (https://...)',
  isImage = true,
  helperText,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSizeStr, setFileSizeStr] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      if (isImage && file.type.startsWith('image/')) {
        const processed = await compressImageFile(file, 1600, 1600, 0.85);
        onChange(processed.dataUrl);
        setFileName(processed.fileName);
        const kb = Math.round(processed.fileSize / 1024);
        setFileSizeStr(`${kb} Ko`);
      } else {
        const processed = await readDocumentFile(file);
        onChange(processed.dataUrl);
        setFileName(processed.fileName);
        const kb = Math.round(processed.fileSize / 1024);
        setFileSizeStr(`${kb} Ko`);
      }
    } catch (err) {
      console.error('Erreur lors du traitement du fichier :', err);
    } finally {
      setIsProcessing(false);
      // Reset input value to allow selecting the same file again
      e.target.value = '';
    }
  };

  const handleClear = () => {
    onChange('');
    setFileName(null);
    setFileSizeStr(null);
  };

  const isDataUrl = value && value.startsWith('data:');
  const isPdf = value && (value.includes('.pdf') || value.startsWith('data:application/pdf'));

  return (
    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-800">
          {label}
        </label>
        {helperText && (
          <span className="text-[11px] text-slate-500 font-mono">
            {helperText}
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Aperçu du fichier */}
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-slate-300 flex items-center justify-center shrink-0 shadow-2xs">
          {isProcessing ? (
            <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
          ) : value ? (
            isImage && !isPdf ? (
              <img
                src={value}
                alt="Aperçu"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-600 p-1 text-center">
                <FileText className="w-7 h-7 text-emerald-600" />
                <span className="text-[9px] font-mono mt-1 text-slate-500">PDF</span>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400">
              {isImage ? <ImageIcon className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
              <span className="text-[9px] text-slate-400 mt-1">Vide</span>
            </div>
          )}
        </div>

        {/* Boutons d'action et saisie */}
        <div className="flex-1 space-y-2 w-full">
          <div className="flex flex-wrap items-center gap-2">
            <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs">
              {isProcessing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                  <span>Traitement en cours...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Choisir un fichier depuis cet appareil</span>
                </>
              )}
              <input
                type="file"
                accept={accept}
                disabled={isProcessing}
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Supprimer</span>
              </button>
            )}

            {value && fileSizeStr && (
              <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-50 text-emerald-800 text-[11px] font-mono border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{fileSizeStr}</span>
              </div>
            )}
          </div>

          <div>
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white font-mono text-slate-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
