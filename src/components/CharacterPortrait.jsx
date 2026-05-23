import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MOOD_BG = {
  angry: '#FFB3C0',
  neutral: '#A6D8FF',
  calm: '#FFD86B',
  satisfied: '#A8E5C8',
};

const MOOD_BROW_TILT = {
  angry: -14,
  neutral: 0,
  calm: 4,
  satisfied: 8,
};

const MOOD_MOUTH = {
  angry: 'frown',
  neutral: 'flat',
  calm: 'soft',
  satisfied: 'smile',
};

export function CharacterPortrait({ speaker, mood = 'neutral', isSpeaking, isThinking, name }) {
  const isMentor = speaker === 'mentor';
  const bg = isMentor ? '#A8E5C8' : MOOD_BG[mood] ?? MOOD_BG.neutral;
  const browTilt = isMentor ? 0 : MOOD_BROW_TILT[mood] ?? 0;
  const mouthShape = isMentor ? 'smile' : MOOD_MOUTH[mood] ?? 'flat';

  return (
    <motion.div
      animate={{ y: isSpeaking ? [0, -2, 0] : 0 }}
      transition={
        isSpeaking
          ? { duration: 0.45, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 0.3 }
      }
      className="relative flex h-[140px] items-end justify-center overflow-hidden border-b-[3px] border-line"
      style={{ background: bg }}
    >
      <Doodles />
      <div className="relative z-10 -mb-2">
        {isMentor ? (
          <MentorFace
            isSpeaking={isSpeaking}
            isThinking={isThinking}
          />
        ) : (
          <ClientFace
            mood={mood}
            browTilt={browTilt}
            mouthShape={mouthShape}
            isSpeaking={isSpeaking}
            isThinking={isThinking}
          />
        )}
      </div>
      <NameTag name={name} />
      {isThinking && <ThinkingCloud isMentor={isMentor} />}
    </motion.div>
  );
}

function ClientFace({ browTilt, mouthShape, isSpeaking, isThinking }) {
  const blink = useBlink();
  const mouth = useMouthAnimation(isSpeaking);
  const eyeRy = blink ? 0.6 : 6;
  return (
    <svg
      viewBox="0 0 140 140"
      width="120"
      height="120"
      className="drop-shadow-[0_4px_0_rgba(43,30,22,0.18)]"
    >
      <ellipse cx="70" cy="118" rx="40" ry="6" fill="rgba(43,30,22,0.18)" />
      <path
        d="M30 92 Q30 50 70 50 Q110 50 110 92 L110 122 Q70 138 30 122 Z"
        fill="#FFD7B5"
        stroke="#2B1E16"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M30 60 Q30 22 70 22 Q110 22 110 60 Q104 48 90 44 Q70 38 50 44 Q36 48 30 60 Z"
        fill="#3A2818"
        stroke="#2B1E16"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="48" cy="74" r="10" fill="white" stroke="#2B1E16" strokeWidth="2.5" />
      <circle cx="92" cy="74" r="10" fill="white" stroke="#2B1E16" strokeWidth="2.5" />
      <ellipse cx="48" cy="76" rx="3" ry={eyeRy} fill="#2B1E16" />
      <ellipse cx="92" cy="76" rx="3" ry={eyeRy} fill="#2B1E16" />
      <g transform={`rotate(${browTilt}, 48, 60)`}>
        <path
          d="M38 60 Q48 56 58 60"
          stroke="#2B1E16"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      <g transform={`rotate(${-browTilt}, 92, 60)`}>
        <path
          d="M82 60 Q92 56 102 60"
          stroke="#2B1E16"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      <ellipse cx="40" cy="88" rx="6" ry="3" fill="#FF9DAA" opacity="0.55" />
      <ellipse cx="100" cy="88" rx="6" ry="3" fill="#FF9DAA" opacity="0.55" />
      <Mouth shape={mouthShape} openAmount={mouth} />
      {isThinking && (
        <g>
          <circle cx="110" cy="40" r="4" fill="white" stroke="#2B1E16" strokeWidth="2" />
          <circle cx="118" cy="32" r="3" fill="white" stroke="#2B1E16" strokeWidth="2" />
        </g>
      )}
    </svg>
  );
}

