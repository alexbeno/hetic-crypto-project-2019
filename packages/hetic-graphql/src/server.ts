import { ApolloServer, gql } from 'apollo-server'
import fs from 'fs'

// The GraphQL schema
const typeDefs = gql`
  ${fs.readFileSync(__dirname.concat('/schema.graphql'), 'utf8')}
`

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
