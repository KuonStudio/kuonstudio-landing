import { useCopy } from '@/lib/i18n';
import { waLink } from '@/lib/contact';

const COPY = {
  id: {
    eyebrow: 'Lihat dulu, baru putuskan',
    title: 'Kirim satu kerjaan berulang di bisnismu. Dalam 48 jam kamu terima video agent mengerjakannya.',
    steps: [
      { t: 'Kirim contohnya lewat WhatsApp', d: 'Screenshot chat pesanan, file rekap, atau dokumen yang biasa diketik ulang. Samarkan nama dan nomor pelanggan dulu.' },
      { t: 'Kami bangun agent demo', d: 'Dari contoh yang kamu kirim, dengan aturan yang kamu sebut: apa yang boleh dikerjakan agent, apa yang harus ditanyakan ke staf.' },
      { t: 'Video 48 jam setelah contoh lengkap', d: 'Rekaman layar agent mengerjakan kerjaanmu dari awal sampai menunggu persetujuan. Gratis, dan kamu tidak wajib lanjut.' },
    ],
    cta: 'Kirim contoh kerjaan',
    waText: 'Halo Kuon Studio, saya mau minta video demo 48 jam. Kerjaan yang mau saya tunjukkan: ',
  },
  en: {
    eyebrow: 'See it first, then decide',
    title: 'Send one repetitive task from your business. Within 48 hours you get a video of an agent doing it.',
    steps: [
      { t: 'Send a sample on WhatsApp', d: 'A screenshot of order chats, a recap file, or a document your team retypes. Mask customer names and numbers first.' },
      { t: 'We build a demo agent', d: 'From your sample, with the rules you set: what the agent may do on its own and what it must ask your staff.' },
      { t: 'A video 48 hours after the sample is complete', d: 'A screen recording of the agent doing your task, up to the point where it waits for approval. Free, with no obligation to continue.' },
    ],
    cta: 'Send a sample task',
    waText: 'Hi Kuon Studio, I would like the 48-hour demo video. The task I want to show you: ',
  },
};

const DemoOffer = () => {
  const c = useCopy(COPY);
  return (
    <section id="demo" className="py-16 md:py-24 bg-[#141413] text-[#faf9f5]">
      <div className="wrap">
        <p className="eyebrow">{c.eyebrow}</p>
        <h2 className="mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] max-w-4xl">{c.title}</h2>
        <ol className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.steps.map((s, i) => (
            <li key={s.t} className="border-t border-white/20 pt-4">
              <p className="font-display font-semibold text-sm tabular-nums text-[#d97757]">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 font-display font-semibold text-lg">{s.t}</h3>
              <p className="mt-2 text-[#faf9f5]/70">{s.d}</p>
            </li>
          ))}
        </ol>
        <a
          href={waLink(c.waText)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center justify-center px-6 py-3.5 rounded-full font-display font-semibold bg-[#faf9f5] text-[#141413] hover:bg-[#d97757] hover:text-[#faf9f5] transition-colors"
        >
          {c.cta}
        </a>
      </div>
    </section>
  );
};

export default DemoOffer;
