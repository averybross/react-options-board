import React from 'react';
import classnames from 'classnames';
import styles from './OptionsBoardTableBody.module.css';
import OptionRow from '../OptionRow/OptionRow.lazy';
import { OptionsBoardTableBodyProps } from './OptionsBoardTableBody.lazy';
import OptionsBoardPriceRow from '../OptionsBoardPriceRow/OptionsBoardPriceRow.lazy';

function treatAsUTC(date: Date): Date {
  var result = new Date(date);
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return result;
}

export function daysBetween(startDate: Date, endDate: Date):number {
  var millisecondsPerDay = 24 * 60 * 60 * 1000;
  return ((treatAsUTC(endDate) as unknown as number) - (treatAsUTC(startDate) as unknown as number)) / millisecondsPerDay;
}

export function transformDateForMobileSafari(date: string): Date {
  return new Date(date.replace(/\s/, 'T').slice(0, -5))
}

const OptionsBoardDateRow: React.FC<{date: string}> = React.memo((props) => {

  const date = transformDateForMobileSafari(props.date);
  
  return (
    <tr className={classnames(styles.rowDate, styles.dateHeader)}>
      <td colSpan={7}>
        <div>
          <span><strong>{date.toLocaleDateString("en-US")}</strong></span> - <span>{Math.round(daysBetween(new Date(), date))} days left</span>
        </div>
      </td>
    </tr>
  )
})

const OptionsBoardTableBody:React.FC<OptionsBoardTableBodyProps> = (props) => {
  
  const bitcoinPrice = (props.bitcoin.ask + props.bitcoin.bid)/2;
  
  
  return (
    <tbody className={styles.OptionsBoardTableBody}>
      {props.contracts && Object.entries(props.contracts).map(([date, dateContracts]) => {
      const contractRows = dateContracts.map(([put, call], index) => (
        <React.Fragment key={put.id}>
          {
            (((index > 0
            && (props.bitcoin.ask && props.bitcoin.bid)
            && put.strike_price > bitcoinPrice
            && dateContracts[index-1][0].strike_price < bitcoinPrice )
            ||
            (index === 0 && put.strike_price > bitcoinPrice))
            && (props.bitcoin.ask && props.bitcoin.bid)) ? <OptionsBoardPriceRow key={date} bitcoinPrice={bitcoinPrice} />: ''
          }
          <OptionRow key={put.id} {...{put, call}} />
          {
            (index === dateContracts.length && put.strike_price < bitcoinPrice)
              ? <OptionsBoardPriceRow key={date} bitcoinPrice={bitcoinPrice} /> : ''
          }
        </React.Fragment>
      )
    );

    return (<React.Fragment key={date}>
        <OptionsBoardDateRow date={date} />
        {contractRows}
      </React.Fragment>)
  })}
    </tbody>
  )
};
export default OptionsBoardTableBody;
