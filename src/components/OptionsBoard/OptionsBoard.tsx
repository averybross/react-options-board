import React, { useMemo, useEffect } from 'react';
import styles from './OptionsBoard.module.css';


import io from 'socket.io-client';
import CurrencyLabel from '../CurrencyLabel/CurrencyLabel.lazy';
import OptionsBoardTableBody from '../OptionsBoardTableBody/OptionsBoardTableBody';
import OptionsBoardTableHead from '../OptionsBoardTableHead/OptionsBoardTableHead';
import Header from '../Header/Header.lazy';
import { OptionsBoardProps } from './OptionsBoard.lazy';
import ContractsStore from '../../stores/ContractsStore';
import { observer, inject } from 'mobx-react';

const socket = io();

export interface Booktop {
  contract_id: number;
  bid: number;
  clock: number;
  ask: number;
  contract_type: string;
  datetime: number;
}

export interface ContractTable {
  [key: string]: [
    [Contract, Contract]
  ];
}

export interface Contract {
  id: number;
  name: string;
  booktops: Booktop[];
  label: string;
  underlying_asset: string;
  collateral_asset: string;
  active: string;
  type: string;
  strike_price: number;
  min_increment: string;
  date_live: string;
  date_expires: string;
  date_exercise: string;
  derivative_type: string;
  open_interest: string;
  is_one_day: string;
}

export type TableLookup = [
  string,
  number,
  number
]

export interface Dictionary<T> {
  [Key: string]: T;
}
const OptionsBoard: React.FC<OptionsBoardProps> = (props) => {

  useEffect(() => {
    fetch(`https://lxboard.herokuapp.com/api/?after_ts=${new Date().toISOString()}`)
        .then((resp) => resp.json())
        .then(({optionsContracts, optionsDictionary, nextDayContracts, activeNextDayContract}) => {
            ContractsStore.optionsContracts = optionsContracts;
            ContractsStore.optionsDictionary = optionsDictionary;
            ContractsStore.nextDayContracts = nextDayContracts;
            ContractsStore.activeNextDayContract = activeNextDayContract;
            
        }).catch(err => {
    });
  }, [])

  useEffect(() => {
    
    socket.on('message', (payload: string) => {

      const booktop = JSON.parse(payload) as Booktop;

      if(!ContractsStore.optionsDictionary || !ContractsStore.optionsContracts) {
        return;
      }

      booktop.datetime = Date.now();

      if(ContractsStore.optionsContracts && ContractsStore.optionsDictionary[booktop.contract_id]) {
        const [a, b, c] = ContractsStore.optionsDictionary[booktop.contract_id];      
        ContractsStore.optionsContracts[a][b][c].booktops.unshift(booktop);
      }
      
      if(ContractsStore.activeNextDayContract && ContractsStore.activeNextDayContract && ContractsStore.activeNextDayContract.id === booktop.contract_id){
  
        ContractsStore.activeNextDayContract.booktops.unshift(booktop);
      }
    });

    return () => {
      socket.emit('disconnect');
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  const bitcoinHeader = useMemo(() => {
    return (
      <Header>
        <h3>Trade Bitcoin</h3>
      </Header>
      )
  }, [])
  

  const putCallHeader = useMemo(() => {
    return (
      <Header>
        <h3>Call Options</h3>
        <h3>Put Options</h3>
      </Header>
      )
  }, [])
  
  return ContractsStore && ContractsStore.activeNextDayContract && ContractsStore.optionsContracts && Object.keys(ContractsStore.optionsContracts).length ? <div className={styles.boardWrapper}>
    <div className={styles.OptionsBoard} data-testid="OptionsBoard">
      {bitcoinHeader}
      <div className={styles.bitcoinPrice}>
        <CurrencyLabel price={(ContractsStore.activeNextDayContract && ContractsStore.activeNextDayContract.booktops[0].bid) || 0} /> / <CurrencyLabel price={(ContractsStore.activeNextDayContract && ContractsStore.activeNextDayContract.booktops[0].ask) || 0} />
      </div>
      {putCallHeader}
      <div className={styles.tableWrapper}>
        <table>
          <OptionsBoardTableHead />
          {Object.keys(ContractsStore.optionsContracts).length && <OptionsBoardTableBody contracts={ContractsStore.optionsContracts} bitcoin={ContractsStore.activeNextDayContract.booktops[0]} />}
        </table>
      </div>
    </div>
  </div> : <div></div>}

export default inject('ContractsStore')(observer(OptionsBoard));