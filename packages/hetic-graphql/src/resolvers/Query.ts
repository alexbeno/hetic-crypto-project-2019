import { QueryResolvers } from '../generated/graphqlgen'

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  cryptoes: (_parent, args, ctx) => ctx.dataSources.cryptoAPI.findAll(args),
  values: (_parent, args, ctx) => ctx.dataSources.valuesAPI.findAll(args),
}
