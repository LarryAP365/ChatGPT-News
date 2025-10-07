/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-return-assign */
import { SPFI } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/batching'; // ⬅️ important: enables .batched()
import { NewsCard } from '../BbcNews.types';
import { mapPageToCard } from './mapPageToCard';


export async function getNewsByIds(sp: SPFI, ids: string[]): Promise<NewsCard[]> {
  if (!ids?.length) return [];

  const [batchedWeb, execute] = sp.web.batched(); // using your working batching pattern
  const results: any[] = new Array(ids.length);

  ids.forEach((id, idx) => {
    batchedWeb.lists.getByTitle('Site Pages').items.getById(Number(id))
      .select('Id,Title,FileRef,BannerImageUrl,Description,FirstPublishedDate,PromotedState')()
      .then(i => results[idx] = i)
      .catch(() => results[idx] = null);
  });

  await execute();

  // keep only PromotedState == 2
  return results
    .filter((i: any) => i && i.PromotedState === 2)
    .map(mapPageToCard);
}

export async function getLatestNews(sp: SPFI, top: number): Promise<NewsCard[]> {
  const items = await sp.web.lists.getByTitle('Site Pages').items
    .select('Id,Title,FileRef,BannerImageUrl,Description,FirstPublishedDate,PromotedState')
    .filter('PromotedState eq 2')               // ⬅️ news only
    .orderBy('FirstPublishedDate', false)
    .top(top)();

  return items.map(mapPageToCard);
}



