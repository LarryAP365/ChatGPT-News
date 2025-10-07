/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @rushstack/no-new-null */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { NewsCard } from '../BbcNews.types';
import { getOptimizedImageUrl } from '../ui/imageHelper';
import Card from '../ui/Card';
import './heroVisual.css';

interface Props {
  items: NewsCard[];
  themeColorHex?: string; // e.g., "#6d28d9"
}

const HERO_H = 520;              // ⬅️ keep in sync with CSS
const OVERLAP_H = 292;           // ⬅️ how far the gradient continues under the row

function hexToRgb(hex?: string): { r: number; g: number; b: number } | null {
  if (!hex) return null;
  const s = hex.trim().replace('#', '');
  const f = s.length === 3 ? s.split('').map(c => c + c).join('') : s;
  if (f.length !== 6) return null;
  const n = parseInt(f, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function pickOnColor(hex?: string): '#ffffff' | '#111111' {
  const rgb = hexToRgb(hex) ?? { r: 109, g: 40, b: 217 };
  const toLin = (c: number) => (c/255) <= 0.03928 ? (c/255)/12.92 : Math.pow(((c/255)+0.055)/1.055, 2.4);
  const L = 0.2126 * toLin(rgb.r) + 0.7152 * toLin(rgb.g) + 0.0722 * toLin(rgb.b);
  const contrast = (L1: number, L2: number) => (Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
  return contrast(L, 0) >= contrast(1, L) ? '#111111' : '#ffffff';
}

const HeroVisual: React.FC<Props> = ({ items, themeColorHex = '#6d28d9' }) => {
  if (!items?.length) return null;

  const [first, ...rest] = items;
  const art = getOptimizedImageUrl(first.imageUrl, 1280, 720);

  const rgb = hexToRgb(themeColorHex) ?? { r: 109, g: 40, b: 217 };
  const on = pickOnColor(themeColorHex);
  const onMuted = on === '#ffffff' ? 'rgba(255,255,255,0.85)' : 'rgba(17,17,17,0.75)';

  // Theme + layout vars for CSS (IMPORTANT: include --hero-h and --overlap-h)
  const themeVars: React.CSSProperties = {
    ['--theme-rgb' as any]: `${rgb.r} ${rgb.g} ${rgb.b}`,
    ['--theme-r' as any]: String(rgb.r),
    ['--theme-g' as any]: String(rgb.g),
    ['--theme-b' as any]: String(rgb.b),
    ['--on-color' as any]: on,
    ['--on-muted' as any]: onMuted,
    ['--image-tint-a' as any]: '0.24',
    ['--image-vignette-a' as any]: '0.32',

    // ⬇️ these two ensure the single background slab paints the right height
    ['--hero-h' as any]: `${HERO_H}px`,
    ['--overlap-h' as any]: `${OVERLAP_H}px`,
  };

  return (
    <section className="hv-wrap" style={themeVars}>
      {/* Visual hero banner */}
      <div className="hv-hero" style={{ height: HERO_H }}>
        <div className="hv-bg" />

        <div className="hv-content">
          {/* Left: text */}
          <div className="hv-left">
            <div className="hv-kicker">Top story</div>
            <h1 className="hv-title">{first.title}</h1>
            {first.summary && <p className="hv-desc">{first.summary}</p>}
            {first.published && (
              <div className="hv-meta">{new Date(first.published).toLocaleDateString()}</div>
            )}
            <a className="hv-cta" href={first.url} aria-label={`Read: ${first.title}`}>
              Read article
            </a>
          </div>

          {/* Right: artwork with themed overlay + edge fade */}
          <div className="hv-right" aria-hidden="true">
            {art ? <img src={art} alt="" className="hv-art" loading="lazy" /> : <div className="hv-art hv-art--ph" />}
          </div>
        </div>
      </div>

      {/* Overlapping “More news” strip */}
      {rest.length > 0 && (
        <div className="hv-more hv-more--overlay">
          <h2 className="hv-more-title">More news</h2>
          <div className="hv-row">
            {rest.slice(0, 5).map(i => (
              <Card key={i.id} item={i} variant="teaser" />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroVisual;
