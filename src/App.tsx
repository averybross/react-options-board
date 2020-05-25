import React from 'react';

import styles from './App.module.css';
import OptionsBoard from './components/OptionsBoard/OptionsBoard';
import StrikePriceChart from './components/StrikePriceChart/StrikePriceChart';
import ContractsStore from './stores/ContractsStore';
import { Provider } from 'mobx-react';
import UIStore from './stores/UIStore';

function App() {
  return (
    <div className={styles.App} style={{height: window.innerHeight}}>
      <Provider ContractsStore={ContractsStore} UIStore={UIStore}>
        <OptionsBoard />
        <StrikePriceChart />
      </Provider>
    </div>
  );
}

export default App;
