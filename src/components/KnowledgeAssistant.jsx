import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { knowledgeBase, samplePrompts } from '../data/knowledgeBase.js';
import { t } from '../data/translations.js';
import { Card, Chip, Eyebrow } from './ui/index.js';

export function KnowledgeAssistant() {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState([]);

  const ask = (text) => {
    const q = text.trim();
    if (!q) return;
    const match = bestMatch(q);
    setHistory((h) => [...h, { q, match }]);
    setQuery('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    ask(query);
  };

  const examples = useMemo(() => samplePrompts.slice(0, 5), []);

  return (
    <Card tone="paper" stroke="thick" pad="md" shadow="sm" className="relative">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Chip tone="mint" size="md">{t.sections.knowledge}</Chip>
          <h3 className="mt-2 text-lg font-extrabold text-ink">
            Ichki qoidalarga oid savol bering
          </h3>
          <p className="mt-0.5 text-sm font-semibold text-ink-2">
            {t.sections.knowledgeHint} — AML v2.4, KYC, ABS qoʻllanma, IB, HR.
          </p>
        </div>
      </div>

      <div className="mt-4 max-h-[260px] space-y-2.5 overflow-y-auto scrollbar-thin pr-1">
        <AnimatePresence initial={false}>
          {history.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1.5"
            >
              <div className="flex justify-end">
                <Card
                  tone="white"
                  stroke="thin"
                  radius="sm"
                  pad="sm"
                  className="ml-auto max-w-[85%] text-sm font-semibold text-ink"
                >
                  {item.q}
                </Card>
              </div>
              <Card
                tone="white"
                stroke="thin"
                radius="sm"
                pad="sm"
              >
                {item.match ? (
                  <>
                    <Eyebrow>{item.match.citation}</Eyebrow>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-ink">
                      {item.match.answer}
                    </p>
                  </>
                ) : (
                  <p className="text-sm font-medium text-ink-2">
                    Bu savolga javob bazada topilmadi. Sec Ops yoki menejeringizga murojaat qiling.
                  </p>
                )}
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {history.length === 0 && (
          <div className="rounded-sm border-[2.5px] border-dashed border-line/35 bg-cream px-3 py-3">
            <Eyebrow>{t.sections.askExample}</Eyebrow>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {examples.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => ask(p)}
                  className="cursor-pointer"
                >
                  <Chip
                    tone="white"
                    size="md"
                    uppercase={false}
                    className="cursor-pointer hover:bg-butter"
                  >
                    {p}
                  </Chip>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={onSubmit}
        className="mt-3 flex items-center gap-2 rounded-pill border-[2.5px] border-line bg-white px-3 py-1.5 shadow-plush-tiny focus-within:bg-cream"
      >
        <SearchIcon />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Savolingizni yozing yoki "
          className="flex-1 bg-transparent text-sm font-semibold text-ink placeholder:text-ink-soft focus:outline-none"
        />
        <kbd className="kbd">Enter</kbd>
      </form>
    </Card>
  );
}

function bestMatch(q) {
  const query = q.toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const item of knowledgeBase) {
    const haystack = (item.question + ' ' + item.tags.join(' ')).toLowerCase();
    const tokens = query.split(/\s+/).filter((tok) => tok.length > 2);
    const score = tokens.reduce((s, tok) => (haystack.includes(tok) ? s + 1 : s), 0);
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }
  return bestScore > 0 ? best : null;
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 flex-none" fill="none">
      <circle cx="11" cy="11" r="6" stroke="#2B1E16" strokeWidth="2.5" />
      <path
        d="M16 16l4 4"
        stroke="#2B1E16"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
