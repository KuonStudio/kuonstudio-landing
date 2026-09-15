const WorkSection = () => {
  return (
    <section id="work" className="py-16 md:py-24">
      <div className="wrap">
        <p className="eyebrow">Selected work</p>
        <h2 className="mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413]">
          Live products we&apos;ve shipped.
        </h2>
        <p className="mt-4 text-lg text-[#141413]/70">
          Running now. Open it and click around.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6">
          <article className="card-studio">
            <div className="card-accent" style={{ background: '#d97757' }} aria-hidden="true" />
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-display font-semibold text-xl text-[#141413]">Selisik</h3>
              <span className="font-display text-xs font-semibold px-3 py-1 rounded-full bg-[#788c5d]/15 text-[#788c5d]">
                Live
              </span>
            </div>
            <p className="mt-1 font-display text-[15px] text-[#141413]/60">
              Lead research for freelancers
            </p>
            <img
              src="/selisik-pipeline.png"
              alt="Selisik app showing a saved pipeline of 44 scored leads"
              loading="lazy"
              className="mt-6 w-full rounded-xl border border-[#e8e6dc]"
            />
            <p className="mt-3 text-[#141413]/70">
              Type a goal such as &ldquo;cafes in Bandung that need an ordering
              system&rdquo;. Selisik searches Indonesian company sites, scores
              each target 1&ndash;10 through the lens of your profession, and
              drafts a first message for the ones worth contacting.
            </p>
            <ul className="mt-5 space-y-2.5">
              <li className="flex gap-3 text-[#141413]">
                <span aria-hidden="true" style={{ color: '#d97757' }}>
                  —
                </span>
                <span>
                  In Automatic mode the AI proposes 2&ndash;4 search queries; you
                  approve the ones that run, with the cost estimate above the Run
                  button. Manual mode skips that and lets you pick the segments.
                </span>
              </li>
              <li className="flex gap-3 text-[#141413]">
                <span aria-hidden="true" style={{ color: '#d97757' }}>
                  —
                </span>
                <span>
                  A phone number or email only appears if it is written on the source
                  page. Claims without source text are dropped.
                </span>
              </li>
              <li className="flex gap-3 text-[#141413]">
                <span aria-hidden="true" style={{ color: '#d97757' }}>
                  —
                </span>
                <span>
                  Results persist with five statuses: new, contacted, replied, deal,
                  dead. By default rescans skip leads you already have; refreshed
                  analyses never overwrite your status or notes.
                </span>
              </li>
              <li className="flex gap-3 text-[#141413]">
                <span aria-hidden="true" style={{ color: '#d97757' }}>
                  —
                </span>
                <span>
                  Eleven professions built in, from software engineer to KOL
                  scout, plus a form for your own: what you sell, your price
                  range, and what marks a business that needs it.
                </span>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-[#e8e6dc] flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <a
                href="https://selisik.kuonstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display font-semibold text-[#141413] hover:text-[#d97757] transition-colors"
              >
                Visit live app &rarr;
              </a>
              <p className="text-[15px] text-[#141413]/60">
                selisik.kuonstudio.com. Indonesian UI. Sign in with an email code.
                No password, no API keys required from you.
              </p>
            </div>
          </article>

          <article className="card-studio">
            <div className="card-accent" style={{ background: '#4a6fa5' }} aria-hidden="true" />
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-display font-semibold text-xl text-[#141413]">Cadence</h3>
              <span className="font-display text-xs font-semibold px-3 py-1 rounded-full bg-[#4a6fa5]/15 text-[#4a6fa5]">
                Live
              </span>
              <span className="font-display text-xs font-semibold px-3 py-1 rounded-full bg-[#d97757]/10 text-[#d97757]">
                Baru
              </span>
            </div>
            <p className="mt-1 font-display text-[15px] text-[#141413]/60">
              Radar tren & kecerdasan konten media sosial
            </p>
            <div className="mt-6 w-full rounded-xl border border-[#e8e6dc] overflow-hidden bg-[#FAF8F5]">
              <img
                src="/cadence-radar.png"
                alt="Cadence app showing 6 trend angles with virality scores, hooks and format recommendations"
                loading="lazy"
                className="w-full h-[420px] object-cover object-top"
              />
            </div>
            <p className="mt-3 text-[#141413]/70">
              Pembaca tren buat konten sosmedmu. Tulis niche + pilih platform,
              Cadence membaca obrolan 2–3 hari terakhir dan mengubahnya jadi
              angle postingan siap eksekusi — bukan ringkasan generik.
            </p>
            <ul className="mt-5 space-y-2.5">
              <li className="flex gap-3 text-[#141413]">
                <span aria-hidden="true" style={{ color: '#4a6fa5' }}>
                  —
                </span>
                <span>
                  <strong>Pindai Tren</strong> untuk TikTok, Instagram, Threads,
                  X, dan Facebook. Dapat 6 sudut pandang sekaligus — skor
                  virality 79–90, rekomendasi format (45–60s Talking Head /
                  Screen Recording), alasan tren, resonansi audiens, dan kait
                  pembuka yang tinggal pakai.
                </span>
              </li>
              <li className="flex gap-3 text-[#141413]">
                <span aria-hidden="true" style={{ color: '#4a6fa5' }}>
                  —
                </span>
                <span>
                  Klik <strong>Buat Brief Konten →</strong> untuk paket eksekusi
                  lengkap: 3 varian caption (authoritative, storytelling,
                  provocative), CTA, hashtag, dan konsep visual — prompt
                  Midjourney, deskripsi shot, serta overlay text. Simpan ke{' '}
                  <strong>Bank Konten</strong>.
                </span>
              </li>
              <li className="flex gap-3 text-[#141413]">
                <span aria-hidden="true" style={{ color: '#4a6fa5' }}>
                  —
                </span>
                <span>
                  <strong>Persona Brand & Fluff Filter</strong> — pilih nada
                  (Rapi & tenang / Gaya founder taktis / Hangat cerita) dan
                  otomatis pangkas buzzword (&ldquo;revolusioner&rdquo;,
                  &ldquo;game changer&rdquo;). Atur di satu ruang kerja: Radar
                  Tren, Bank Konten, Studio Konten, dan Kalender Rilis.
                </span>
              </li>
              <li className="flex gap-3 text-[#141413]">
                <span aria-hidden="true" style={{ color: '#4a6fa5' }}>
                  —
                </span>
                <span>
                  Kuota 100 scan/bulan (reset tiap awal bulan), tracking kuota
                  live di sidebar. Contoh verified: &ldquo;B2B SaaS Marketing&rdquo;
                  menghasilkan 6 kartu, generate brief 3 nada + visual concept
                  dalam ~30 detik.
                </span>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-[#e8e6dc] flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <a
                href="https://cadence.kuonstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display font-semibold text-[#141413] hover:text-[#4a6fa5] transition-colors"
              >
                Visit live app &rarr;
              </a>
              <p className="text-[15px] text-[#141413]/60">
                cadence.kuonstudio.com. Indonesian UI. Masuk via kode email
                6-digit (Brevo OTP, 5 menit).
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
