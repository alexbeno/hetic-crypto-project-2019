import { context, dataSources } from './server'

export interface Crypto {
  id: number
  symbol: string
  name?: string
  starred: boolean
}

export interface Value {
  id: number
  cryptoId: number
  date: Date
  value: number
}

export type Context = typeof context & {
  dataSources: ReturnType<typeof dataSources>
}
