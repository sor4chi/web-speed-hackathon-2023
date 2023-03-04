import { useState } from 'react';

import { createCtx } from '../common/useCtx';

type ISignUpModalContext = {
  isSignUpModalOpen: boolean;
  setIsSignUpModalOpen: (isOpen: boolean) => void;
};

const [useSignUpModal, SetSignUpModalProvider] = createCtx<ISignUpModalContext>();

export { useSignUpModal };

const useSignUpModalCtx = (): ISignUpModalContext => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  return {
    isSignUpModalOpen,
    setIsSignUpModalOpen,
  };
};

export const SignUpModalProvider = ({ children }: { children: React.ReactNode }) => {
  const signUpModal = useSignUpModalCtx();
  return <SetSignUpModalProvider value={signUpModal}>{children}</SetSignUpModalProvider>;
};
