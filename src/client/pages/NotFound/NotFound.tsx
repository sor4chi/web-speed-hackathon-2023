import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { loadFonts } from '../../utils/load_fonts';

import * as styles from './NotFound.styles';

export const NotFound: FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      await loadFonts();
      setIsReady(true);
    };

    load();
  }, []);

  if (!isReady) {
    return null;
  }

  document.title = 'ページが見つかりませんでした';

  return (
    <div className={styles.container()}>
      <div className={styles.inner()}>
        <p className={styles.mainParagraph()}>ページが存在しません</p>
        <p className={styles.subParagraph()}>Not Found</p>
      </div>
    </div>
  );
};
