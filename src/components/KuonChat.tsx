import { useRef, useState } from 'react';
import { useCopy } from '@/lib/i18n';

type Source = { title: string; url?: string };
type Message = { role: 'user' | 'assistant'; content: string; sources?: Source[] };

const API_URL = 'https://api.kuonstudio.com/v1/chat/completions';

const COPY: Record<'id' | 'en', {
  eyebrow: string;
  title: string;
  body: string;
  placeholder: string;
  send: string;
  thinking: string;
  disclaimer: string;
  error: string;
  suggestions: string[];
  intro: string;
}> = {
  id: {
    eyebrow: 'Coba AI KuonStudio',
    title: 'Tanya apa saja. Kuon mencari bukti dulu, lalu menjawab dengan sumber.',
    body: 'Ini chat dengan model Kuon yang kami latih dari nol (13 juta parameter — eksperimental, bukan model raksasa). Agent di belakangnya mencari di Wikipedia dan index lokal, lalu Kuon menyusun jawaban dari bukti itu.',
    placeholder: 'Coba: siapa Mr Beast?',
    send: 'Kirim',
    thinking: 'Kuon sedang mencari bukti…',
    disclaimer: 'Model 13M eksperimental — jawaban bisa terbatas. Sumber selalu ditampilkan.',
    error: 'Maaf, ada gangguan koneksi ke server Kuon. Coba lagi sebentar.',
    suggestions: ['Siapa Mr Beast?', 'Apa itu RAG?', 'Apa itu Kuon Studio?'],
    intro: 'Halo! Aku Kuon — model kecil yang dibangun dari nol. Tanyakan sesuatu; aku akan mencari bukti dulu, lalu menjawab dari bukti itu dengan sitasi.',
  },
  en: {
    eyebrow: 'Try KuonStudio AI',
    title: 'Ask anything. Kuon gathers evidence first, then answers with sources.',
    body: 'This chat runs on Kuon, a model we trained from scratch (13M parameters — experimental, not a giant model). The agent behind it searches Wikipedia and a local index, then Kuon composes the answer from that evidence.',
    placeholder: 'Try: who is Mr Beast?',
    send: 'Send',
    thinking: 'Kuon is gathering evidence…',
    disclaimer: 'Experimental 13M model — answers can be limited. Sources are always shown.',
    error: 'Sorry, the Kuon server did not respond. Please try again in a moment.',
    suggestions: ['Who is Mr Beast?', 'What is RAG?', 'What is Kuon Studio?'],
    intro: 'Hi! I am Kuon — a small model built from scratch. Ask me something; I will gather evidence first, then answer from it with citations.',
  },
};

export default function KuonChat() {
  const copy = useCopy(COPY);
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: copy.intro }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    });
  };

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q || loading) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: q }]);
    setLoading(true);
    scrollToBottom();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'kuon-agent', messages: [{ role: 'user', content: q }] }),
      });
      const data = await response.json();
      const answer = data?.choices?.[0]?.message?.content ?? copy.error;
      const sources: Source[] = data?.x_sources ?? [];
      setMessages((prev) => [...prev, { role: 'assistant', content: answer, sources }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: copy.error }]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  return (
    <section id="coba-kuon" className="border-t border-[#e8e6dc] bg-[#faf9f5] px-6 py-20 md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div>
            <p className="mb-3 font-body text-xs uppercase tracking-[0.2em] text-[#d97757]">{copy.eyebrow}</p>
            <h2 className="font-heading text-3xl leading-tight text-[#141413] md:text-4xl">{copy.title}</h2>
            <p className="mt-4 font-body text-base leading-relaxed text-[#141413]/70">{copy.body}</p>
            <p className="mt-4 font-body text-xs text-[#141413]/50">{copy.disclaimer}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {copy.suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => ask(s)}
                  className="rounded-full border border-[#e8e6dc] bg-white px-4 py-2 font-body text-sm text-[#141413]/80 transition hover:border-[#d97757] hover:text-[#141413]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex h-[32rem] flex-col overflow-hidden rounded-2xl border border-[#e8e6dc] bg-white shadow-sm">
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 font-body text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-[#141413] text-[#faf9f5]'
                        : 'bg-[#faf9f5] text-[#141413] ring-1 ring-[#e8e6dc]'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {!!message.sources?.length && (
                      <div className="mt-3 space-y-1 border-t border-[#e8e6dc] pt-2">
                        {message.sources.map((source, sourceIndex) => (
                          <p key={sourceIndex} className="text-xs text-[#141413]/50">
                            [{sourceIndex + 1}]{' '}
                            {source.url ? (
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noreferrer"
                                className="underline decoration-[#e8e6dc] underline-offset-2 hover:text-[#d97757]"
                              >
                                {source.title}
                              </a>
                            ) : (
                              source.title
                            )}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-[#faf9f5] px-4 py-3 font-body text-sm text-[#141413]/50 ring-1 ring-[#e8e6dc]">
                    {copy.thinking}
                  </div>
                </div>
              )}
            </div>

            <form
              className="flex items-center gap-2 border-t border-[#e8e6dc] p-3"
              onSubmit={(event) => {
                event.preventDefault();
                ask(input);
              }}
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={copy.placeholder}
                disabled={loading}
                className="h-11 flex-1 rounded-full border border-[#e8e6dc] bg-[#faf9f5] px-4 font-body text-sm text-[#141413] outline-none transition focus:border-[#d97757]"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="h-11 rounded-full bg-[#141413] px-6 font-body text-sm text-[#faf9f5] transition hover:bg-[#141413]/90 disabled:opacity-40"
              >
                {copy.send}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
