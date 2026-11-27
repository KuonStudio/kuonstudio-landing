import { useState } from 'react';
import { useCopy } from '@/lib/i18n';
import { EMAIL, WHATSAPP_DISPLAY, waLink } from '@/lib/contact';

const COPY = {
  id: {
    eyebrow: 'Kontak',
    title: 'Pekerjaan apa yang masih sering timmu ulang?',
    body: 'Ceritakan satu contoh dan alat yang dipakai timmu sekarang. Kalau cocok, kita sepakati biaya tetap untuk uji coba dua minggu. Di akhir uji coba, kita bandingkan waktu pengerjaan dan jumlah kesalahan sebelum kamu memutuskan lanjut.',
    wa: 'Chat WhatsApp',
    waText: 'Halo Kuon Studio, saya mau diskusi soal AI untuk bisnis saya.',
    list: [`WhatsApp: ${WHATSAPP_DISPLAY}`, `Email: ${EMAIL}`, 'Berbasis di Jakarta, bekerja jarak jauh untuk seluruh Indonesia.', 'Harga tetap setelah lingkup kerja disepakati.'],
    name: 'Nama',
    namePh: 'Nama kamu',
    email: 'Email kerja',
    emailHint: 'Hanya dipakai untuk membalas.',
    details: 'Pekerjaan yang mau diotomasi',
    detailsPh: 'Contoh: setiap hari kami membalas 50 chat pesanan dan merekapnya ke spreadsheet.',
    send: 'Kirim lewat email',
    sendHint: `Membuka aplikasi email ke ${EMAIL}.`,
    subject: (n: string) => `Pertanyaan proyek dari ${n}`,
  },
  en: {
    eyebrow: 'Contact',
    title: 'What’s one task your team keeps doing by hand?',
    body: 'Send us an example and tell us which tools you use. If it’s a good fit, we’ll agree on a fixed price for a two-week pilot. Together we’ll compare completion times and errors before you decide whether to continue.',
    wa: 'Chat on WhatsApp',
    waText: 'Hi Kuon Studio, I would like to discuss AI for my business.',
    list: [`WhatsApp: ${WHATSAPP_DISPLAY}`, `Email: ${EMAIL}`, 'Based in Jakarta, working remotely across Indonesia.', 'Fixed price once the scope is agreed.'],
    name: 'Your name',
    namePh: 'Name',
    email: 'Work email',
    emailHint: 'Only used to reply to you.',
    details: 'Work you want to automate',
    detailsPh: 'Example: every day we answer 50 order chats and copy them into a spreadsheet.',
    send: 'Send by email',
    sendHint: `Opens your email app addressed to ${EMAIL}.`,
    subject: (n: string) => `Project inquiry from ${n}`,
  },
};

const AccessSection = () => {
  const c = useCopy(COPY);
  const [formData, setFormData] = useState({ name: '', email: '', details: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(c.subject(formData.name));
    const body = encodeURIComponent(`${c.name}: ${formData.name}\nEmail: ${formData.email}\n\n${c.details}:\n${formData.details}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white border-t border-[#e8e6dc]">
      <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 className="mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413]">{c.title}</h2>
          <p className="mt-4 text-lg text-[#141413]/70">{c.body}</p>
          <a href={waLink(c.waText)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">
            {c.wa}
          </a>
          <ul className="mt-6 space-y-2 text-[#141413]/70">
            {c.list.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#faf9f5] border border-[#e8e6dc] rounded-2xl p-6 md:p-8 space-y-5">
          <div>
            <label htmlFor="name" className="block font-display font-semibold text-[15px] text-[#141413] mb-2">
              {c.name}
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              autoComplete="name"
              className="field"
              placeholder={c.namePh}
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-display font-semibold text-[15px] text-[#141413] mb-2">
              {c.email}
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              autoComplete="email"
              className="field"
              placeholder="you@company.com"
            />
            <p className="mt-1.5 text-sm text-[#141413]/60">{c.emailHint}</p>
          </div>

          <div>
            <label htmlFor="details" className="block font-display font-semibold text-[15px] text-[#141413] mb-2">
              {c.details}
            </label>
            <textarea
              id="details"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              required
              rows={5}
              className="field resize-y"
              placeholder={c.detailsPh}
            />
          </div>

          <button type="submit" className="btn-secondary w-full">
            {c.send}
          </button>
          <p className="text-sm text-[#141413]/60">{c.sendHint}</p>
        </form>
      </div>
    </section>
  );
};

export default AccessSection;
