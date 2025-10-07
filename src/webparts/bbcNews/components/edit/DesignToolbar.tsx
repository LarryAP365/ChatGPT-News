import * as React from 'react';
import { LayoutVariant } from '../BbcNews.types';

type Props = {
  layout: LayoutVariant;
  onChange: (l: LayoutVariant) => void;
  openSettings?: () => void;
};

const options: Array<{key: LayoutVariant; label: string}> = [
  { key: 'hero-visual',   label: 'Visual' },
  { key: 'hero-bbc',      label: 'BBC' },
  { key: 'lead-grid',     label: 'Lead + Grid' },
  { key: 'hero-list',     label: 'Accessible Slideshow' },
  { key: 'compact-cards', label: 'Compact' },
];

const DesignToolbar: React.FC<Props> = ({ layout, onChange, openSettings }) => {
  return (
    <div
      role="toolbar"
      aria-label="Design options"
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        margin: '8px 0 4px', padding: 8,
        border: '1px solid #e5e7eb', borderRadius: 10, background: '#fff'
      }}
    >
      <span style={{ fontWeight: 600, marginRight: 6 }}>Design:</span>
      <div role="group" aria-label="Layout variant"
        style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {options.map(o => {
          const active = o.key === layout;
          return (
            <button
              key={o.key}
              type="button"
              onClick={() => onChange(o.key)}
              aria-pressed={active}
              title={o.label}
              style={{
                padding: '6px 10px',
                borderRadius: 8,
                border: '1px solid ' + (active ? '#1d4ed8' : '#e5e7eb'),
                background: active ? '#eff6ff' : '#fff',
                cursor: 'pointer',
                fontSize: 13
              }}
            >
              {o.label}
            </button>
          );
        })}
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
        <button
          type="button"
          onClick={openSettings}
          aria-label="Open settings"
          title="Open settings"
          style={{
            padding: '6px 10px', borderRadius: 8,
            border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: 13
          }}
        >
          ⚙️ Settings
        </button>
      </div>
    </div>
  );
};

export default DesignToolbar;
