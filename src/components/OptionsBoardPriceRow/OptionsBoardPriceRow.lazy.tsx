import React, { lazy, Suspense } from 'react';

const LazyOptionsBoardPriceRow = lazy(() => import('./OptionsBoardPriceRow'));

const OptionsBoardPriceRow = (props: JSX.IntrinsicAttributes & { bitcoinPrice: number, children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyOptionsBoardPriceRow {...props} />
  </Suspense>
);

export default OptionsBoardPriceRow;
