import { context, dataSources } from './server'

export interface Crypto {
  id: number
  symbol: string
  name?: string
  stared: boolean
}

export interface Value {
  id: number
  cryptoId: number
  date: string
  value: number
}

export type Context = typeof context & {
  dataSources: ReturnType<typeof dataSources>
}
