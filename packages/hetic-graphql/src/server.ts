import { ApolloServer, gql } from 'apollo-server'
import fs from 'fs'

import { PostgreSQLConnector } from './connectors'
import resolvers from './resolvers'
import { CryptoAPI, ValuesAPI } from './datasources'

// Setup the database connection
const pg = new PostgreSQLConnector({
  host: '127.0.0.1',
  user: 'postgres',
  database: 'hetic',
})

/*
 * The context is the third argument passed to every resolver.
 * It is useful for passing things that any resolver may need, like
 * authentication scope, database connections, and custom fetch functions.
 */
export const context = { pg }

/*
 * Type definitions define the "shape" of your data and specify
 * which ways the data can be fetched from the GraphQL server.
 */
export const typeDefs = gql`
  ${fs.readFileSync(__dirname.concat('/schema.graphql'), 'utf8')}
`

/*
 * Pattern for fetching data from a particular service,
 * with built-in support for caching, deduplication, and error handling.
 */
export const dataSources = () => ({ valuesAPI: new ValuesAPI(), cryptoAPI: new CryptoAPI() })

// Set up Apollo Server
export const server = new ApolloServer({
  context,
  dataSources,
  typeDefs,
  resolvers,
  // mocks: true
})

if (process.env.NODE_ENV !== 'test') {
  // Etablish the database connection
  pg.connect()
  // Launches the web-server
  server.listen().then(({ url }) => console.log(`🚀  Server ready at ${url}`))
}
