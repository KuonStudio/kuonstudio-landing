import { useCopy } from '@/lib/i18n';

const ACCENTS = ['#d97757', '#6a9bcc', '#788c5d', '#141413'];
const TEXT = ['#b4532f', '#3f6f9f', '#5f7148', '#5f5e58'];

const COPY = {
  id: {
    eyebrow: 'Contoh per jenis usaha',
    title: 'Apa yang diambil alih agent, apa yang tetap dipegang manusia.',
    agent: 'Agent mengerjakan',
    human: 'Timmu tetap',
    cases: [
      {
        name: 'F&B dan toko online',
        agent: 'Membaca pesanan dari WhatsApp dan marketplace, cek stok, menyiapkan balasan dan rekap harian.',
        human: 'Menyetujui balasan, menangani komplain, menentukan promo.',
      },
      {
        name: 'Klinik, salon, dan jasa booking',
        agent: 'Mencari slot kosong, menyiapkan konfirmasi dan pengingat, merapikan catatan kunjungan.',
        human: 'Keputusan medis atau layanan, kasus khusus, jadwal staf.',
      },
      {
        name: 'Distributor dan grosir',
        agent: 'Membaca PO dan invoice dari PDF atau foto, mengisi ke sistem, menandai yang tidak cocok.',
        human: 'Memeriksa selisih, harga khusus, dan kredit pelanggan.',
      },
      {
        name: 'Agensi dan tim sales',
        agent: 'Riset calon klien, skor kecocokan, menyusun draf pesan pertama dan follow-up.',
        human: 'Memilih siapa yang dihubungi, negosiasi, menutup deal.',
      },
    ],
  },
  en: {
    eyebrow: 'Use cases',
    title: 'What the agent takes over, and what stays with people.',
    agent: 'The agent does',
    human: 'Your team keeps',
    cases: [
      {
        name: 'F&B and online shops',
        agent: 'Reads orders from WhatsApp and marketplaces, checks stock, prepares replies and a daily recap.',
        human: 'Approving replies, handling complaints, deciding promotions.',
      },
      {
        name: 'Clinics, salons, and booking services',
        agent: 'Finds open slots, prepares confirmations and reminders, tidies visit notes.',
        human: 'Medical or service decisions, special cases, staff schedules.',
      },
      {
        name: 'Distributors and wholesale',
        agent: 'Reads POs and invoices from PDFs or photos, enters them into your system, flags mismatches.',
        human: 'Checking discrepancies, special prices, and customer credit.',
      },
      {
        name: 'Agencies and sales teams',
        agent: 'Researches prospects, scores fit, drafts first messages and follow-ups.',
        human: 'Choosing who to contact, negotiating, closing.',
      },
    ],
  },
};

const UseCasesSection = () => {
  const c = useCopy(COPY);
  return (
    <section id="use-cases" className="py-16 md:py-24">
      <div className="wrap">
        <p className="eyebrow">{c.eyebrow}</p>
        <h2 className="mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413] max-w-3xl">{c.title}</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {c.cases.map((u, i) => (
            <article key={u.name} className="card-studio">
              <div className="card-accent" style={{ background: ACCENTS[i] }} aria-hidden="true" />
              <h3 className="font-display font-semibold text-xl text-[#141413]">{u.name}</h3>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="font-display text-sm font-semibold" style={{ color: TEXT[i] }}>
                    {c.agent}
                  </dt>
                  <dd className="mt-1 text-[#141413]">{u.agent}</dd>
                </div>
                <div className="pt-4 border-t border-[#e8e6dc]">
                  <dt className="font-display text-sm font-semibold text-[#141413]/60">{c.human}</dt>
                  <dd className="mt-1 text-[#141413]/70">{u.human}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
