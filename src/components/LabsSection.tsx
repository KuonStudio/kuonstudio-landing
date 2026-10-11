import { useCopy } from '@/lib/i18n';

const ACCENTS = ['#d97757', '#6a9bcc', '#788c5d', '#141413'];

const COPY = {
  id: {
    eyebrow: 'Layanan',
    title: 'Empat cara kami membantu bisnismu pindah ke AI.',
    body: 'Pilih satu. Setiap proyek selesai dengan kode, dokumentasi, dan sesi serah terima.',
    services: [
      {
        title: 'AI agent untuk operasional',
        summary: 'Agent yang mengerjakan alur kerja berulang, dengan staf yang menyetujui.',
        includes: ['Balas pesanan, booking, dan pertanyaan pelanggan', 'Rekap harian dan laporan dari data yang ada', 'Semua tindakan menunggu persetujuan dan tercatat'],
        fit: 'Cocok kalau timmu mengetik hal yang sama setiap hari.',
      },
      {
        title: 'Asisten dari dokumenmu sendiri',
        summary: 'Tanya-jawab yang menjawab dari SOP, katalog, dan kontrak milikmu, lengkap dengan rujukan.',
        includes: ['Jawaban menunjuk dokumen sumbernya', 'Hanya membaca dokumen yang kamu izinkan', 'Bilang "tidak tahu" kalau jawabannya tidak ada'],
        fit: 'Cocok kalau pertanyaan staf baru selalu jatuh ke orang yang sama.',
      },
      {
        title: 'Rapikan data dulu',
        summary: 'Agent butuh data yang rapi. Pesanan, stok, dan pelanggan dijadikan satu sumber.',
        includes: ['Pindah dari spreadsheet ke satu sistem', 'Backup otomatis setiap hari', 'Hak akses per peran'],
        fit: 'Cocok kalau datamu masih tersebar di chat dan spreadsheet.',
      },
      {
        title: 'Tambah AI ke sistem yang sudah ada',
        summary: 'Sistemmu sudah jalan, tinggal diberi kemampuan AI tanpa dibongkar ulang.',
        includes: ['Audit singkat: bagian mana yang layak diotomasi', 'Integrasi lewat API yang sudah ada', 'Perkiraan biaya AI per bulan sebelum dibangun'],
        fit: 'Cocok kalau kamu tidak mau ganti sistem, hanya mau lebih cepat.',
      },
    ],
  },
  en: {
    eyebrow: 'Services',
    title: 'Four ways we help your business move to AI.',
    body: 'Pick one. Every engagement ends with code, docs, and a handover session.',
    services: [
      {
        title: 'AI agents for operations',
        summary: 'Agents that run repetitive workflows, with staff approving.',
        includes: ['Replies to orders, bookings, and customer questions', 'Daily recaps and reports from your existing data', 'Every action waits for approval and is logged'],
        fit: 'Good if your team types the same things every day.',
      },
      {
        title: 'Assistant built on your documents',
        summary: 'Q&A that answers from your own SOPs, catalog, and contracts, with references.',
        includes: ['Answers point to the source document', 'Reads only the documents you allow', 'Says "I don’t know" when the answer is not there'],
        fit: 'Good if new-staff questions always land on the same person.',
      },
      {
        title: 'Clean up the data first',
        summary: 'Agents need tidy data. Orders, stock, and customers in one source.',
        includes: ['Move from spreadsheets to one system', 'Automatic daily backups', 'Access levels per role'],
        fit: 'Good if your data still lives in chats and spreadsheets.',
      },
      {
        title: 'Add AI to what you already run',
        summary: 'Your system works; give it AI abilities without rebuilding it.',
        includes: ['Short audit: which parts are worth automating', 'Integration through your existing APIs', 'Estimated monthly AI cost before we build'],
        fit: 'Good if you want speed, not a new system.',
      },
    ],
  },
};

const LabsSection = () => {
  const c = useCopy(COPY);
  return (
    <section id="services" className="py-16 md:py-24 bg-white border-y border-[#e8e6dc]">
      <div className="wrap">
        <p className="eyebrow">{c.eyebrow}</p>
        <h2 className="mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413]">{c.title}</h2>
        <p className="mt-4 text-lg text-[#141413]/70">{c.body}</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {c.services.map((service, i) => (
            <article key={service.title} className="card-studio">
              <div className="card-accent" style={{ background: ACCENTS[i] }} aria-hidden="true" />
              <h3 className="font-display font-semibold text-xl text-[#141413]">{service.title}</h3>
              <p className="mt-2 text-[#141413]/70">{service.summary}</p>
              <ul className="mt-5 space-y-2.5">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-[#141413]">
                    <span aria-hidden="true" style={{ color: ACCENTS[i] }}>
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 pt-4 border-t border-[#e8e6dc] text-[15px] text-[#141413]/60">{service.fit}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabsSection;
