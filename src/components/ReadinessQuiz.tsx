import { useState } from 'react';
import { useCopy } from '@/lib/i18n';
import { waLink } from '@/lib/contact';

type Tier = { title: string; text: string; next: string };

const COPY: Record<'id' | 'en', {
  eyebrow: string;
  title: string;
  body: string;
  questions: { q: string; options: string[] }[];
  answered: (n: number, total: number) => string;
  tiers: [Tier, Tier, Tier];
  send: string;
  reset: string;
  waIntro: string;
  waResult: string;
  note: string;
}> = {
  id: {
    eyebrow: 'Cek kesiapan AI',
    title: 'Lima pertanyaan, satu menit. Lihat dari mana sebaiknya mulai.',
    body: 'Tidak ada jawaban benar atau salah. Hasilnya saran jujur, termasuk kalau AI belum perlu.',
    questions: [
      { q: 'Berapa jam sehari timmu habiskan untuk membalas, merekap, atau mengetik ulang hal yang sama?', options: ['Kurang dari 1 jam', '1 sampai 3 jam', 'Lebih dari 3 jam'] },
      { q: 'Data pesanan, stok, atau pelanggan saat ini ada di mana?', options: ['Chat dan kertas', 'Spreadsheet', 'Sudah di aplikasi atau sistem'] },
      { q: 'Apakah ada aturan atau SOP tertulis untuk pekerjaan itu?', options: ['Belum ada', 'Sebagian', 'Ada dan dipakai'] },
      { q: 'Siapa yang bisa memeriksa dan menyetujui hasil agent setiap hari?', options: ['Belum ada', 'Pemilik sendiri', 'Ada staf yang ditugaskan'] },
      { q: 'Seberapa sering pekerjaan berulang itu terjadi?', options: ['Beberapa kali seminggu', 'Setiap hari', 'Setiap jam'] },
    ],
    answered: (n, total) => `${n} dari ${total} terjawab`,
    tiers: [
      { title: 'Rapikan data dulu', text: 'AI belum memberi hasil besar kalau datanya masih di chat dan kertas. Langkah pertama yang lebih masuk akal: satu sistem sederhana untuk pesanan dan pelanggan, dan SOP singkat.', next: 'Kami bisa bantu merapikan dulu, lalu agent menyusul.' },
      { title: 'Siap untuk pilot', text: 'Ada pekerjaan berulang yang cukup sering dan data yang bisa dibaca. Pilot 2 minggu untuk satu alur kerja paling masuk akal di sini.', next: 'Kirim hasil ini, kami bantu pilih alur kerja pertamanya.' },
      { title: 'Siap untuk beberapa agent', text: 'Pekerjaan berulangnya banyak, datanya sudah di sistem, dan ada yang menyetujui. Mulai dari alur yang paling mahal waktunya, lalu tambah satu per satu.', next: 'Kirim hasil ini, kami susun urutan agent yang paling menguntungkan.' },
    ],
    send: 'Kirim hasil ke WhatsApp',
    reset: 'Ulangi',
    waIntro: 'Halo Kuon Studio, ini hasil cek kesiapan AI bisnis saya:',
    waResult: 'Hasil',
    note: 'Jawabanmu tidak disimpan di situs ini. Hanya terkirim kalau kamu menekan tombol WhatsApp.',
  },
  en: {
    eyebrow: 'AI readiness check',
    title: 'Five questions, one minute. See where to start.',
    body: 'No right or wrong answers. You get an honest suggestion, including when AI is not needed yet.',
    questions: [
      { q: 'How many hours a day does your team spend replying, recapping, or retyping the same things?', options: ['Under 1 hour', '1 to 3 hours', 'Over 3 hours'] },
      { q: 'Where do your orders, stock, or customer records live today?', options: ['Chats and paper', 'Spreadsheets', 'Already in an app or system'] },
      { q: 'Is there a written rule or SOP for that work?', options: ['Not yet', 'Partly', 'Yes, and it is used'] },
      { q: 'Who can review and approve the agent’s work every day?', options: ['No one yet', 'The owner', 'An assigned staff member'] },
      { q: 'How often does that repetitive work happen?', options: ['A few times a week', 'Every day', 'Every hour'] },
    ],
    answered: (n, total) => `${n} of ${total} answered`,
    tiers: [
      { title: 'Tidy the data first', text: 'AI will not do much while data lives in chats and paper. A better first step: one simple system for orders and customers, plus a short SOP.', next: 'We can help tidy up first, then add agents.' },
      { title: 'Ready for a pilot', text: 'You have repetitive work that happens often and data an agent can read. A 2-week pilot on one workflow makes the most sense.', next: 'Send this result and we will help pick the first workflow.' },
      { title: 'Ready for several agents', text: 'Lots of repetitive work, data already in a system, and someone to approve. Start with the workflow that costs the most time, then add one at a time.', next: 'Send this result and we will map the most valuable order of agents.' },
    ],
    send: 'Send result on WhatsApp',
    reset: 'Start over',
    waIntro: 'Hi Kuon Studio, here is my AI readiness check:',
    waResult: 'Result',
    note: 'Your answers are not stored on this site. They are only sent if you tap the WhatsApp button.',
  },
};

