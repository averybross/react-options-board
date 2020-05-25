import React, { lazy, Suspense } from 'react';
import { Contract, Dictionary, ContractTable, Booktop } from '../OptionsBoard/OptionsBoard';
import { ContractsStore } from '../../stores/ContractsStore';

const LazyOptionsBoardTableBody = lazy(() => import('./OptionsBoardTableBody'));

export interface OptionsBoardTableBodyProps {
  children?: React.ReactNode;
  bitcoin: Booktop;
  contracts?: ContractTable;
}

const OptionsBoardTableBody = (props: JSX.IntrinsicAttributes & OptionsBoardTableBodyProps) => (
  <Suspense fallback={null}>
    <LazyOptionsBoardTableBody {...props} />
  </Suspense>
);

export default OptionsBoardTableBody;
