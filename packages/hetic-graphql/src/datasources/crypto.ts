import { BaseAPI } from './base'
import { Crypto } from '../types'

export class CryptoAPI extends BaseAPI {
  findAll() {
    return this.context.pg.query<Crypto>('SELECT * FROM crypto')
  }

  findOne(id: number) {
    return this.context.pg.queryOne<Crypto>('SELECT * FROM crypto WHERE id = $1', [id])
  }
}
