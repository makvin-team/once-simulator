import { useEffect, useRef } from 'react';

export function VoiceWaveform({ active, bars = 28, color = '#FF8E5C' }) {
  const refs = useRef([]);

  useEffect(() => {
    if (!active) {
      refs.current.forEach((el) => {
        if (el) el.style.transform = 'scaleY(0.18)';
      });
      return;
    }
    let raf;
    let t = 0;
    const tick = () => {
      t += 0.16;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const phase = i * 0.38 + t;
        const v =
          0.25 +
          Math.abs(Math.sin(phase) * 0.5 + Math.sin(phase * 1.7) * 0.25 + Math.random() * 0.15);
        el.style.transform = `scaleY(${Math.min(1, v)})`;
      });
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [active]);

  return (
    <div className="flex items-end gap-[3px] h-6">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          ref={(el) => (refs.current[i] = el)}
          className="block w-[3px] rounded-full origin-bottom transition-transform duration-100"
          style={{
            height: '100%',
            background: color,
            transform: 'scaleY(0.18)',
          }}
        />
      ))}
    </div>
  );
}
