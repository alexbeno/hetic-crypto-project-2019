import { QueryResolvers } from '../generated/graphqlgen'

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  cryptocurrencies: (_parent, _args, { dataSources }) => dataSources.cryptoAPI.findAll(),
  values: (_parent, _args, { dataSources }) => dataSources.valuesAPI.findAll(),
}
