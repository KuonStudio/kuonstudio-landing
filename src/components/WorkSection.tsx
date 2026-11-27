import { Link } from 'react-router-dom';
import { useCopy } from '@/lib/i18n';

interface WorkProduct {
  name: string;
  accent: string;
  tagline: string;
  img?: string;
  alt?: string;
  caption?: string;
  imgClass?: string;
  specs?: Array<{ label: string; value: string }>;
  body: string;
  points: string[];
  url: string;
  internal?: boolean;
  ctaLabel?: string;
  host: string;
}

const COPY: Record<'id' | 'en', {
  eyebrow: string;
  title: string;
  body: string;
  live: string;
  visit: string;
  products: WorkProduct[];
}> = {
  id: {
    eyebrow: 'Karya',
    title: 'Agent dan model yang kami bangun dan jalankan sendiri.',
    body: 'Masih berjalan sekarang. Buka dan coba sendiri.',
    live: 'Live',
    visit: 'Buka aplikasi',
    products: [
      {
        name: 'Kuon 1',
        accent: '#788c5d',
        tagline: 'Model bahasa 295,8 juta parameter buatan sendiri, 307 MB, jalan di CPU',
        specs: [
          { label: 'Ukuran bobot', value: '307 MB INT8' },
          { label: 'Perangkat keras', value: 'CPU 4 core, tanpa GPU' },
          { label: 'Bahasa', value: 'Indonesia dan Inggris' },
        ],
        body: 'Kami tidak hanya merangkai API LLM pihak ketiga. Kuon 1 dilatih dari nol untuk bahasa Indonesia dan Inggris, supaya bisnis bisa menjalankan asisten data di server sendiri tanpa biaya per token.',
        points: [
          'Membaca tabel penjualan (TSV/CSV) dan menghitung margin, perubahan persentase, total, rata-rata, serta porsi dengan rumus pasti.',
          'Menolak mengarang angka: kalau data kurang, Kuon 1 meminta data tambahannya.',
          'Dua mode siap pakai: Business chat privat untuk angka dan dokumen internal, serta General QA dengan pencarian web dan tautan sumber.',
        ],
        url: '/kuon',
        internal: true,
        ctaLabel: 'Coba Kuon 1',
        host: 'kuonstudio.com/kuon · langsung dicoba gratis tanpa login.',
      },
      {
        name: 'Selisik',
        accent: '#d97757',
        tagline: 'Agent pencari klien untuk freelancer dan tim sales',
        img: '/selisik-pipeline.png',
        alt: 'Halaman Pipeline Selisik: delapan calon klien contoh dengan status dan skor 1–10',
        caption: 'Tampilan aplikasi dengan data contoh fiktif.',
        imgClass: 'w-full',
        body: 'Sebutkan jenis usaha yang kamu cari. Selisik menelusuri situs bisnis di Indonesia, menilai tiap target lewat lensa profesimu, lalu menyiapkan draf pesan pembuka yang bisa kamu sunting.',
        points: [
          'Sembilan profesi bawaan plus profesi sendiri; profesi menentukan apa yang dihitung sebagai peluang dan buktinya.',
          'Pesan pembuka maksimal 60 kata, ditutup satu pertanyaan ya atau tidak, dengan follow-up hari ke-3 dan ke-7.',
          'Nomor dan email hanya muncul kalau tertulis di halaman sumber. Pindai ulang tidak menimpa catatanmu.',
        ],
        url: 'https://selisik.kuonstudio.com',
        host: 'selisik.kuonstudio.com · masuk dengan kode email, tanpa kata sandi.',
      },
      {
        name: 'Cadence',
        accent: '#6a9bcc',
        tagline: 'Agent ide dan naskah konten untuk akun media sosial',
        img: '/cadence-ide.png',
        alt: 'Halaman Buat konten di Cadence dengan tab Carikan ide, topik akun sebagai pilihan cepat, dan daftar ide terakhir',
        caption: '',
        imgClass: 'w-full',
        body: 'Cadence membaca apa yang sedang dicari orang dan berita terbaru, lalu menawarkan ide konten yang cocok dengan profil akunmu. Ide yang kamu pilih diubah jadi naskah per adegan.',
        points: [
          'Setiap ide menautkan sumbernya. Ide tanpa sumber yang bisa dicek dibuang.',
          'Profil per akun: penonton, pilar konten, target posting, dan contoh tulisan asli supaya gaya bicaranya mirip.',
          'Naskah dicek dari ungkapan khas tulisan AI, dan belajar dari baris yang kamu ubah sebelum dipakai.',
        ],
        url: 'https://cadence.kuonstudio.com',
        host: 'cadence.kuonstudio.com · masuk dengan kode email 6 digit.',
      },
    ],
  },
  en: {
    eyebrow: 'Work',
    title: 'Agents and models we build and run ourselves.',
    body: 'Running now. Open them and click around.',
    live: 'Live',
    visit: 'Visit live app',
    products: [
      {
        name: 'Kuon 1',
        accent: '#788c5d',
        tagline: '295.8M-parameter language model built from scratch, 307 MB, runs on CPU',
        specs: [
          { label: 'Model size', value: '307 MB INT8' },
          { label: 'Hardware', value: '4-core CPU, no GPU' },
          { label: 'Languages', value: 'Indonesian and English' },
        ],
        body: 'We do not only wire up third-party LLM APIs. Kuon 1 is trained from scratch in Indonesian and English, so a business can run a data assistant on its own server with no per-token bills.',
        points: [
          'Reads sales tables (TSV/CSV) and computes margin, percentage change, totals, averages, and shares with exact formulas.',
          'Refuses to invent numbers: when data is missing, Kuon 1 asks for it.',
          'Two built-in modes: private Business chat for internal numbers and docs, plus General QA with web search and clickable sources.',
        ],
        url: '/kuon',
        internal: true,
        ctaLabel: 'Try Kuon 1',
        host: 'kuonstudio.com/kuon · try live now, no sign-in required.',
      },
      {
        name: 'Selisik',
        accent: '#d97757',
        tagline: 'Client-finding agent for freelancers and sales teams',
        img: '/selisik-pipeline.png',
        alt: 'Selisik Pipeline page: eight sample leads with status and a 1–10 score',
        caption: 'App screenshot with fictional sample data.',
        imgClass: 'w-full',
        body: 'Describe the businesses you want to reach. Selisik searches Indonesian business sites, scores each target through the lens of your profession, then drafts an opening message you can edit.',
        points: [
          'Nine built-in professions plus your own; the profession decides what counts as an opportunity and the evidence.',
          'Opening messages stay under 60 words and end with one yes or no question, with day-3 and day-7 follow-ups.',
          'Phone numbers and emails only appear if they are written on the source page. Rescans never overwrite your notes.',
        ],
        url: 'https://selisik.kuonstudio.com',
        host: 'selisik.kuonstudio.com · Indonesian UI, sign in with an email code.',
      },
      {
        name: 'Cadence',
        accent: '#6a9bcc',
        tagline: 'Content idea and script agent for social accounts',
        img: '/cadence-ide.png',
        alt: 'Cadence content page with the idea-search tab, account topics as quick picks, and the latest idea list',
        caption: '',
        imgClass: 'w-full',
        body: 'Cadence reads what people are searching for and recent news, then offers content ideas that fit your account profile. A chosen idea becomes a scene-by-scene script.',
        points: [
          'Every idea links its sources. Ideas without checkable sources are dropped.',
          'One profile per account: audience, content pillars, posting target, and real writing samples so the voice matches.',
          'Scripts are checked for tell-tale AI phrasing, and learn from the lines you edit before use.',
        ],
        url: 'https://cadence.kuonstudio.com',
        host: 'cadence.kuonstudio.com · Indonesian UI, sign in with a 6-digit email code.',
      },
    ],
  },
};

