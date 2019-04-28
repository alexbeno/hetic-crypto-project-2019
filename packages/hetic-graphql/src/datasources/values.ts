import { BaseAPI } from './base'
import { Value } from '../types'
import { QueryResolvers } from '../generated/graphqlgen'

export class ValuesAPI extends BaseAPI {
  findAll(args: QueryResolvers.ArgsValues) {
    if (args.createdAt_in) {
      const [start, end] = args.createdAt_in
      return this.context.pg.query<Value>(
        `SELECT * FROM values WHERE '[${start}, ${end}]'::daterange @>date`,
      )
    }

    return this.context.pg.query<Value>('SELECT * FROM values')
  }
}
