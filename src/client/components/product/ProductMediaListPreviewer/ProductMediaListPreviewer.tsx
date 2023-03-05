import classNames from 'classnames';
import type { FC } from 'react';
import { useMemo, useState } from 'react';

import type { MediaFileFragmentResponse, ProductFragmentResponse } from '../../../graphql/fragments';
import { AspectRatio } from '../../foundation/AspectRatio';

import { MediaItem } from './MediaItem';
import { MediaItemPreviewer } from './MediaItemPreviewer';
import * as styles from './ProductMediaListPreviewer.styles';

type Props = {
  product: ProductFragmentResponse | undefined;
};

const FALLBACK_IMAGE_DATA_URL = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

export const ProductMediaListPreviewer: FC<Props> = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [file, setFile] = useState<MediaFileFragmentResponse>({
    filename: FALLBACK_IMAGE_DATA_URL,
    id: 1,
  });

  useMemo(() => {
    if (product === undefined || product.media.length === 0) return;
    setFile(product.media[activeIndex].file);
  }, [activeIndex, product]);

  if (product === undefined || product.media.length === 0) {
    return null;
  }

  return (
    <div className={styles.container()}>
      <AspectRatio ratioHeight={9} ratioWidth={16}>
        <MediaItemPreviewer file={file} />
      </AspectRatio>
      <div className={styles.itemListWrapper()}>
        <ul className={styles.itemList()}>
          {product.media.map((media, index) => {
            const disabled = index === activeIndex;

            return (
              <li key={media.id} className={styles.item()}>
                <AspectRatio ratioHeight={1} ratioWidth={1}>
                  <button
                    className={classNames(styles.itemSelectButton(), {
                      [styles.itemSelectButton__disabled()]: disabled,
                    })}
                    disabled={disabled}
                    onClick={() => setActiveIndex(index)}
                  >
                    <MediaItem file={media.file} />
                  </button>
                </AspectRatio>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
