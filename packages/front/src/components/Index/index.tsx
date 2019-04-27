import React from 'react'
import moment from 'moment'
import { Bar } from 'react-chartjs-2'
import { AppContext } from '../../context/AppProvider'

import './styles.css'

interface Value {
  t: number
  y: number
}

const Index = () => {
  const values = [
    128.2597,
    127.3648,
    127.5915,
    120.5738,
    120.5333,
    116.321,
    119.0547,
    116.595,
    120.0188,
    121.458,
    125.4518,
    125.7598,
    126.5072,
    124.0813,
    124.5783,
  ]

  var dateFormat = 'MMMM DD YYYY'
  var date = moment('April 01 2019', dateFormat)
  var data: Value[] = []

  values.forEach(value => {
    date = date.clone().add(1, 'd')

    if (date.isoWeekday() <= 5) {
      data.push({
        t: date.valueOf(),
        y: value,
      })
    }
  })

  const d = {
    datasets: [
      {
        label: '',
        backgroundColor: 'white',
        borderColor: 'red',
        data: data,
        type: 'line',
        pointRadius: 0,
        fill: false,
        lineTension: 0,
        borderWidth: 0,
      },
    ],
  }

  const options = {
    scales: {
      xAxes: [
        {
          type: 'time',
          distribution: 'series',
          ticks: {
            source: 'data',
            autoSkip: true,
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Value ($)',
          },
        },
      ],
    },
    tooltips: {
      intersect: false,
      mode: 'index',
      callbacks: {
        label: function(tooltipItem, myData) {
          return parseFloat(tooltipItem.value).toFixed(2)
        },
      },
    },
  }

  return (
    <AppContext.Consumer>
      {state => {
        const { crypto: selectedCrypto } = state

        return (
          <>
            <h2 className="PageTitle">
              Évolution du {selectedCrypto.name} ({selectedCrypto.symbol})
            </h2>

            <Bar data={d} options={options} width={900} height={300} />
          </>
        )
      }}
    </AppContext.Consumer>
  )
}

export default Index
