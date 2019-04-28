import { BaseAPI } from './base'
import { Crypto } from '../types'
import { MutationResolvers, QueryResolvers } from '../generated/graphqlgen'

export class CryptoAPI extends BaseAPI {
  findAll(args: QueryResolvers.ArgsCryptoes) {
    if (args.orderBy) {
      const [column, order] = args.orderBy.split('_')
      return this.context.pg.query<Crypto>(`SELECT * FROM crypto ORDER BY ${column} ${order}`)
    }
    return this.context.pg.query<Crypto>(`SELECT * FROM crypto`)
  }

  findOne(id: number) {
    return this.context.pg.queryOne<Crypto>(`SELECT * FROM crypto WHERE id = ${id}`)
  }

  updateOne(args: MutationResolvers.ArgsUpdateCrypto) {
    return this.context.pg.queryOne<Crypto>(
      `UPDATE crypto SET starred='${args.starred}' WHERE id = ${args.id} RETURNING *`,
    )
  }
}
