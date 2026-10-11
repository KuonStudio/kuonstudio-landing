import type { Lang } from '@/lib/i18n';

/**
 * Real numbers only. Every section that reads from this file renders nothing
 * while its list is empty, so the page never shows a placeholder or a guess.
 * Fill these from the Selisik/Cadence databases and from pilot reports.
 */

type Text = Record<Lang, string>;

/** One line of the strip under the hero, e.g. { value: '1.284', label: { id: 'calon klien dinilai Selisik', ... } }. */
export interface Counter {
  value: string;
  label: Text;
  /** When the number was taken, shown as a footnote: '11 Okt 2026'. */
  asOf: string;
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

export const COUNTERS: Counter[] = [];
export const RESULTS: Result[] = [];
export const LOG: LogLine[] = [];