const ReadinessQuiz = () => {
  const c = useCopy(COPY);
  const [answers, setAnswers] = useState<(number | null)[]>(() => c.questions.map(() => null));
  const done = answers.filter((a) => a !== null).length;
  const complete = done === c.questions.length;
  const score = answers.reduce<number>((sum, a) => sum + (a ?? 0), 0);
  // Data in chats/paper or nobody to approve caps the result: an agent needs both.
  const blocked = answers[1] === 0 || answers[3] === 0;
  const tier = blocked || score <= 4 ? 0 : score <= 7 ? 1 : 2;
  const result = c.tiers[tier];

  const message = [
    c.waIntro,
    ...c.questions.map((q, i) => `- ${q.q} ${answers[i] !== null ? q.options[answers[i] as number] : '-'}`),
    `${c.waResult}: ${result.title}`,
  ].join('\n');

  return (
    <section id="readiness" className="py-16 md:py-24">
      <div className="wrap">
        <p className="eyebrow">{c.eyebrow}</p>
        <h2 className="mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413] max-w-3xl">{c.title}</h2>
        <p className="mt-4 text-lg text-[#141413]/70">{c.body}</p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 items-start">
          <ol className="space-y-4">
            {c.questions.map((q, i) => (
              <li key={q.q} className="card-studio !p-6">
                <fieldset>
                  <legend className="font-display font-semibold text-[#141413]">
                    {i + 1}. {q.q}
                  </legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {q.options.map((opt, j) => {
                      const on = answers[i] === j;
                      return (
                        <button
                          key={opt}
                          type="button"
                          aria-pressed={on}
                          onClick={() => setAnswers((a) => a.map((x, k) => (k === i ? j : x)))}
                          className={`px-4 py-2 rounded-full border font-display text-sm font-semibold transition-colors ${
                            on ? 'bg-[#141413] text-[#faf9f5] border-[#141413]' : 'bg-white text-[#141413] border-[#e8e6dc] hover:border-[#141413]'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </li>
            ))}
          </ol>

          <aside className="lg:sticky lg:top-24 card-studio !p-7" aria-live="polite">
            {complete ? (
              <>
                <p className="font-display text-sm font-semibold text-[#b4532f]">{c.waResult}</p>
                <h3 className="mt-2 font-display font-bold text-2xl text-[#141413]">{result.title}</h3>
                <p className="mt-3 text-[#141413]/70">{result.text}</p>
                <p className="mt-3 text-[#141413]">{result.next}</p>
                <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full">
                  {c.send}
                </a>
                <button
                  type="button"
                  onClick={() => setAnswers(c.questions.map(() => null))}
                  className="mt-3 w-full font-display text-sm font-semibold text-[#141413]/70 hover:text-[#141413]"
                >
                  {c.reset}
                </button>
              </>
            ) : (
              <>
                <p className="font-display font-semibold text-[#141413]">{c.answered(done, c.questions.length)}</p>
                <div className="mt-3 h-2 rounded-full bg-[#e8e6dc] overflow-hidden" aria-hidden="true">
                  <div className="h-full bg-[#d97757] transition-all duration-300" style={{ width: `${(done / c.questions.length) * 100}%` }} />
                </div>
              </>
            )}
            <p className="mt-5 text-sm text-[#141413]/60">{c.note}</p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ReadinessQuiz;
