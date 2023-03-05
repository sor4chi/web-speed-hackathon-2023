import { ApolloProvider } from '@apollo/client';
import type { FC, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';

import Fallback from '../../../pages/Fallback';
import { SignInModalProvider } from '../../../store/signinModal';
import { SignUpModalProvider } from '../../../store/signupModal';
import { apolloClient } from '../../../utils//apollo_client';

type Props = {
  children: ReactNode;
};

export const Providers: FC<Props> = ({ children }) => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <SignUpModalProvider>
        <SignInModalProvider>
          <ErrorBoundary FallbackComponent={Fallback}>{children}</ErrorBoundary>
        </SignInModalProvider>
      </SignUpModalProvider>
    </BrowserRouter>
  </ApolloProvider>
);
