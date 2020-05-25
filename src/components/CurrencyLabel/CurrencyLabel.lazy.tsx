import React, { lazy, Suspense } from 'react';

const LazyCurrencyLabel = lazy(() => import('./CurrencyLabel'));

export interface CurrencyLabelProps {
  price?: number,
  className?: string,
  children?: React.ReactNode;
}

const CurrencyLabel = (props: JSX.IntrinsicAttributes & CurrencyLabelProps) => (
  <Suspense fallback={null}>
    <LazyCurrencyLabel {...props} />
  </Suspense>
);

export default CurrencyLabel;
