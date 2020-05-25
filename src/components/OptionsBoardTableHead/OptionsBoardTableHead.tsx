import React from 'react';
import classnames from 'classnames';
import styles from './OptionsBoardTableHead.module.css';

const OptionsBoardTableHead: React.FC = () => {
  
  return (
    <thead className={classnames({
      [styles.OptionsBoardTableHead]: true,
      [styles.columnLabels]: true,
        [styles.sticky]: true,
      })}>
      <tr>
        <th className={styles.oiHeader}><span>OI</span></th>
        <th className={styles.bidAskColumnHeader}>Bid</th>
        <th className={styles.bidAskColumnHeader}>Ask</th>
        <th className={styles.strikeHeader}>Strike</th>
        <th className={styles.bidAskColumnHeader}>Bid</th>
        <th className={styles.bidAskColumnHeader}>Ask</th>
        <th className={styles.oiHeader}><span>OI</span></th>
      </tr>
    </thead>
  )
};

export default  React.memo(OptionsBoardTableHead);
