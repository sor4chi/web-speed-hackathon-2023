import type { FC } from 'react';

import type { ProductFragmentResponse } from '../../../graphql/fragments';
import { useActiveOffer } from '../../../hooks/useActiveOffer';
import { formatYen } from '../../../utils/yen';
import { Anchor } from '../../foundation/Anchor';
import { AspectRatio } from '../../foundation/AspectRatio';
import { Image } from '../../foundation/Image';
import { ProductOfferLabel } from '../../product/ProductOfferLabel';

import * as styles from './ProductCard.styles';

type Props = {
  product: ProductFragmentResponse;
};

const convertToSmallImagePath = (path: string) => {
  return path.replace(/\.jpg$/, '.webp').replace('/products/', '/products_small/');
};

export const ProductCard: FC<Props> = ({ product }) => {
  const thumbnailFile = product.media.find((productMedia) => productMedia.isThumbnail)?.file;

  const { activeOffer } = useActiveOffer(product);
  const price = activeOffer?.price ?? product.price;

  return (
    <Anchor href={`/product/${product.id}`}>
      <div className={styles.inner()}>
        {thumbnailFile ? (
          <div className={styles.image()}>
            <AspectRatio ratioHeight={9} ratioWidth={16}>
              <Image height={126} src={convertToSmallImagePath(thumbnailFile.filename)} width={224} />
            </AspectRatio>
          </div>
        ) : null}
        <div className={styles.description()}>
          <p className={styles.itemName()}>{product.name}</p>
          <span className={styles.itemPrice()}>{formatYen(price)}</span>
        </div>
        {activeOffer !== undefined && (
          <div className={styles.label()}>
            <ProductOfferLabel size="base">タイムセール中</ProductOfferLabel>
          </div>
        )}
      </div>
    </Anchor>
  );
};
