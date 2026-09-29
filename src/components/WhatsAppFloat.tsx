import { useEffect, useState } from 'react';
import { useCopy } from '@/lib/i18n';
import { waLink } from '@/lib/contact';

const COPY = {
  id: { label: 'Chat WhatsApp', text: 'Halo Kuon Studio, saya mau tanya soal AI untuk bisnis saya.' },
  en: { label: 'WhatsApp us', text: 'Hi Kuon Studio, I would like to ask about AI for my business.' },
};

/** Floating WhatsApp button; appears after the hero so it never covers the first screen. */
const WhatsAppFloat = () => {
  const c = useCopy(COPY);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <a
      href={waLink(c.text)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={c.label}
      className={`fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#141413] text-[#faf9f5] pl-3 pr-4 py-3 font-display text-sm font-semibold shadow-lg transition-all duration-200 hover:bg-[#d97757] ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" />
      </svg>
      {c.label}
    </a>
  );
};

export default WhatsAppFloat;
