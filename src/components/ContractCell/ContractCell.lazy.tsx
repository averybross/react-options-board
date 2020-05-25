import React, { lazy, Suspense } from 'react';
import { Contract } from '../OptionsBoard/OptionsBoard';

const LazyContractCell = lazy(() => import('./ContractCell'));

export interface ContractCellProps { children?: React.ReactNode; contract: Contract, flipOI?: boolean }

const ContractCell = (props: JSX.IntrinsicAttributes & ContractCellProps) => (
  <Suspense fallback={null}>
    <LazyContractCell {...props} />
  </Suspense>
);

export default ContractCell;
