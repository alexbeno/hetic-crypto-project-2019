import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { AppContext } from '../../context/AppProvider'

import './styles.css'

interface Data {
  cryptocurrencies: Array<{
    id: number
    name: string
    symbol: string
  }>
}

const GET_CRYPTO_LIST = gql`
  {
    cryptocurrencies {
      id
      name
      symbol
    }
  }
`

const Navigation = () => {
  return (
    <AppContext.Consumer>
      {state => {
        const { crypto: selectedCrypto, setCrypto } = state

        return (
          <nav className="Navigation">
            <h2 className="NavigationTitle">Liste des cryptos</h2>

            <Query<Data> query={GET_CRYPTO_LIST}>
              {({ loading, error, data }) => {
                if (loading) return 'Chargement en cours...'
                if (error) return `Error! ${error.message}`

                if (data && 'cryptocurrencies' in data && selectedCrypto.id === 0) {
                  setCrypto(data.cryptocurrencies[0])
                }

                return (
                  <div className="list-group list-group-flush">
                    {data &&
                      data.cryptocurrencies.map(crypto => (
                        <a
                          key={crypto.id}
                          onClick={() => setCrypto(crypto)}
                          href="#"
                          className={`list-group-item list-group-item-action ${
                            selectedCrypto.id === crypto.id ? 'active' : ''
                          }`}
                        >
                          {crypto.name} ({crypto.symbol})
                        </a>
                      ))}
                  </div>
                )
              }}
            </Query>
          </nav>
        )
      }}
    </AppContext.Consumer>
  )
}

export default Navigation
