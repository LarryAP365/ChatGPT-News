/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewsCard } from '../BbcNews.types';


export function mapPageToCard(i: any): NewsCard {
const imageUrl = i?.BannerImageUrl?.Url || undefined;
return {
id: String(i.Id),
title: i.Title,
url: i.FileRef,
imageUrl,
summary: i.Description,
published: i.FirstPublishedDate,
} as NewsCard;
}