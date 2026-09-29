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
        tagline: 'Agent riset calon klien untuk freelancer dan tim sales',
        img: '/selisik-pipeline.png',
        alt: 'Aplikasi Selisik menampilkan daftar 44 calon klien yang sudah diberi skor',
        imgClass: 'w-full',
        body: 'Tulis tujuan seperti "kafe di Bandung yang butuh sistem pemesanan". Selisik mencari situs perusahaan Indonesia, memberi skor 1–10 dari sudut pandang profesimu, dan menyusun draf pesan pertama untuk yang layak dihubungi.',
        points: [
          'Mode Otomatis: AI mengusulkan 2–4 kueri pencarian, kamu memilih yang dijalankan, lengkap dengan perkiraan biaya di atas tombol Jalankan.',
          'Nomor telepon atau email hanya muncul kalau tertulis di halaman sumber. Klaim tanpa teks sumber dibuang.',
          'Hasil tersimpan dengan lima status: baru, dihubungi, membalas, deal, gagal. Pindai ulang tidak menimpa status atau catatanmu.',
        ],
        url: 'https://selisik.kuonstudio.com',
        host: 'selisik.kuonstudio.com · masuk dengan kode email, tanpa kata sandi.',
      },
      {
        name: 'Cadence',
        accent: '#6a9bcc',
        tagline: 'Agent ide dan naskah konten untuk akun media sosial',
        img: '/cadence-radar.png',
        alt: 'Aplikasi Cadence menampilkan kartu ide konten beserta sumbernya',
        imgClass: 'w-full h-[420px] object-cover object-top',
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
        tagline: 'Lead research agent for freelancers and sales teams',
        img: '/selisik-pipeline.png',
        alt: 'Selisik app showing a saved pipeline of 44 scored leads',
        imgClass: 'w-full',
        body: 'Type a goal such as "cafes in Bandung that need an ordering system". Selisik searches Indonesian company sites, scores each target 1–10 through the lens of your profession, and drafts a first message for the ones worth contacting.',
        points: [
          'Automatic mode: the AI proposes 2–4 search queries and you approve the ones that run, with the cost estimate above the Run button.',
          'A phone number or email only appears if it is written on the source page. Claims without source text are dropped.',
          'Results persist with five statuses: new, contacted, replied, deal, dead. Rescans never overwrite your status or notes.',
        ],
        url: 'https://selisik.kuonstudio.com',
        host: 'selisik.kuonstudio.com · Indonesian UI, sign in with an email code.',
      },
      {
        name: 'Cadence',
        accent: '#6a9bcc',
        tagline: 'Content idea and script agent for social accounts',
        img: '/cadence-radar.png',
        alt: 'Cadence app showing content idea cards with their sources',
        imgClass: 'w-full h-[420px] object-cover object-top',
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
