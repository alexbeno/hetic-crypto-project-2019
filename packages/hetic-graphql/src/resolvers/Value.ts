import { ValueResolvers } from '../generated/graphqlgen'

export const Value: ValueResolvers.Type = {
  ...ValueResolvers.defaultResolvers,
  createdAt: parent => parent.date.toISOString(),
  crypto: (parent, _args, ctx) => ctx.dataSources.cryptoAPI.findOne(parent.cryptoId),
}
