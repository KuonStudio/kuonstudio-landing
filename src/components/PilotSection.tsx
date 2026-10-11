import { useCopy } from '@/lib/i18n';
import { waLink } from '@/lib/contact';

const COPY = {
  id: {
    eyebrow: 'Mulai kecil',
    title: 'Pilot AI 2 minggu: satu alur kerja, hasilnya diukur.',
    body: 'Tidak perlu langsung mengubah semuanya. Kita pilih satu pekerjaan berulang, bangun agent-nya, dan ukur hasilnya di lapangan sebelum memutuskan langkah berikutnya.',
    steps: [
      { period: 'Minggu 1', title: 'Scope bersama', text: 'Dua panggilan dan dokumen singkat: alur yang dipilih, data yang dibutuhkan, batas yang tidak boleh dilewati agent, dan cara mengukur hasil. Kamu dapat scope dan harga tetap.' },
      { period: 'Minggu 2', title: 'Agent dipakai tim', text: 'Agent jalan di alat yang sudah kamu pakai, dengan tombol setuju/ubah. Kami pantau bersama timmu dan perbaiki setiap hari.' },
      { period: 'Akhir pilot', title: 'Ukur, lalu putuskan', text: 'Laporan sebelum-sesudah dari data pilot: waktu yang dihemat, kesalahan, dan biaya AI per bulan. Lanjut, ubah, atau berhenti, keputusannya di kamu.' },
    ],
    price: 'Harga tetap setelah scope. Tidak ada tagihan yang membengkak di tengah jalan.',
    receipt: 'Struk pilot',
    receiptLines: [
      ['Alur kerja', '1'],
      ['Durasi', '2 minggu'],
      ['Batas agent', 'minggu 1'],
      ['Harga tetap', 'minggu 1'],
      ['Laporan', 'sebelum vs sesudah'],
      ['Kode dan data', 'milikmu'],
    ],
    receiptTotal: ['Keputusan lanjut', 'di kamu'],
    book: 'Booking pilot lewat WhatsApp',
    bookText: 'Halo Kuon Studio, saya mau booking pilot 2 minggu. Pekerjaan yang mau saya serahkan ke agent: ',
    trustTitle: 'Aman dipakai untuk bisnis',
    trust: [
      { title: 'Manusia yang menyetujui', text: 'Agent tidak mengirim, membayar, atau menghapus apa pun tanpa persetujuan staf.' },
      { title: 'Jejak lengkap', text: 'Setiap langkah agent tercatat: apa yang dibaca, apa yang diusulkan, siapa yang menyetujui.' },
      { title: 'Data tetap milikmu', text: 'Data disimpan di akunmu. Kami memakai layanan AI yang kebijakannya tidak melatih model dari data API, dan menunjukkan kebijakan itu saat scope.' },
      { title: 'Biaya terbuka', text: 'Perkiraan biaya AI per bulan diberikan sebelum dibangun, lalu dipantau di dashboard.' },
    ],
  },
  en: {
    eyebrow: 'Start small',
    title: 'A 2-week AI pilot: one workflow, measured results.',
    body: 'No need to change everything at once. We pick one repetitive task, build the agent, and measure it in real use before you decide the next step.',
    steps: [
      { period: 'Week 1', title: 'Scope together', text: 'Two calls and a short doc: the workflow, the data it needs, the limits the agent must not cross, and how we measure results. You get a fixed scope and price.' },
      { period: 'Week 2', title: 'Your team uses it', text: 'The agent runs in the tools you already use, with approve/edit buttons. We watch it with your team and improve it daily.' },
      { period: 'End of pilot', title: 'Measure, then decide', text: 'A before-and-after report from pilot data: time saved, errors, and monthly AI cost. Continue, adjust, or stop, the call is yours.' },
    ],
    price: 'Fixed price after scoping. No bills that grow halfway through.',
    receipt: 'Pilot receipt',
    receiptLines: [
      ['Workflows', '1'],
      ['Duration', '2 weeks'],
      ['Agent limits', 'week 1'],
      ['Fixed price', 'week 1'],
      ['Report', 'before vs after'],
      ['Code and data', 'yours'],
    ],
    receiptTotal: ['Whether to continue', 'your call'],
    book: 'Book a pilot on WhatsApp',
    bookText: 'Hi Kuon Studio, I would like to book a 2-week pilot. The work I want to hand to the agent: ',
    trustTitle: 'Safe to use in a business',
    trust: [
      { title: 'Humans approve', text: 'The agent does not send, pay, or delete anything without staff approval.' },
      { title: 'Full trail', text: 'Every agent step is logged: what it read, what it proposed, who approved it.' },
      { title: 'Your data stays yours', text: 'Data lives in your accounts. We use AI services whose policies exclude API data from model training, and show you those policies during scoping.' },
      { title: 'Open costs', text: 'Estimated monthly AI cost before we build, then tracked on a dashboard.' },
    ],
  },
};

const PilotSection = () => {
  const c = useCopy(COPY);
  return (
    <section id="process" className="py-16 md:py-24 bg-white border-y border-[#e8e6dc]">
      <div className="wrap">
        <p className="eyebrow">{c.eyebrow}</p>
        <h2 className="mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413] max-w-3xl">{c.title}</h2>
        <p className="mt-4 text-lg text-[#141413]/70">{c.body}</p>

        <ol className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {c.steps.map((step, index) => (
            <li key={step.title} className="card-studio">
              <p className="font-display font-semibold text-sm text-[#b4532f]">
                {index + 1}. {step.period}
              </p>
              <h3 className="mt-2 font-display font-semibold text-lg text-[#141413]">{step.title}</h3>
              <p className="mt-2 text-[#141413]/70">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_22rem] gap-8 items-start">
          <div>
            <p className="font-display font-semibold text-[#141413]">{c.price}</p>
            <a href={waLink(c.bookText)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5">
              {c.book}
            </a>
          </div>
          <figure className="receipt mx-auto w-full max-w-sm lg:max-w-none" aria-label={c.receipt}>
            <figcaption className="text-center font-semibold tracking-[0.2em] uppercase text-xs">Kuon Studio · {c.receipt}</figcaption>
            <dl className="mt-4 border-t border-dashed border-[#141413]/30 pt-3 space-y-1.5">
              {c.receiptLines.map(([k, v]) => (
                <div key={k} className="flex items-baseline gap-2">
                  <dt className="shrink-0">{k}</dt>
                  <span className="flex-1 border-b border-dotted border-[#141413]/30 translate-y-[-3px]" aria-hidden="true" />
                  <dd className="text-right whitespace-nowrap">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 border-t border-dashed border-[#141413]/30 pt-3 flex items-baseline justify-between gap-2 font-semibold">
              <span>{c.receiptTotal[0]}</span>
              <span>{c.receiptTotal[1]}</span>
            </div>
          </figure>
        </div>

        <div className="mt-12 bg-[#e8e6dc]/50 border border-[#e8e6dc] rounded-2xl p-7 md:p-10">
          <h3 className="font-display font-semibold text-xl text-[#141413]">{c.trustTitle}</h3>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.trust.map((item) => (
              <div key={item.title}>
                <p className="font-display font-semibold text-[#141413]">{item.title}</p>
                <p className="mt-1.5 text-[#141413]/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PilotSection;
