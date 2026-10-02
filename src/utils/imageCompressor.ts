/**
 * Utilitaire de compression et lecture de fichiers pour l'espace d'administration
 * - Compresse automatiquement les photos (JPEG/PNG/WebP) vers une taille optimale (~150-300KB)
 *   évitant tout ralentissement ou dépassement de payload HTTP.
 * - Lit également les documents PDF en Data URL Base64.
 */

export interface ProcessedFile {
  dataUrl: string;
  fileName: string;
  fileSize: number; // en octets
  fileType: string;
}

/**
 * Compresse une image côté client via HTML5 Canvas
 */
export async function compressImageFile(
  file: File,
  maxWidth = 1600,
  maxHeight = 1600,
  quality = 0.85
): Promise<ProcessedFile> {
  return new Promise((resolve, reject) => {
    // Si ce n'est pas une image (ex. PDF ou SVG), on le lit directement
    if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          dataUrl: reader.result as string,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
        });
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({
            dataUrl: e.target?.result as string,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
          });
          return;
        }

        // Fond blanc si image transparente convertie en JPEG
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Sortie WebP si supporté, sinon JPEG
        const outputType = 'image/jpeg';
        const compressedDataUrl = canvas.toDataURL(outputType, quality);

        resolve({
          dataUrl: compressedDataUrl,
          fileName: file.name,
          fileSize: Math.round((compressedDataUrl.length * 3) / 4),
          fileType: outputType,
        });
      };

      img.onerror = () => {
        resolve({
          dataUrl: e.target?.result as string,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
        });
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Lit un fichier PDF ou document en Data URL
 */
export async function readDocumentFile(file: File): Promise<ProcessedFile> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        dataUrl: reader.result as string,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      });
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
