import type { Lang } from '@/lib/i18n';

/**
 * Real numbers only. Every section that reads from this file renders nothing
 * while its list is empty, so the page never shows a placeholder or a guess.
 * Fill these from the Selisik/Cadence databases and from pilot reports.
 */

type Text = Record<Lang, string>;

/** One number in the strip under the hero. */
export interface Counter {
  value: number;
  label: Text;
  /** Date of the data, shown as a footnote. */
  asOf: Text;
}

/** A before/after result from a client pilot. */
export interface Result {
  /** Who it was for. Use a description if the client is not named: 'Toko kosmetik, Bandung'. */
  client: Text;
  task: Text;
  /** Same unit on both sides, so the bars compare. */
  unit: Text;
  before: number;
  after: number;
  /** What stays with people after the agent takes over. */
  human: Text;
  /** Verbatim client quote, if they agreed to it being shown. */
  quote?: Text;
}

/** One line of an anonymised agent log. Include rejected and edited lines too: they show the people deciding. */
export interface LogLine {
  time: string;
  text: Text;
  outcome: 'approved' | 'edited' | 'rejected';
  /** Optional staff note, e.g. why it was rejected. */
  note?: Text;
}

// Selisik, main account, 18 scans from 14 Sep to 8 Oct 2026 (scripts/proof-stats.sh).
// 2,623 search results; 342 leads scored, 14 of them above 5; 198 with a contact found on the source page.
export const COUNTERS: Counter[] = [
  { value: 2623, label: { id: 'halaman bisnis ditemukan Selisik', en: 'business pages found by Selisik' }, asOf: { id: '8 Okt 2026', en: '8 Oct 2026' } },
  { value: 342, label: { id: 'bisnis dinilai satu per satu', en: 'businesses scored one by one' }, asOf: { id: '8 Okt 2026', en: '8 Oct 2026' } },
  { value: 14, label: { id: 'yang cukup cocok untuk dibuatkan pesan', en: 'good enough fits to get a message' }, asOf: { id: '8 Okt 2026', en: '8 Oct 2026' } },
  { value: 198, label: { id: 'kontak, semuanya tertulis di halaman sumber', en: 'contacts, every one written on its source page' }, asOf: { id: '8 Okt 2026', en: '8 Oct 2026' } },
];
export const RESULTS: Result[] = [];
export const LOG: LogLine[] = [];
