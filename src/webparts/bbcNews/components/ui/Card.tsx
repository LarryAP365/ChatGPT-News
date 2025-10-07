// Card.tsx
import * as React from 'react';
import * as dayjs from 'dayjs';
import { NewsCard } from '../BbcNews.types';
import { getOptimizedImageUrl } from './imageHelper';
import './fixedHeights.css';

type V = 'lead'|'grid'|'teaser'|'hero'|'list'|'compact';

interface CardProps {
  item: NewsCard;
  variant: V;
  fixedHeight?: number;   // exact card height in px
  hideImage?: boolean;    // omit image area
}

const dims: Record<V, { w:number; h:number }> = {
  lead:{w:1200,h:675}, hero:{w:1200,h:675}, grid:{w:640,h:360},
  teaser:{w:480,h:270}, list:{w:320,h:180}, compact:{w:320,h:180},
};

const Card: React.FC<CardProps> = ({ item, variant, fixedHeight, hideImage }) => {
  const ts = item.published ? dayjs(item.published).format('D MMM YYYY') : '';
  const { w, h } = dims[variant];
  const src = getOptimizedImageUrl(item.imageUrl, w, h);

  // If fixedHeight + image, make image row flexible to fill remaining space
  const articleStyle: React.CSSProperties | undefined = fixedHeight
    ? { height: fixedHeight, display: 'grid', gridTemplateRows: hideImage ? 'auto 1fr' : '1fr auto' }
    : undefined;
  const imgWrapStyle: React.CSSProperties | undefined = fixedHeight && !hideImage
    ? { aspectRatio: 'auto', height: '100%' } // override default 16:9; fill available
    : undefined;

  return (
    <article className="bbc-card" role="listitem" style={articleStyle}>
      <a className="bbc-stretch" href={item.url} aria-labelledby={`t-${item.id}`} aria-describedby={`d-${item.id} m-${item.id}`} />

      {!hideImage && (
        <div className="bbc-img-wrap" aria-hidden="true" style={imgWrapStyle}>
          {src ? <img className="bbc-img" src={src} alt="" loading="lazy" /> : <div className="bbc-img" aria-hidden="true" />}
        </div>
      )}

      <div className="bbc-card-body">
        <h3 id={`t-${item.id}`} className="bbc-title">{item.title}</h3>
        <p id={`d-${item.id}`} className="bbc-desc">{item.summary || '\u00A0'}</p>
        <div id={`m-${item.id}`} className="bbc-meta">{ts}</div>
      </div>
    </article>
  );
};

export default Card;
