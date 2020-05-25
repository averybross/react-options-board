import React, { lazy, Suspense } from 'react';
import { ContractsStore } from '../../stores/ContractsStore';

const LazyOptionsBoard = lazy(() => import('./OptionsBoard'));

export interface OptionsBoardProps { store?: ContractsStore, children?: React.ReactNode; }

const OptionsBoard = (props: JSX.IntrinsicAttributes & OptionsBoardProps) => (
  <Suspense fallback={null}>
    <LazyOptionsBoard {...props} />
  </Suspense>
);

export default OptionsBoard;
