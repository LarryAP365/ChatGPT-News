import * as React from 'react';
import { NewsCard } from '../BbcNews.types';
import Card from '../ui/Card';


const LeadGrid: React.FC<{ items: NewsCard[] }> = ({ items }) => {
if (!items?.length) return null;
const [lead, ...rest] = items;
return (
<section role="list" aria-label="News articles" className="grid gap-4 md:grid-cols-5">
<div className="md:col-span-3"><Card item={lead} variant="lead" /></div>
<div className="md:col-span-2 grid gap-4 sm:grid-cols-2">
{rest.slice(0,4).map(i => <Card key={i.id} item={i} variant="grid" />)}
</div>
<div className="md:col-span-5 grid gap-4 sm:grid-cols-3">
{rest.slice(4, 10).map(i => <Card key={i.id} item={i} variant="teaser" />)}
</div>
</section>
);
};
export default LeadGrid;