import DataLoader from 'dataloader';

import { LimitedTimeOffer } from '../../model/limited_time_offer';
import type { Product } from '../../model/product';
import { ProductMedia } from '../../model/product_media';
import { Review } from '../../model/review';
import { dataSource } from '../data_source';

import type { GraphQLModelResolver } from './model_resolver';

export const productResolver: GraphQLModelResolver<Product> = {
  media: async (parent) => await MediaLoader.load(parent.id),
  offers: (parent) => {
    return dataSource.manager.find(LimitedTimeOffer, {
      where: {
        product: parent,
      },
    });
  },
  reviews: (parent) => {
    return dataSource.manager.find(Review, {
      where: {
        product: parent,
      },
    });
  },
};

const MediaLoader = new DataLoader(async (ids: readonly number[]) => {
  const media = await dataSource
    .createQueryBuilder(ProductMedia, 'media')
    .innerJoinAndSelect('media.product', 'product')
    .innerJoinAndSelect('media.file', 'file')
    .where('product.id IN (:...ids)', { ids })
    .select(['media.id', 'media.isThumbnail', 'product.id', 'file.id', 'file.filename'])
    .getMany();

  return ids.map((id) => media.filter((media) => media.product.id === id)) as ProductMedia[][];
});
