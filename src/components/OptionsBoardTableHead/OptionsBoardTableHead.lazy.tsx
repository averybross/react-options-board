import React, { lazy, Suspense } from 'react';
import { Booktop } from '../OptionsBoard/OptionsBoard';

const LazyOptionsBoardTableHead = lazy(() => import('./OptionsBoardTableHead'));

const OptionsBoardTableHead = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyOptionsBoardTableHead {...props} />
  </Suspense>
);

export default OptionsBoardTableHead;
