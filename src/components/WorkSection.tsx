import { useCopy } from '@/lib/i18n';

const COPY = {
  id: {
    eyebrow: 'Karya',
    title: 'Agent yang kami pakai dan jalankan sendiri.',
    body: 'Masih berjalan sekarang. Buka dan coba sendiri.',
    live: 'Live',
    visit: 'Buka aplikasi',
    products: [
      {
        name: 'Selisik',
        accent: '#d97757',
        tagline: 'Agent pencari klien untuk freelancer dan tim sales',
        img: '/selisik-pipeline.png',
        alt: 'Halaman Pipeline Selisik: delapan calon klien contoh dengan status dan skor 1–10',
        caption: 'Tampilan aplikasi dengan data contoh fiktif.',
        imgClass: 'w-full',
        body: 'Tulis tujuan seperti "kafe di Bandung yang butuh sistem pemesanan". Selisik menelusuri situs bisnis di Indonesia, menilai tiap target 1–10 lewat lensa profesimu, lalu menyiapkan apa yang bisa kamu tawarkan beserta draf pesan pembukanya.',
        points: [
          'Mode Otomatis: AI menyusun 2–4 kueri dari tujuanmu dan kamu setujui dulu. Pencarian dan analisis per calon klien baru berjalan setelah disetujui, dengan perkiraan biaya di atas tombol.',
          'Sembilan profesi bawaan, dari software engineer sampai fotografer produk, plus profesi sendiri. Profesi menentukan apa yang dihitung sebagai peluang, harga, dan buktinya; untuk kreator dan desainer, Instagram ikut ditelusuri.',
          'Sumber kedua yang bisa dinyalakan: lowongan kerja. Perusahaan yang memasang lowongan sudah terbukti punya anggaran.',
          'Pesan pembuka maksimal 60 kata dan ditutup satu pertanyaan ya/tidak. Follow-up hari ke-3 dan ke-7 sudah disiapkan, dengan pengingat.',
          'Nomor dan email hanya muncul kalau tertulis di halaman sumber, termasuk halaman Kontak. Status: baru, dihubungi, dibalas, deal, mati; pindai ulang tidak menimpa catatanmu.',
        ],
        url: 'https://selisik.kuonstudio.com',
        host: 'selisik.kuonstudio.com · masuk dengan kode email, tanpa kata sandi.',
      },
      {
        name: 'Cadence',
        accent: '#6a9bcc',
        tagline: 'Agent ide dan naskah konten untuk akun media sosial',
        img: '/cadence-ide.png',
        alt: 'Halaman Cari ide di Cadence untuk profil Kuon Studio, dengan topik akun sebagai pilihan cepat',
        caption: '',
        imgClass: 'w-full',
        body: 'Cadence membaca apa yang sedang dicari orang dan berita terbaru, lalu menawarkan ide konten yang cocok dengan profil akunmu. Ide yang dipilih diubah jadi naskah per adegan, siap diproduksi.',
        points: [
          'Setiap ide menautkan sumbernya. Ide tanpa sumber yang bisa dicek dibuang, begitu juga yang menyentuh topik terlarang akunmu.',
          'Profil per akun: penonton, pilar konten dan rotasinya, target posting per hari, dan contoh tulisan asli supaya gaya bicaranya mirip.',
          'Naskah dicek dari ungkapan khas tulisan AI, dan belajar dari baris yang kamu ubah sebelum dipakai.',
        ],
        url: 'https://cadence.kuonstudio.com',
        host: 'cadence.kuonstudio.com · masuk dengan kode email 6 digit.',
      },
    ],
  },
  en: {
    eyebrow: 'Work',
    title: 'Agents we build and run ourselves.',
    body: 'Running now. Open them and click around.',
    live: 'Live',
    visit: 'Visit live app',
    products: [
      {
        name: 'Selisik',
        accent: '#d97757',
        tagline: 'Client-finding agent for freelancers and sales teams',
        img: '/selisik-pipeline.png',
        alt: 'Selisik Pipeline page: eight sample leads with status and a 1–10 score',
        caption: 'App screenshot with fictional sample data.',
        imgClass: 'w-full',
        body: 'Type a goal such as "cafes in Bandung that need an ordering system". Selisik searches Indonesian business sites, scores each target 1–10 through the lens of your profession, then prepares what you can offer and a draft opening message.',
        points: [
          'Automatic mode: the AI turns your goal into 2–4 queries for you to approve first. Search and per-lead analysis only run after approval, with the cost estimate above the button.',
          'Nine built-in professions, from software engineer to product photographer, plus your own. The profession decides what counts as an opportunity, the price, and the evidence; for creators and designers, Instagram is searched too.',
          'An optional second source: job listings. A company that posts a job has already shown it has budget.',
          'Opening messages stay under 60 words and end with one yes/no question. Day-3 and day-7 follow-ups are prepared, with reminders.',
          'Phone numbers and emails only appear if they are written on the source page, including the Contact page. Statuses: new, contacted, replied, deal, dead; rescans never overwrite your notes.',
        ],
        url: 'https://selisik.kuonstudio.com',
        host: 'selisik.kuonstudio.com · Indonesian UI, sign in with an email code.',
      },
      {
        name: 'Cadence',
        accent: '#6a9bcc',
        tagline: 'Content idea and script agent for social accounts',
        img: '/cadence-ide.png',
        alt: 'Cadence idea search page for the Kuon Studio profile, with the account topics as quick picks',
        caption: '',
        imgClass: 'w-full',
        body: 'Cadence reads what people are searching for and recent news, then offers content ideas that fit your account profile. A chosen idea becomes a scene-by-scene script, ready for production.',
        points: [
          'Every idea links its sources. Ideas without checkable sources are dropped, and so are ideas that touch your banned topics.',
          'One profile per account: audience, content pillars and rotation, daily posting target, and real writing samples so the voice matches.',
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
              <div className="mt-6 w-full rounded-xl border border-[#e8e6dc] overflow-hidden bg-[#FAF8F5]">
                <img src={p.img} alt={p.alt} loading="lazy" className={p.imgClass} />
              </div>
              {p.caption && <p className="mt-2 text-sm text-[#141413]/60">{p.caption}</p>}
              <p className="mt-3 text-[#141413]/70">{p.body}</p>
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
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-semibold text-[#141413] hover:text-[#d97757] transition-colors"
                >
                  {c.visit} &rarr;
                </a>
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
