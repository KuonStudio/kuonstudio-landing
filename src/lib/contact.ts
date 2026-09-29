export const WHATSAPP_NUMBER = '62818833831';
export const WHATSAPP_DISPLAY = '+62 818-833-831';
export const EMAIL = 'social@kuonstudio.com';

/** wa.me link with a prefilled message. */
export function waLink(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
