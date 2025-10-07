/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { NewsCard } from '../BbcNews.types';
import AdaptiveNewsCard from '../adaptive/AdaptiveNewsCard';

const AdaptiveGrid: React.FC<{ items: NewsCard[] }> = ({ items }) => {
  if (!items?.length) return null;

  // Simple responsive grid
  const wrap: React.CSSProperties = {
    display: 'grid', 
    gap: 9,
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
  };
 
  return (
    <section aria-label="News (adaptive cards)" style={{ display: 'grid', gap: 9 }}>
      <div style={wrap} className="adaptive-grid">
        {items.map(i => (
          <div key={i.id} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
            <AdaptiveNewsCard item={i} />
          </div>
        ))}
      </div>
      <style>
        {`
          @media (max-width: 1024px) { .adaptive-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
          @media (max-width: 640px)  { .adaptive-grid { grid-template-columns: repeat(1, minmax(0, 1fr)); } }
        `}
      </style>
    </section>
  );
};

export default AdaptiveGrid;
