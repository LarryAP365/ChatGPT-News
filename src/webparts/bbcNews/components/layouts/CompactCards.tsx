import * as React from 'react';
import Card from '../ui/Card';
import { NewsCard } from '../BbcNews.types';


const CompactCards: React.FC<{ items: NewsCard[] }> = ({ items }) => (
<section role="list" aria-label="News articles" className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
{items.map(i => <Card key={i.id} item={i} variant="compact" />)}
</section>
);
export default CompactCards;