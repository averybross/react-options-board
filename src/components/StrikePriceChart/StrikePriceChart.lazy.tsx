import React, { lazy, Suspense } from 'react';

const LazyStrikePriceChart = lazy(() => import('./StrikePriceChart'));

const StrikePriceChart = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyStrikePriceChart {...props} />
  </Suspense>
);

export default StrikePriceChart;
