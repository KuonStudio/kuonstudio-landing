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
// 2,623 search results, 640 rejected before scoring; 342 leads scored, 14 above 5 (the hero headline);
// 198 leads with a phone or email found on the source page.
const AS_OF = { id: '8 Okt 2026', en: '8 Oct 2026' };
export const COUNTERS: Counter[] = [
  { value: 2623, label: { id: 'halaman bisnis ditemukan', en: 'business pages found' }, asOf: AS_OF },
  { value: 640, label: { id: 'dibuang sebelum dinilai', en: 'dropped before scoring' }, asOf: AS_OF },
  { value: 198, label: { id: 'kontak, semuanya tertulis di halaman sumber', en: 'contacts, each one written on its source page' }, asOf: AS_OF },
];
export const RESULTS: Result[] = [];
export const LOG: LogLine[] = [];
