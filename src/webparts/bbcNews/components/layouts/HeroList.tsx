/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { NewsCard } from '../BbcNews.types';
import Card from '../ui/Card';

type Props = {
  items: NewsCard[];
  /** ms between slides (user-initiated only; default 6000). Set 0 to disable auto-advance entirely. */
  intervalMs?: number;
  /** card variant to render each slide with (defaults to 'hero') */
  variant?: 'hero' | 'grid' | 'teaser' | 'list';
  /** fixed slide height to prevent layout shift */
  heightPx?: number;
  /** start auto-advance immediately (NOT recommended for WCAG 2.2 2.2.2). Default false. */
  autoStart?: boolean;
};

const clamp = (n: number, len: number) => ((n % len) + len) % len;

const visuallyHidden: React.CSSProperties = {
  position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
  overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0,
};

const btnBase: React.CSSProperties = {
  minWidth: 32, minHeight: 32, // 2.5.8 Target Size (Minimum) ≥ 24px — we use 32px
  padding: '6px 10px',
  borderRadius: 8,
  border: '1px solid #e5e7eb',
  background: '#fff',
  color: '#111',
  cursor: 'pointer',
  fontSize: 14,
  lineHeight: 1,
};

const dotBase: React.CSSProperties = {
  width: 12, height: 12, // visual dot
  borderRadius: 9999,
  border: '1px solid #cbd5e1',
  background: '#fff',
  cursor: 'pointer',
  // enlarge the HIT AREA to ≥24px while keeping dot small visually
  padding: 6, // 12 + (6*2) = 24px target
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const HeroList: React.FC<Props> = ({
  items,
  intervalMs = 6000,
  variant = 'hero',
  heightPx = 612,
  autoStart = false,
}) => {
  if (!items?.length) return null;

  const total = items.length;
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState<boolean>(() => {
    // WCAG 2.2: do NOT auto-rotate unless user opts in, or if reduced motion is on.
    const prefersReduced = typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    return prefersReduced || !autoStart;
  });

  // Fallback for React <18: use a simple unique id generator
  const uniqueId = (() => Math.random().toString(36).substr(2, 9))();
  const slideId = `slide-${uniqueId}`;
  const navId = `nav-${uniqueId}`;
  const instructionId = `instruction-${uniqueId}`;
  const liveId = `live-${uniqueId}`;

  // Auto-advance only when not paused, more than 1 slide, intervalMs > 0
  React.useEffect(() => {
    if (paused || total <= 1 || !intervalMs) return;
    const id = window.setInterval(() => setIndex(i => clamp(i + 1, total)), intervalMs);
    return () => window.clearInterval(id);
  }, [paused, total, intervalMs]);

  // Keyboard: left/right at the carousel root
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { setIndex(i => clamp(i + 1, total)); e.preventDefault(); }
    if (e.key === 'ArrowLeft')  { setIndex(i => clamp(i - 1, total)); e.preventDefault(); }
  };

  // Pause on hover/focus; resume when focus exits the region
  const onMouseEnter = () => setPaused(true);
  const onMouseLeave = () => setPaused(prev => (autoStart ? false : prev)); // only resume if autoStart
  const onFocus = () => setPaused(true);
  const onBlur = (e: React.FocusEvent) => {
    if (!rootRef.current?.contains(e.relatedTarget as Node)) {
      setPaused(prev => (autoStart ? false : prev));
    }
  };

  const goPrev = () => setIndex(i => clamp(i - 1, total));
  const goNext = () => setIndex(i => clamp(i + 1, total));
  const current = items[index];

  const togglePlay = () => setPaused(p => !p);

  return (
    <section
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="News slideshow"
      aria-describedby={instructionId}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{ display: 'grid', gap: 12, outline: 'none' }}
    >
      {/* Hidden instructions for SR users */}
      <p id={instructionId} style={visuallyHidden}>
        Use Left and Right Arrow keys to change slides. Use the Pause button to stop auto-advance.
      </p>

      {/* Controls header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div id={liveId} aria-live="polite" aria-atomic="true" style={{ fontSize: 12, opacity: 0.85 }}>
          Slide {index + 1} of {total}: {current?.title}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous article"
            aria-controls={slideId}
            className="slc-btn"
            style={btnBase}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={togglePlay}
            aria-pressed={!paused}
            aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
            className="slc-btn"
            style={btnBase}
          >
            {paused ? '▶' : '⏸'}
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next article"
            aria-controls={slideId}
            className="slc-btn"
            style={btnBase}
          >
            ›
          </button>
        </div>
      </div>

      {/* Slide panel (single slide rendered) */}
      <div
        id={slideId}
        role="group"
        aria-roledescription="slide"
        aria-label={`Article ${index + 1} of ${total}`}
        style={{ height: heightPx, display: 'grid', alignItems: 'stretch' }}
      >
        <div style={{ minHeight: 0 }}>
          <Card item={current} variant={variant} />
        </div>
      </div>

      {/* Dots / slide selectors */}
      {total > 1 && (
        <div id={navId} role="list" aria-label="Choose article"
             style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 2 }}>
          {items.map((it, i) => {
            const active = i === index;
            return (
              <button
                key={it.id}
                type="button"
                role="listitem"
                aria-current={active ? 'true' : undefined}
                aria-label={`Show article ${i + 1}: ${it.title}`}
                onClick={() => setIndex(i)}
                className="slc-dot"
                style={{ ...dotBase, borderColor: active ? '#1d4ed8' : '#cbd5e1', background: active ? '#1d4ed8' : '#fff' }}
              >
                {/* purely visual dot */}
                <span aria-hidden="true" style={{
                  width: 10, height: 10, borderRadius: 9999, background: active ? '#1d4ed8' : '#fff'
                }}/>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default HeroList;
