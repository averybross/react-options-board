import React, { lazy, Suspense } from 'react';
import { Contract } from '../OptionsBoard/OptionsBoard';

const LazyOptionRow = lazy(() => import('./OptionRow'));

export interface OptionRowProps {
  children?: React.ReactNode;
  put: Contract;
  call: Contract;
}

const OptionRow = (props: JSX.IntrinsicAttributes & OptionRowProps) => (
  <Suspense fallback={null}>
    <LazyOptionRow {...props} />
  </Suspense>
);

export default OptionRow;
