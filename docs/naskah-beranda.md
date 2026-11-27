# Naskah beranda Kuon Studio

Draf editorial, 28 November 2026. Bagian Indonesia dan Inggris di bawah ini adalah naskah yang sudah dipakai di beranda. Catatan riset di akhir bukan bagian dari halaman.

## Bahasa Indonesia

Navigasi: Kuon AI · Contoh agent · Karya · Kontak · tombol "Bahas proyek"

### Software studio · Jakarta

# Kami membuat AI agent untuk tim penjualan, layanan pelanggan, dan operasional.

Kalau pesanan masuk lewat WhatsApp, siapa yang menyalinnya ke daftar pesanan? Kami membuat agent yang mencatat pesanan dan menyiapkan balasan di alat yang sudah timmu pakai.

[Bahas proyek lewat WhatsApp](https://wa.me/62818833831) · [Coba Kuon AI](#kuon)

Pilot 2 minggu · Staf yang menyetujui · Kode dan data milikmu

### Kuon AI, model bahasa yang kami latih sendiri.

Kami melatih Kuon untuk bahasa Indonesia dan Inggris. Coba beri Kuon dua angka penjualan, lalu bandingkan jawabannya dengan hitunganmu sendiri. Kuon berjalan di server biasa tanpa GPU dan tanpa biaya per token.

Hitungan pasti · Bertanya dulu · Bisa di servermu

Catatan kecil: Kuon masih model kecil. Periksa angka dan keputusan penting sebelum dipakai.

### Satu pesanan masuk, satu balasan siap dikirim.

Agent membaca pesanan, mengecek stok, lalu menyiapkan balasan dan catatan pesanan. Staf toko bisa mengubah balasan sebelum mengirimnya.

*Contoh ilustrasi. Alur, data, dan batasnya disesuaikan saat lingkup kerja.*

### Tiga cara kami mulai.

- Agent operasional: mencatat pesanan, menyiapkan balasan, dan merekap harian, dengan staf yang menyetujui setiap tindakan.
- Asisten dari dokumenmu: tanya-jawab dari SOP, katalog, dan kontrak. Jawaban menunjuk sumbernya dan bilang "tidak tahu" kalau tidak ada.
- Integrasi ke sistem yang ada: audit bagian yang layak diotomasi, sambung lewat API, dan perkiraan biaya AI per bulan.

### Agent dan model yang kami bangun dan jalankan sendiri.

Kuon 1, Selisik, dan Cadence. Masing-masing cukup satu paragraf, tiga poin, dan tautan ke produknya.

### Mulai dari satu pekerjaan. Ukur hasilnya sebelum lanjut.

Tiga langkah pilot: sepakati lingkup, agent dipakai tim, lalu ukur dan putuskan. Harga tetap setelah lingkup kerja disepakati.

Tautan kecil ke [Cek kesiapan AI](/cek-kesiapan) untuk yang belum tahu mulai dari mana.

### Pekerjaan apa yang masih sering timmu ulang?

Ceritakan satu contoh dan alat yang dipakai timmu sekarang. Kalau cocok, kita sepakati biaya tetap untuk uji coba dua minggu.

## English

Navigation: Kuon AI · Agent example · Our work · Contact · "Start a project"

### Software studio · Jakarta

# We build AI agents for sales, customer service and operations teams.

When an order comes in on WhatsApp, who copies it into the order sheet? We build agents that log the order and draft a reply in the tools your team already uses.

[Discuss a project on WhatsApp](https://wa.me/62818833831) · [Try Kuon AI](#kuon)

2-week pilot · Your staff approve · You own the code

### Kuon AI, a language model we trained ourselves.

We trained Kuon in Indonesian and English. Give it two weeks of sales figures, then check its answer against your own. Kuon runs on an ordinary server with no GPU and no per-token bill.

Exact arithmetic · Asks first · On your server

Small note: Kuon is still a small model. Check important numbers and decisions before you rely on it.

### One order comes in, one reply is ready to send.

The agent reads the order, checks stock, then drafts a reply and an order record. Someone at the shop can edit the reply before sending it.

*Illustrative example. Flow, data, and limits are set during scoping.*

### Three ways we start.

- Operations agent: logs orders, drafts replies, and writes the daily recap, with your staff approving every action.
- Assistant from your documents: answers from your SOPs, catalog, and contracts, with the source document linked.
- Integration with what you run: audit what is worth automating, connect through your APIs, estimate the monthly AI cost.

### Agents and models we build and run ourselves.

Kuon 1, Selisik, Cadence. One paragraph, three points, and a link to each product.

### Start with one job. Measure it before you go further.

Three pilot steps: agree the scope, your team uses it, then measure and decide. Fixed price once the scope is agreed.

A small link to [Check AI readiness](/cek-kesiapan).

### What's one task your team keeps doing by hand?

Send us an example and tell us which tools you use. If it's a good fit, we'll agree on a fixed price for a two-week pilot.

## Catatan riset dan keputusan editorial

| Temuan | Keputusan untuk beranda |
| --- | --- |
| [Beranda lama](https://kuonstudio.com/) membuka dengan demo, lalu memperkenalkan studio. Pembaca menemukan pesanan WhatsApp dalam penjelasan studio, simulasi agent, layanan, dan contoh industri. | Kenalkan studio lewat satu pekerjaan. Pakai kembali pesanan yang sama untuk menunjukkan kapan staf memeriksa balasan. Ini ilustrasi, bukan cerita pelanggan. |
| [Common Knowledge](https://www.commonknowledge.coop/) menjelaskan bidang kerja studionya sebelum menampilkan Mapped. Deskripsi Mapped menyebut apa yang berubah bagi pemakai: daftar anggota menjadi peta bersama. | Beri Kuon AI tempat tepat setelah pembuka. Sebut siapa yang melatihnya dan beri satu pertanyaan yang jawabannya bisa diperiksa. Rincian model dan cara pasang tetap di halaman demo. |
| [Panduan penulisan antarmuka GOV.UK](https://www.gov.uk/service-manual/design/writing-for-user-interfaces) menyarankan satu gagasan per kalimat dan teks tautan yang menjelaskan tujuannya. | Gunakan "Bahas proyek lewat WhatsApp" untuk calon klien dan "Coba Kuon AI" untuk pengunjung yang ingin mencoba model. Kuis lima pertanyaan pindah ke `/cek-kesiapan`; pengunjung bisa memulai dari satu contoh. |
| [Dokumentasi Kuon](https://github.com/virhanali/kuon-llm#readme) menyebut Kuon sebagai model eksperimental. [Catatan evaluasi di repo lokal](../../kuon/README.md#kuon-1-release-evaluation-stage-3-v42-fp32--int8-identical) memisahkan hasil kalibrasi 15/16 dari nilai rubrik pekerjaan bisnis 34/36. | Hapus "15/16 · 94,4%": 15/16 setara dengan 93,75%; 94,4% berasal dari rubrik lain. Jangan gunakan hasil Kuon 1 untuk menjual Kuon-2. Pertanyaan omzet di atas adalah masukan contoh, bukan kutipan jawaban model. |
| [Bagian karya dan pilot lama](https://kuonstudio.com/#work) memberi empat layanan, empat contoh industri, dan dua bagian terpisah soal pilot serta keamanan. | Layanan diringkas jadi tiga kartu satu kalimat. Contoh industri dihapus karena mengulang alur pesanan. Pilot dan keamanan digabung jadi satu bagian. |

Riset ini membandingkan isi halaman dan dokumentasi, bukan perilaku pengunjung. Belum ada uji dengan calon klien yang menunjukkan naskah mana yang lebih mudah dipahami.