function MentorFace({ isSpeaking, isThinking }) {
  const blink = useBlink(3000);
  const mouth = useMouthAnimation(isSpeaking);
  const eyeRy = blink ? 0.6 : 5;
  return (
    <svg viewBox="0 0 140 140" width="120" height="120" className="drop-shadow-[0_4px_0_rgba(43,30,22,0.18)]">
      <ellipse cx="70" cy="118" rx="40" ry="6" fill="rgba(43,30,22,0.18)" />
      <rect
        x="26"
        y="40"
        width="88"
        height="86"
        rx="20"
        fill="#FFFAF0"
        stroke="#2B1E16"
        strokeWidth="3.5"
      />
      <rect x="48" y="26" width="44" height="20" rx="10" fill="#5FCFA0" stroke="#2B1E16" strokeWidth="3" />
      <circle cx="56" cy="22" r="4" fill="#FFD86B" stroke="#2B1E16" strokeWidth="2.5" />
      <circle cx="84" cy="22" r="4" fill="#FFB68A" stroke="#2B1E16" strokeWidth="2.5" />
      <circle cx="52" cy="74" r="10" fill="#A6D8FF" stroke="#2B1E16" strokeWidth="2.5" />
      <circle cx="88" cy="74" r="10" fill="#A6D8FF" stroke="#2B1E16" strokeWidth="2.5" />
      <ellipse cx="52" cy="74" rx="3" ry={eyeRy} fill="#2B1E16" />
      <ellipse cx="88" cy="74" rx="3" ry={eyeRy} fill="#2B1E16" />
      <path
        d="M44 62 L58 60"
        stroke="#2B1E16"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M96 60 L82 62"
        stroke="#2B1E16"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <Mouth shape="smile" openAmount={mouth} cx={70} cy={102} />
      <rect x="58" y="116" width="24" height="6" rx="3" fill="#5FCFA0" stroke="#2B1E16" strokeWidth="2.5" />
      {isThinking && (
        <g>
          <circle cx="110" cy="40" r="4" fill="white" stroke="#2B1E16" strokeWidth="2" />
          <circle cx="118" cy="32" r="3" fill="white" stroke="#2B1E16" strokeWidth="2" />
        </g>
      )}
    </svg>
  );
}

function Mouth({ shape, openAmount = 0, cx = 70, cy = 100 }) {
  const open = 2 + openAmount * 8;
  if (shape === 'frown') {
    return (
      <path
        d={`M${cx - 16} ${cy + open / 2} Q${cx} ${cy - 6} ${cx + 16} ${cy + open / 2}`}
        stroke="#2B1E16"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="#7C2D12"
      />
    );
  }
  if (shape === 'smile') {
    return (
      <path
        d={`M${cx - 16} ${cy - open / 2} Q${cx} ${cy + 10 + open / 2} ${cx + 16} ${cy - open / 2}`}
        stroke="#2B1E16"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="#7C2D12"
      />
    );
  }
  if (shape === 'soft') {
    return (
      <path
        d={`M${cx - 12} ${cy} Q${cx} ${cy + 4 + open / 2} ${cx + 12} ${cy}`}
        stroke="#2B1E16"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="#7C2D12"
      />
    );
  }
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx="10"
      ry={1.5 + open / 2}
      fill="#7C2D12"
      stroke="#2B1E16"
      strokeWidth="3"
    />
  );
}

function NameTag({ name }) {
  if (!name) return null;
  return (
    <div className="absolute bottom-2 left-3 z-20">
      <span
        className="inline-flex items-center gap-1.5 rounded-full border-[2.5px] border-line bg-white px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-ink shadow-plush-tiny"
      >
        {name}
      </span>
    </div>
  );
}

function ThinkingCloud({ isMentor }) {
  return (
    <div className="absolute right-3 top-3 z-20">
      <span
        className="inline-flex items-center gap-1 rounded-full border-[2.5px] border-line bg-white px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-ink shadow-plush-tiny"
      >
        <motion.span
          className="inline-block h-1.5 w-1.5 rounded-full bg-ink"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.9, repeat: Infinity }}
        />
        {isMentor ? 'O ylanmoqda' : 'Eshityapti'}
      </span>
    </div>
  );
}

function Doodles() {
  return (
    <>
      <span className="absolute left-3 top-3 inline-block h-2 w-2 rounded-full bg-line/40" />
      <span className="absolute right-8 top-6 inline-block h-1.5 w-1.5 rounded-full bg-line/30" />
      <span className="absolute left-10 bottom-6 inline-block h-1.5 w-1.5 rounded-full bg-line/30" />
      <span className="absolute right-4 bottom-10 inline-block h-2 w-2 rounded-full bg-line/40" />
    </>
  );
}

function useBlink(interval = 3500) {
  const [blink, setBlink] = useState(false);
  const timerRef = useRef();
  useEffect(() => {
    const tick = () => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 140);
      timerRef.current = window.setTimeout(tick, interval + Math.random() * 1500);
    };
    timerRef.current = window.setTimeout(tick, interval + Math.random() * 1500);
    return () => window.clearTimeout(timerRef.current);
  }, [interval]);
  return blink;
}

function useMouthAnimation(isSpeaking) {
  const [open, setOpen] = useState(0);
  useEffect(() => {
    if (!isSpeaking) {
      setOpen(0);
      return;
    }
    let raf;
    let t = 0;
    const tick = () => {
      t += 0.18;
      const value =
        (Math.sin(t * 5.2) * 0.5 + 0.5) * (0.6 + Math.sin(t * 1.7) * 0.3);
      setOpen(Math.max(0, value));
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [isSpeaking]);
  return open;
}
