import { ApolloServer, gql } from 'apollo-server'
import { createTestClient } from 'apollo-server-testing'

import resolvers from '../'
import { CryptoAPI, ValuesAPI } from '../../datasources'
import { typeDefs } from '../../server'
import { Crypto, Value } from '../../types'

jest.mock('../../datasources/crypto', () => {
  class CryptoAPI {
    findAll(): Crypto[] {
      return [{ id: 1, symbol: 'BTC', name: 'Bitcoin', stared: false }]
    }
  }
  return { CryptoAPI }
})

jest.mock('../../datasources/values', () => {
  class ValuesAPI {
    findAll(): Value[] {
      return [{ id: 1, cryptoId: 1, date: '1556297840685', value: 100000.1 }]
    }
  }
  return { ValuesAPI }
})

const GET_VALUES = gql`
  query {
    values {
      id
      date
      value
    }
  }
`

const GET_CRYPTO = gql`
  query {
    cryptocurrencies {
      id
      symbol
      name
    }
  }
`

describe('Queries', () => {
  let client: ReturnType<typeof createTestClient>

  beforeAll(() => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      dataSources: () => ({ cryptoAPI: new CryptoAPI(), valuesAPI: new ValuesAPI() }),
    })
    client = createTestClient(server)
  })

  it('fetches list of values', async () => {
    expect(await client.query({ query: GET_VALUES })).toMatchSnapshot()
  })

  it('fetches list of cryptocurrencies', async () => {
    expect(await client.query({ query: GET_CRYPTO })).toMatchSnapshot()
  })
})
