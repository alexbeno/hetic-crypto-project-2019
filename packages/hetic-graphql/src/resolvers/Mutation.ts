import { MutationResolvers } from '../generated/graphqlgen'

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  updateCrypto: (_parent, args, ctx) => ctx.dataSources.cryptoAPI.updateOne(args),
}
