/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { AdaptiveCardHost } from '@pnp/spfx-controls-react/lib/AdaptiveCardHost';
import { NewsCard } from '../BbcNews.types';

type Props = {
  item: NewsCard;
  /** Optional: override template */
  cardTemplate?: any;
  /** Optional: host config to better match SP theme */
  hostConfig?: any;
};

const DEFAULT_TEMPLATE: any = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  version: '1.5',
  type: 'AdaptiveCard',
  body: [
    {
      type: 'Container',
      style: 'emphasis',
      bleed: true,
      backgroundImage: {
        url: '${imageUrl}',
        fillMode: 'cover',
        horizontalAlignment: 'center',
        verticalAlignment: 'center'
      },
      items: [
        {
          type: 'TextBlock',
          text: '${title}',
          wrap: true,
          weight: 'Bolder',
          size: 'Large',
          color: 'Light',
          maxLines: 2
        },
        {
          type: 'TextBlock',
          text: '',
          wrap: true,
          color: 'Light',
          isSubtle: true,
          spacing: 'Small',
          maxLines: 3
        }
      ]
    },
    {
      type: 'ColumnSet',
      spacing: 'Medium',
      columns: [
        {
          type: 'Column',
          width: 'stretch',
          items: [
            { type: 'TextBlock', text: '${date}', isSubtle: true, wrap: true, spacing: 'None' }
          ]
        }
      ]
    }
  ],
  actions: [
    { type: 'Action.OpenUrl', title: 'Read article', url: '${url}' }
  ]
};

const DEFAULT_HOST_CONFIG: any = {
  spacing: { small: 6, default: 12, medium: 16, large: 20 },
  
  containerStyles: {
    default: { backgroundColor: 'transparent', foregroundColors: {
      default: { default: '#222', subtle: '#666' }
    }},
    emphasis: { backgroundColor: 'rgba(0,0,0,0.8)', foregroundColors: {
      default: { default: '#fff', subtle: 'rgba(255,255,255,.85)' }
    }}
  },
  imageSizes: { small: 40, medium: 80, large: 160 }
};

const AdaptiveNewsCard: React.FC<Props> = ({ item, cardTemplate = DEFAULT_TEMPLATE, hostConfig = DEFAULT_HOST_CONFIG }) => {
  const data = React.useMemo(() => ({
    $root: {
      title: item.title,
      summary: item.summary ?? '',
      imageUrl: item.imageUrl ?? '',
      url: item.url,
      date: item.published ? new Date(item.published).toLocaleDateString() : ''
    }
  }), [item]);

  // Optional: custom action handling (e.g., share)
  const onInvokeAction = (action: any) => {
    if (action?.type === 'Action.Submit' && action?.data?.cmd === 'share') {
      if (navigator.share) {
        navigator.share({ title: item.title, url: item.url }).catch(() => void 0);
      } else {
        window.open(item.url, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <AdaptiveCardHost
          card={cardTemplate}
          data={data}
          hostConfig={hostConfig}
          onInvokeAction={onInvokeAction} onError={function (error: Error): void {
              throw new Error('Function not implemented.');
          } }    />
  );
};

export default AdaptiveNewsCard;
