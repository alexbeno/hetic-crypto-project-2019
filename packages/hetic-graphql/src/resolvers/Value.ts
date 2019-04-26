import { ValueResolvers } from '../generated/graphqlgen'

export const Value: ValueResolvers.Type = {
  ...ValueResolvers.defaultResolvers,

  cryptocurrency(parent, _args, { dataSources }) {
    return dataSources.cryptoAPI.findOne(parent.cryptoId)
  },
}
