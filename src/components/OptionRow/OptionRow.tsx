import React from 'react';
import { OptionRowProps } from './OptionRow.lazy';
import styles from './OptionRow.module.css';
import ContractCell from '../ContractCell/ContractCell.lazy';

const strikeFormatter = new Intl.NumberFormat('en-US');

export function formatStrike(num: number): string {
  return strikeFormatter.format(num/100)
}

const OptionRow: React.FC<OptionRowProps> = ({put, call}) => (
  <tr className={styles.OptionRow} key={put.id}>
    <ContractCell key={1} contract={put} />
    <td className={styles.strikePrice}>{formatStrike(put.strike_price)}</td>
    <ContractCell key={2} contract={call} flipOI={true} />
  </tr>
);

export default OptionRow;
