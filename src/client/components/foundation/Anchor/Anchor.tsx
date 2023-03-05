import type { FC, ReactNode } from 'react';
import { Link } from 'wouter';

import * as styles from './Anchor.styles';

type Props = {
  children: ReactNode;
  href: string;
  dataTestId?: string;
};

export const Anchor: FC<Props> = ({ children, dataTestId, href }) => (
  <span className={styles.container()}>
    <Link data-testid={dataTestId} to={href}>
      {children}
    </Link>
  </span>
);
