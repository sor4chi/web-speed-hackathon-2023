import type { FC } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

import { useAuthUser } from '../../../hooks/useAuthUser';
import { useSignInModal } from '../../../store/signinModal';
import { Anchor } from '../../foundation/Anchor';
import { Image } from '../../foundation/Image';

import * as styles from './Header.styles';

export const Header: FC = () => {
  const { isAuthUser } = useAuthUser();
  const { setIsSignInModalOpen } = useSignInModal();

  return (
    <header className={styles.container()}>
      <Anchor href="/">
        <div className={styles.logo()}>
          <Image src="/icons/logo.webp" style={{ width: '205px' }} />
        </div>
      </Anchor>
      {isAuthUser ? (
        <Anchor dataTestId="navigate-order" href={'/order'}>
          <div className={styles.orderLink()}>
            <FaShoppingCart color="#222222" height={20} width={20} />
          </div>
        </Anchor>
      ) : (
        <button
          className={styles.signInButton()}
          data-testid="navigate-signin"
          onClick={() => setIsSignInModalOpen(true)}
        >
          <FaUser color="#222222" height={20} width={20} />
        </button>
      )}
    </header>
  );
};
