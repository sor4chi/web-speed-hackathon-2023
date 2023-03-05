import type { FC } from 'react';
import { lazy, Suspense } from 'react';
import { Route, Routes as RRoutes } from 'react-router-dom';

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
      <RRoutes>
        <Route element={<Top />} path="/" />
        <Route element={<ProductDetail />} path="/product/:productId" />
        <Route element={<Order />} path="/order" />
        <Route element={<OrderComplete />} path="/order/complete" />
        <Route element={<NotFound />} path="*" />
      </RRoutes>
    </Suspense>
  );
};
