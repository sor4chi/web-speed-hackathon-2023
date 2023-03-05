import classNames from 'classnames';
import { memo } from 'react';
import type { FC } from 'react';

import type { ProductFragmentResponse } from '../../../graphql/fragments';
import { isEqual } from '../../../utils/object';
import { Anchor } from '../../foundation/Anchor';
import { DeviceType, GetDeviceType } from '../../foundation/GetDeviceType';

import * as styles from './ProductHeroImage.styles';

type Props = {
  product?: ProductFragmentResponse;
  imageDataUrl?: string;
  title: string;
};

export const ProductHeroImage: FC<Props> = memo(({ imageDataUrl, product, title }) => {
  return (
    <GetDeviceType>
      {({ deviceType }) => {
        return (
          <div style={{ width: '100%' }}>
            <div style={{ margin: '0 auto', maxWidth: '1024px', width: '100%' }}>
              {product && (
                <Anchor href={`/product/${product.id}`}>
                  <div className={styles.container()}>
                    <div style={{ aspectRatio: '16 / 9', height: '100%', width: '100%' }}>
                      <img
                        loading="eager"
                        src={imageDataUrl}
                        style={{
                          maxHeight: '576px',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          width: '100%',
                        }}
                      ></img>
                    </div>

                    <div className={styles.overlay()}>
                      <p
                        className={classNames(styles.title(), {
                          [styles.title__desktop()]: deviceType === DeviceType.DESKTOP,
                          [styles.title__mobile()]: deviceType === DeviceType.MOBILE,
                        })}
                      >
                        {title}
                      </p>
                      <p
                        className={classNames(styles.description(), {
                          [styles.description__desktop()]: deviceType === DeviceType.DESKTOP,
                          [styles.description__mobile()]: deviceType === DeviceType.MOBILE,
                        })}
                      >
                        {product.name}
                      </p>
                    </div>
                  </div>
                </Anchor>
              )}
            </div>
          </div>
        );
      }}
    </GetDeviceType>
  );
}, isEqual);

ProductHeroImage.displayName = 'ProductHeroImage';
