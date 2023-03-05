import classNames from 'classnames';
import type { ComponentProps, FC } from 'react';

import * as styles from './Image.styles';

type Props = Omit<ComponentProps<'img'>, 'className'> & {
  fill?: boolean;
  eager?: boolean;
};

export const Image: FC<Props> = ({ eager, fill, ...rest }) => {
  return (
    <img
      className={classNames(styles.container(), {
        [styles.container__fill()]: fill === true,
      })}
      loading={eager === true ? 'eager' : 'lazy'}
      {...rest}
    />
  );
};
