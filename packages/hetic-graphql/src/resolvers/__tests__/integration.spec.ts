import { ApolloServer, gql } from 'apollo-server'
import { createTestClient } from 'apollo-server-testing'

import resolvers from '../'
import { CryptoAPI, ValuesAPI } from '../../datasources'
import { typeDefs } from '../../server'
import { Crypto, Value } from '../../types'

jest.mock('../../datasources/crypto', () => {
  class CryptoAPI {
    findAll(): Crypto[] {
      return [
        {
          id: 1,
          symbol: 'BTC',
          name: 'Bitcoin',
          starred: false,
        },
      ]
    }
  }
  return { CryptoAPI }
})

jest.mock('../../datasources/values', () => {
  class ValuesAPI {
    findAll(): Value[] {
      return [
        {
          id: 1,
          cryptoId: 1,
          date: new Date('2019-04-21T22:00:00.000Z'),
          value: 100000.1,
        },
      ]
    }
  }
  return { ValuesAPI }
})

const GET_VALUES = gql`
  query {
    values {
      id
      createdAt
      value
    }
  }
`

const GET_CRYPTOES = gql`
  query {
    cryptoes {
      id
      symbol
      name
      starred
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
    expect(await client.query({ query: GET_CRYPTOES })).toMatchSnapshot()
  })
})
