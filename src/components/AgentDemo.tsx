import { useEffect, useState } from 'react';
import { useCopy } from '@/lib/i18n';

type Scenario = {
  tab: string;
  inbox: { from: string; text: string };
  steps: string[];
  draft: string;
  approved: string;
};

const COPY: Record<'id' | 'en', {
  eyebrow: string;
  title: string;
  body: string;
  labels: [string, string, string];
  approve: string;
  edit: string;
  sent: string;
  note: string;
  scenarios: Scenario[];
}> = {
  id: {
    eyebrow: 'Cara kerja agent',
    title: 'Bukan chatbot. Agent mengerjakan langkahnya, manusia yang memutuskan.',
    body: 'Agent membaca pesan atau dokumen yang masuk, mengecek data di sistemmu, lalu menyiapkan tindakan. Staf melihat semuanya dalam satu layar dan menekan setuju, ubah, atau tolak.',
    labels: ['1. Masuk', '2. Agent menyiapkan', '3. Staf menyetujui'],
    approve: 'Setujui',
    edit: 'Ubah',
    sent: 'Terkirim setelah disetujui',
    note: 'Contoh ilustrasi. Alur, data, dan batasnya disesuaikan saat scope.',
    scenarios: [
      {
        tab: 'Pesanan WhatsApp',
        inbox: { from: 'Pelanggan · WhatsApp', text: 'Kak, keripik pedas 3 bungkus sama yang original 2, kirim ke Bekasi ya.' },
        steps: ['Baca pesanan: 3 pedas, 2 original', 'Cek stok di sistem: tersedia', 'Hitung ongkir ke Bekasi', 'Siapkan balasan + catatan pesanan'],
        draft: 'Siap kak! 3 pedas + 2 original, total sudah termasuk ongkir ke Bekasi. Mau transfer atau QRIS?',
        approved: 'Pesanan tercatat, balasan terkirim.',
      },
      {
        tab: 'Booking klinik',
        inbox: { from: 'Pasien · formulir web', text: 'Mau jadwal kontrol gigi Sabtu pagi kalau bisa.' },
        steps: ['Cari slot Sabtu pagi yang kosong', 'Cocokkan dokter yang praktik', 'Siapkan konfirmasi + pengingat H-1'],
        draft: 'Sabtu 09.30 dengan drg. jaga tersedia. Kami kirim pengingat sehari sebelumnya, ya.',
        approved: 'Jadwal masuk kalender, pengingat terpasang.',
      },
      {
        tab: 'Follow-up leads',
        inbox: { from: 'Leads · 14 kontak baru minggu ini', text: 'Daftar dari form, Instagram, dan pameran.' },
        steps: ['Gabungkan jadi satu daftar, buang duplikat', 'Urutkan dari yang paling siap beli', 'Susun draf pesan per orang'],
        draft: '14 draf follow-up siap, 5 prioritas tinggi di atas.',
        approved: 'Staf sales mengirim 5 pesan pertama hari ini.',
      },
    ],
  },
  en: {
    eyebrow: 'How agents work',
    title: 'Not a chatbot. The agent does the steps, a person makes the call.',
    body: 'The agent reads incoming messages or documents, checks your system, and prepares the action. Your staff sees it all on one screen and taps approve, edit, or reject.',
    labels: ['1. In', '2. Agent prepares', '3. Staff approves'],
    approve: 'Approve',
    edit: 'Edit',
    sent: 'Sent after approval',
    note: 'Illustrative example. Flow, data, and limits are set during scoping.',
    scenarios: [
      {
        tab: 'WhatsApp orders',
        inbox: { from: 'Customer · WhatsApp', text: 'Hi, 3 packs of spicy chips and 2 original, deliver to Bekasi please.' },
        steps: ['Read the order: 3 spicy, 2 original', 'Check stock in your system: available', 'Calculate delivery to Bekasi', 'Prepare the reply + order record'],
        draft: 'Sure! 3 spicy + 2 original, total includes delivery to Bekasi. Bank transfer or QRIS?',
        approved: 'Order recorded, reply sent.',
      },
      {
        tab: 'Clinic booking',
        inbox: { from: 'Patient · web form', text: 'I would like a dental check-up on Saturday morning if possible.' },
        steps: ['Find an open Saturday morning slot', 'Match a dentist on duty', 'Prepare the confirmation + D-1 reminder'],
        draft: 'Saturday 09:30 with the dentist on duty is open. We will send a reminder the day before.',
        approved: 'Booked in the calendar, reminder set.',
      },
      {
        tab: 'Lead follow-up',
        inbox: { from: 'Leads · 14 new contacts this week', text: 'From the web form, Instagram, and an expo.' },
        steps: ['Merge into one list, drop duplicates', 'Sort by who is closest to buying', 'Draft a message for each person'],
        draft: '14 follow-up drafts ready, 5 high-priority on top.',
        approved: 'Sales sends the first 5 messages today.',
      },
    ],
  },
};

