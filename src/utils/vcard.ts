/**
 * Générateur et téléchargeur de fiche vCard (.vcf)
 * pour recruteurs et contacts professionnels
 */

export interface VCardData {
  fullName: string;
  title: string;
  phone: string;
  email: string;
  linkedin?: string;
  location?: string;
  note?: string;
}

export function generateVCardString(data: VCardData): string {
  const cleanPhone = data.phone.replace(/\s+/g, '');
  const phoneFormatted = cleanPhone.startsWith('+') ? cleanPhone : `+221${cleanPhone}`;

  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${data.fullName}`,
    'N:LY;Nourou;;;',
    `TITLE:${data.title}`,
    `TEL;TYPE=CELL,VOICE:${phoneFormatted}`,
    `EMAIL;TYPE=PREF,INTERNET:${data.email}`,
    data.linkedin ? `URL:${data.linkedin}` : '',
    data.location ? `ADR;TYPE=WORK:;;${data.location};;;;` : '',
    `NOTE:${data.note || 'Géomaticien — SIG, Cartographie, Télédétection, Analyse spatiale'}`,
    'END:VCARD',
  ]
    .filter(Boolean)
    .join('\r\n');
}

export function downloadVCard(data: VCardData): void {
  const vcardText = generateVCardString(data);
  const blob = new Blob([vcardText], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${data.fullName.toLowerCase().replace(/\s+/g, '_')}_contact.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
