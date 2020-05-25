import React, { useEffect } from 'react';
import classnames from 'classnames';
import styles from './ContractCell.module.css';
import CurrencyLabel from '../CurrencyLabel/CurrencyLabel';
import { ContractCellProps } from './ContractCell.lazy';
import UIStore from '../../stores/UIStore';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

function kFormatter(num: number) {
  return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1) as any) + 'k' : Math.sign(num)*Math.abs(num)
}

const ContractCell: React.FC<ContractCellProps> = (props) => {

  const OI =(<CurrencyLabel key={0} className={styles.openInterest}>
    {parseInt(props.contract.open_interest) ? kFormatter(parseInt(props.contract.open_interest)) : '-'}
  </CurrencyLabel>)
  
  const bidAsk = <React.Fragment key={1}>
    <CurrencyLabel className={classnames(styles.bidAskCell, styles.bid)} price={props.contract.booktops[0].bid} />
    <CurrencyLabel className={classnames(styles.bidAskCell, styles.ask)} price={props.contract.booktops[0].ask} />
  </React.Fragment>

  const [backgroundColor, setBackgroundColor] = React.useState("inherit");
  const updateTimer = React.useRef<number | null>();

  useEffect(()=> {
    return () => {
      if (updateTimer.current) {
        clearTimeout(updateTimer.current);
    }
    };
  }, []);

  useEffect(() => {

    function setUpdate() {
      setBackgroundColor(props.contract.type === 'put' ? "#00ff4930" : "#ff000021");
      updateTimer.current = window.setTimeout(() => {
        setBackgroundColor("");
        updateTimer.current = null;
      }, 300);
    }
    
    if(!updateTimer.current) {
      setUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.contract.type, props.contract.booktops[0].bid, props.contract.booktops[0].ask]);
  
  function handleClick(e: any) {
    UIStore.focusedContract = props.contract.id;
  }

  const store = toJS(UIStore)

  return (
    <td onClick={handleClick} style={{backgroundColor}} key={props.contract.id + '-' + props.contract.type} colSpan={3} className={classnames({
      [styles.ContractCell]: true,
      [styles.active]: store && store.focusedContract === props.contract.id,
      })} data-testid="ContractCell">
        <div className={classnames([styles.cellContainer, 'cellContainer'])}>
          <div className={classnames({[styles.contractWrapper]: true, [styles.flipOI]: props.flipOI})}>
            {!props.flipOI ? [OI, bidAsk] : [bidAsk, OI]}
          </div>
        </div>
    </td>
  )
};

export default inject('UIStore')(observer(ContractCell));