const ACCENTS = ['#d97757', '#6a9bcc', '#788c5d'];
// Darker shades of the accents for small text (contrast >= 4.5:1 on white).
const TEXT = ['#b4532f', '#3f6f9f', '#5f7148'];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(m.matches);
    const on = () => setReduced(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return reduced;
}

const AgentDemo = () => {
  const c = useCopy(COPY);
  const [tab, setTab] = useState(0);
  const [phase, setPhase] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const s = c.scenarios[tab];
  // phases: 0 inbox, 1..n agent steps, n+1 draft ready, n+2 approved
  const last = s.steps.length + 2;
  const shown = reduced ? last : phase;

  useEffect(() => {
    setPhase(0);
  }, [tab]);

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setTimeout(() => setPhase((p) => (p >= last ? 0 : p + 1)), phase >= last ? 3200 : 1100);
    return () => window.clearTimeout(id);
  }, [phase, last, reduced, paused]);

  const accent = ACCENTS[tab];
  const label = TEXT[tab];

  return (
    <section id="agent" className="py-16 md:py-24">
      <div className="wrap">
        <p className="eyebrow">{c.eyebrow}</p>
        <h2 className="mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413] max-w-3xl">{c.title}</h2>
        <p className="mt-4 text-lg text-[#141413]/70">{c.body}</p>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label={c.eyebrow}>
          {c.scenarios.map((sc, i) => (
            <button
              key={sc.tab}
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={`px-4 py-2 rounded-full font-display text-sm font-semibold border transition-colors ${
                tab === i ? 'bg-[#141413] text-[#faf9f5] border-[#141413]' : 'bg-white text-[#141413] border-[#e8e6dc] hover:border-[#141413]'
              }`}
            >
              {sc.tab}
            </button>
          ))}
        </div>

        <div
          className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          role="tabpanel"
        >
          {/* 1. inbox */}
          <div className="card-studio !p-6">
            <p className="font-display text-sm font-semibold" style={{ color: label }}>{c.labels[0]}</p>
            <div className="mt-4 rounded-xl bg-[#faf9f5] border border-[#e8e6dc] p-4">
              <p className="font-display text-xs font-semibold text-[#141413]/60">{s.inbox.from}</p>
              <p className="mt-1.5 text-[15px] text-[#141413]">{s.inbox.text}</p>
            </div>
          </div>

          {/* 2. agent steps */}
          <div className="card-studio !p-6">
            <p className="font-display text-sm font-semibold" style={{ color: label }}>{c.labels[1]}</p>
            <ol className="mt-4 space-y-2.5">
              {s.steps.map((step, i) => {
                const done = shown > i;
                return (
                  <li
                    key={step}
                    className={`flex gap-3 text-[15px] transition-opacity duration-300 ${done ? 'opacity-100' : 'opacity-30'}`}
                  >
                    <span
                      className="mt-1.5 inline-block w-2.5 h-2.5 shrink-0 rounded-full transition-colors duration-300"
                      style={{ background: done ? accent : '#e8e6dc' }}
                      aria-hidden="true"
                    />
                    <span className="text-[#141413]">{step}</span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* 3. approval */}
          <div className="card-studio !p-6">
            <p className="font-display text-sm font-semibold" style={{ color: label }}>{c.labels[2]}</p>
            <div
              className={`mt-4 rounded-xl border p-4 transition-opacity duration-300 ${
                shown > s.steps.length ? 'opacity-100' : 'opacity-30'
              } ${shown >= last ? 'border-[#788c5d] bg-[#788c5d]/10' : 'border-[#e8e6dc] bg-white'}`}
            >
              <p className="text-[15px] text-[#141413]">{s.draft}</p>
              {shown >= last ? (
                <p className="mt-3 font-display text-sm font-semibold text-[#5f7148]">✓ {s.approved}</p>
              ) : (
                <div className="mt-3 flex gap-2" aria-hidden="true">
                  <span className="px-3 py-1.5 rounded-full bg-[#141413] text-[#faf9f5] font-display text-xs font-semibold">{c.approve}</span>
                  <span className="px-3 py-1.5 rounded-full border border-[#b0aea5] font-display text-xs font-semibold text-[#141413]">{c.edit}</span>
                </div>
              )}
            </div>
            <p className="mt-3 text-sm text-[#141413]/60">{c.sent}</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-[#141413]/60">{c.note}</p>
      </div>
    </section>
  );
};

export default AgentDemo;
