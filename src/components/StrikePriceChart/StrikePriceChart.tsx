import React, { useEffect, useRef, useState } from 'react';
import styles from './StrikePriceChart.module.css';
import Highcharts from 'highcharts'
import { format } from 'date-fns';

import HighchartsReact from 'highcharts-react-official'
import { useWindowSize } from '../../hooks/useWindowResize';
import Header from '../Header/Header.lazy';
import { inject, observer } from 'mobx-react';
import UIStore from '../../stores/UIStore';
import ContractsStore from '../../stores/ContractsStore';
import { currencyFormatter } from '../CurrencyLabel/CurrencyLabel';

import DarkUnica from 'highcharts/themes/avocado';
import { formatStrike } from '../OptionRow/OptionRow';
import { daysBetween } from '../OptionsBoardTableBody/OptionsBoardTableBody';

DarkUnica(Highcharts);


interface ChartResponse {
  current: {
    container: any
    chart: any
  }
}

const formatDateShort = (date: Date) => format(date, 'h:mm a');
const formatDateLong = (date: Date) => format(date, 'h:mm:ss a');

const StrikePriceChart: React.FC = () => {
  const size = useWindowSize();
  const wrapperRef = useRef(null);

  let [chart, setChart] = useState<any>();
  
  
  useEffect(() => {
    if(chart) {
      if(wrapperRef.current) {
        const wrapperSize = (wrapperRef.current as unknown as HTMLElement);
        setTimeout(() => {
          chart.setSize(wrapperSize.scrollWidth, wrapperSize.scrollHeight);
        }, 20)
      }
      
    }
  }, [size, chart])
  
  function setChartInstance(ref: any) {
    setChart(ref);
  }

  const focusedId = UIStore && UIStore.focusedContract;

  if(!focusedId) {
    return <div></div>
  }
  
  if(!Object.keys(ContractsStore.optionsContracts).length || !UIStore.focusedContract) {
    return <div></div>
  }
  
  const [a, b, c] = ContractsStore.optionsDictionary[focusedId];

  const focusedContract = ContractsStore.optionsContracts[a][b][c]

  const options = {
    title: {
      text: null,
      style: {
          color: '#000',
          font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
      }
    },
    xAxis: {
        type: 'datetime',
        title: {
          text: 'Time'
        },
        labels: {
          formatter: (value : any) => {
            return formatDateShort(value.value)
          }
        }
    },
    legend: {
        enabled: true
    },
    yAxis: {
      title: {
        text: 'Price',
      },
      labels: {
        formatter: (value : any) => {
          return currencyFormatter.format(value.value)
        }
      }
    },
    tooltip: {
      formatter: function (a1 : any, a2 : any, a3 : any) {
        const that = this as any;
        return `${formatDateLong(that.point.x)}<br />${that.series.name} Price: ${currencyFormatter.format(that.point.y)}`
      }
    },
    chart: {
      zoomType: 'x'
    },
    credits: {
      enabled: false
    },
    series: [{
      type: 'line',
      name : 'Ask',
      step: true,
      color: 'rgb(5, 179, 227)',
      data: (focusedContract.booktops||[]).map(booktop => ([booktop.datetime, booktop.ask/100])),
    },
    {
      type: 'line',
      name : 'Midpoint',
      color: 'grey',
      step: true,
      data: (focusedContract.booktops||[]).map(booktop => ([booktop.datetime, ((booktop.bid+booktop.ask)/2)/100])),
    },
    {
      type: 'line',
      name : 'Bid',
      color: 'rgb(53, 114, 158)',
      step: true,
      data: (focusedContract.booktops||[]).map(booktop => ([booktop.datetime, booktop.bid/100])),
    }]
  }

  return (
    <div className={styles.StrikePriceChart}>
      <Header>
        <h3>Strike Detail</h3>
      </Header>
      <div className={styles.chartDetail}>
        <div>
          <h3>{ ContractsStore.optionsContracts ? focusedContract.type.charAt(0).toUpperCase() + focusedContract.type.slice(1) + ' Option - ' + formatStrike(focusedContract.strike_price) + ' Strike Price on ' + new Date(focusedContract.date_expires).toLocaleDateString('en-us') : ''}</h3>
          <h4>{Math.round(daysBetween(new Date(), new Date(focusedContract.date_expires)))} days left</h4>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td className={styles.cellAsk}>Ask</td>
                <td className={styles.cellAsk}>{currencyFormatter.format(focusedContract.booktops[0].ask/100)}</td>
              </tr>
              <tr>
                <td className={styles.cellMidpoint}>Midpoint</td>
                <td className={styles.cellMidpoint}>{currencyFormatter.format((focusedContract.booktops[0].ask/100 + focusedContract.booktops[0].bid/100) / 2)}</td>
              </tr>
              <tr>
                <td className={styles.cellBid}>Bid</td>
                <td className={styles.cellBid}>{focusedContract.booktops[0].bid ? currencyFormatter.format(focusedContract.booktops[0].bid/100) : 'None'}</td>
              </tr>
              <tr>
                <td className={styles.cellOI}>OI</td>
                <td className={styles.cellOI}>{focusedContract.open_interest ? formatStrike(parseInt(focusedContract.open_interest)*100) : 'None'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div ref={wrapperRef} style={{flex: 'auto', overflow: 'hidden', position: 'relative'}}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          allowChartUpdate={true}
          containerProps={{ style: { height: "100%" } }}
          callback={(chart: ChartResponse) => setChartInstance(chart)}
        />
      </div>
    </div>
  )
}

export default inject('UIStore', 'ContractsStore')(observer(StrikePriceChart));