import { BaseAPI } from './base'
import { Value } from '../types'

export class ValuesAPI extends BaseAPI {
  findAll() {
    return this.context.pg.query<Value>('SELECT * FROM values')
  }
}
