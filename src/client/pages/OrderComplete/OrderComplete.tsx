import classNames from 'classnames';
import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AspectRatio } from '../../components/foundation/AspectRatio';
import { PrimaryAnchor } from '../../components/foundation/PrimaryAnchor';
import { WidthRestriction } from '../../components/foundation/WidthRestriction';
import { ProductHeroImage } from '../../components/product/ProductHeroImage';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useRecommendation } from '../../hooks/useRecommendation';
import { loadFonts } from '../../utils/load_fonts';

import * as styles from './OrderComplete.styles';
const FALLBACK_IMAGE_DATA_URL = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

export const OrderComplete: FC = () => {
  const navigate = useNavigate();
  const [isReadyFont, setIsReadyFont] = useState(false);
  const { authUserLoading, isAuthUser } = useAuthUser();
  const { recommendation } = useRecommendation();

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

  useEffect(() => {
    loadFonts().then(() => {
      setIsReadyFont(true);
    });
  }, []);

  if (!recommendation || !isReadyFont || authUserLoading) {
    return null;
  }
  if (!isAuthUser) {
    navigate('/');
    return null;
  }

  document.title = '購入が完了しました';

  return (
    <WidthRestriction>
      <div className={styles.container()}>
        <div className={styles.notice()}>
          <h2 className={styles.noticeHeading()}>購入が完了しました</h2>
          <AspectRatio ratioHeight={1} ratioWidth={2}>
            <div className={styles.noticeDescriptionWrapper()}>
              <p
                className={classNames(
                  styles.noticeDescription(),
                  styles.noticeDescription__desktop(),
                  styles.noticeDescription__mobile(),
                )}
              >
                このサイトは架空のサイトであり、商品が発送されることはありません
              </p>
            </div>
          </AspectRatio>
        </div>

        <div className={styles.recommended()}>
          <h2 className={styles.recommendedHeading()}>こちらの商品もオススメです</h2>
          <ProductHeroImage
            imageDataUrl={imageDataUrl}
            product={recommendation.product}
            title={recommendation.product.name}
          />
        </div>

        <div className={styles.backToTopButtonWrapper()}>
          <PrimaryAnchor href="/" size="lg">
            トップへ戻る
          </PrimaryAnchor>
        </div>
      </div>
    </WidthRestriction>
  );
};
