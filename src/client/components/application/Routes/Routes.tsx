import type { FC } from 'react';
import { lazy, Suspense } from 'react';
import { Route } from 'wouter';

const NotFound = lazy(() => import('../../../pages/NotFound'));
const Order = lazy(() => import('../../../pages/Order'));
const OrderComplete = lazy(() => import('../../../pages/OrderComplete'));
const ProductDetail = lazy(() => import('../../../pages/ProductDetail'));
const Top = lazy(() => import('../../../pages/Top'));

import { useScrollToTop } from './hooks';

export const Routes: FC = () => {
  useScrollToTop();

  return (
    <Suspense>
      <Route component={Top} path="/" />
      <Route component={ProductDetail} path="/product/:productId" />
      <Route component={Order} path="/order" />
      <Route component={OrderComplete} path="/order/complete" />
      <Route component={NotFound} path="*" />
    </Suspense>
  );
};