const WorkSection = () => {
  const c = useCopy(COPY);
  return (
    <section id="work" className="py-16 md:py-24">
      <div className="wrap">
        <p className="eyebrow">{c.eyebrow}</p>
        <h2 className="mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413]">{c.title}</h2>
        <p className="mt-4 text-lg text-[#141413]/70">{c.body}</p>

        <div className="mt-10 grid grid-cols-1 gap-6">
          {c.products.map((p) => (
            <article key={p.name} className="card-studio">
              <div className="card-accent" style={{ background: p.accent }} aria-hidden="true" />
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display font-semibold text-xl text-[#141413]">{p.name}</h3>
                <span className="font-display text-xs font-semibold px-3 py-1 rounded-full bg-[#788c5d]/15 text-[#5f7148]">{c.live}</span>
              </div>
              <p className="mt-1 font-display text-[15px] text-[#141413]/60">{p.tagline}</p>

              {p.img && (
                <div className="mt-6 w-full rounded-xl border border-[#e8e6dc] overflow-hidden bg-[#FAF8F5]">
                  <img src={p.img} alt={p.alt || p.name} loading="lazy" className={p.imgClass} />
                </div>
              )}

              {p.specs && (
                <dl className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 rounded-xl border border-[#e8e6dc] bg-[#faf9f5] p-4">
                  {p.specs.map((spec) => (
                    <div key={spec.label}>
                      <dt className="font-display text-xs text-[#141413]/60">{spec.label}</dt>
                      <dd className="mt-1 font-display font-semibold text-[15px] text-[#141413]">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {p.caption && <p className="mt-2 text-sm text-[#141413]/60">{p.caption}</p>}
              <p className="mt-4 text-[#141413]/70">{p.body}</p>
              <ul className="mt-5 space-y-2.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-[#141413]">
                    <span aria-hidden="true" style={{ color: p.accent }}>
                      —
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-[#e8e6dc] flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                {p.internal ? (
                  <Link
                    to={p.url}
                    className="font-display font-semibold text-[#141413] hover:text-[#d97757] transition-colors"
                  >
                    {p.ctaLabel || c.visit} &rarr;
                  </Link>
                ) : (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display font-semibold text-[#141413] hover:text-[#d97757] transition-colors"
                  >
                    {p.ctaLabel || c.visit} &rarr;
                  </a>
                )}
                <p className="text-[15px] text-[#141413]/60">{p.host}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
