import classNames from 'classnames';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { Image } from '../../foundation/Image';

import * as styles from './Footer.styles';

const FOOTER_LINK_ITEMS = ['利用規約', 'お問い合わせ', 'Q&A', '運営会社', 'オーガニックとは'] as const;

export const Footer: FC = () => {
  return (
    <footer className={styles.container()}>
      <ul className={classNames(styles.itemList(), styles.itemList__desktop(), styles.itemList__mobile())}>
        {FOOTER_LINK_ITEMS.map((item) => (
          <li key={item} className={styles.item()}>
            {item}
          </li>
        ))}
      </ul>
      <Link to="/">
        <Image src="/icons/logo.webp" style={{ width: '205px' }} />
      </Link>
    </footer>
  );
};
