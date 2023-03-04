import { useState } from 'react';

import { createCtx } from '../common/useCtx';

type ISignInModalContext = {
  isSignInModalOpen: boolean;
  setIsSignInModalOpen: (isOpen: boolean) => void;
};

const [useSignInModal, SetSignInModalProvider] = createCtx<ISignInModalContext>();

export { useSignInModal };

const useSignInModalCtx = (): ISignInModalContext => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  return {
    isSignInModalOpen,
    setIsSignInModalOpen,
  };
};

export const SignInModalProvider = ({ children }: { children: React.ReactNode }) => {
  const signInModal = useSignInModalCtx();
  return <SetSignInModalProvider value={signInModal}>{children}</SetSignInModalProvider>;
};
