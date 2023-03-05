import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { Layout } from '../../components/application/Layout';
import { ProductList } from '../../components/feature/ProductList';
import { ProductHeroImage } from '../../components/product/ProductHeroImage';
import { useFeatures } from '../../hooks/useFeatures';
import { useRecommendation } from '../../hooks/useRecommendation';

import * as styles from './Top.styles';

const FALLBACK_IMAGE_DATA_URL = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

export const Top: FC = () => {
  const { recommendation } = useRecommendation();
  const { features } = useFeatures();

  document.title = '買えるオーガニック';

  const thumbnailFile = recommendation?.product?.media.find((productMedia) => productMedia.isThumbnail)?.file;

  const [imageDataUrl, setImageDataUrl] = useState<string>();

  useEffect(() => {
    if (!thumbnailFile) return;
    setImageDataUrl(thumbnailFile.filename.replace(/.jpg$/, '.webp'));
  }, [thumbnailFile]);

  useMemo(() => {
    if (!thumbnailFile) {
      setImageDataUrl(FALLBACK_IMAGE_DATA_URL);
      return;
    }
    const image = new Image();
    image.src = thumbnailFile.filename.replace(/.jpg$/, '.webp');
  }, [thumbnailFile]);

  return (
    <>
      <Layout>
        <div>
          <ProductHeroImage imageDataUrl={imageDataUrl} product={recommendation?.product} title="今週のオススメ" />

          <div className={styles.featureList()}>
            {features &&
              features.map((featureSection) => {
                return (
                  <div key={featureSection.id} className={styles.feature()}>
                    <h2 className={styles.featureHeading()}>{featureSection.title}</h2>
                    <ProductList featureSection={featureSection} />
                  </div>
                );
              })}
          </div>
        </div>
      </Layout>
    </>
  );
};
