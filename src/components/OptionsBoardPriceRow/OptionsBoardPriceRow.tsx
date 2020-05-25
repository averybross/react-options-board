import React from 'react';
import styles from './OptionsBoardPriceRow.module.css';
import CurrencyLabel from '../CurrencyLabel/CurrencyLabel.lazy';

const OptionsBoardPriceRow: React.FC<{ bitcoinPrice: number }> = ({bitcoinPrice}) => (
  <tr className={styles.OptionsBoardPriceRow} data-testid="OptionsBoardPriceRow">
    <td colSpan={7}>Share Price: <CurrencyLabel price={bitcoinPrice} /></td>
  </tr>
);

export default React.memo(OptionsBoardPriceRow);
