import type { FC } from 'react';
import { memo } from 'react';

import type { LimitedTimeOfferFragmentResponse, ProductFragmentResponse } from '../../../graphql/fragments';
import { isEqual } from '../../../utils/object';
import { formatYen } from '../../../utils/yen';
import { ProductOfferLabel } from '../ProductOfferLabel';

import * as styles from './ProductOverview.styles';

type Props = {
  product: ProductFragmentResponse | undefined;
  activeOffer: LimitedTimeOfferFragmentResponse | undefined;
};

export const ProductOverview: FC<Props> = memo(({ activeOffer, product }) => {
  if (product === undefined) {
    return null;
  }

  const renderActiveOffer = () => {
    if (activeOffer === undefined) {
      return;
    }

    const endTime = new Date(activeOffer.endDate).toLocaleString('ja-JP', {
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      month: '2-digit',
      second: '2-digit',
      year: 'numeric',
    });

    return (
      <div className={styles.offerLabel()}>
        <ProductOfferLabel size="lg">
          <time>{endTime}</time> までタイムセール
        </ProductOfferLabel>
      </div>
    );
  };

  return (
    <div className={styles.container()}>
      {renderActiveOffer()}
      <p className={styles.productName()}>{product.name}</p>
      <p className={styles.productDescription()}>{product.description}</p>

      <div className={styles.priceWrapper()}>
        {activeOffer !== undefined ? (
          <span className={styles.priceWithoutOffer()}>{formatYen(product.price)}</span>
        ) : null}
        <span className={styles.price()}>{formatYen(activeOffer?.price ?? product.price)}</span>
      </div>
    </div>
  );
}, isEqual);

ProductOverview.displayName = 'ProductOverview';
