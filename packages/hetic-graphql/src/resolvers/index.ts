import { Resolvers } from '../generated/graphqlgen'
import { Crypto } from './Crypto'
import { Mutation } from './Mutation'
import { Query } from './Query'
import { Value } from './Value'

// Resolvers define the technique for fetching the types in the schema.
const resolvers: Resolvers = {
  Query,
  Crypto,
  Mutation,
  Value,
}

export default resolvers
