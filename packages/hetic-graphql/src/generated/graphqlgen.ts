// Code generated by github.com/prisma/graphqlgen, DO NOT EDIT.

import { GraphQLResolveInfo } from 'graphql'
import { Crypto, Value, Context } from '../types'

export namespace QueryResolvers {
  export const defaultResolvers = {}

  export type CryptocurrenciesResolver =
    | ((
        parent: undefined,
        args: {},
        ctx: Context,
        info: GraphQLResolveInfo,
      ) => Crypto[] | Promise<Crypto[]>)
    | {
        fragment: string
        resolve: (
          parent: undefined,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo,
        ) => Crypto[] | Promise<Crypto[]>
      }

  export type ValuesResolver =
    | ((
        parent: undefined,
        args: {},
        ctx: Context,
        info: GraphQLResolveInfo,
      ) => Value[] | Promise<Value[]>)
    | {
        fragment: string
        resolve: (
          parent: undefined,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo,
        ) => Value[] | Promise<Value[]>
      }

  export interface Type {
    cryptocurrencies:
      | ((
          parent: undefined,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo,
        ) => Crypto[] | Promise<Crypto[]>)
      | {
          fragment: string
          resolve: (
            parent: undefined,
            args: {},
            ctx: Context,
            info: GraphQLResolveInfo,
          ) => Crypto[] | Promise<Crypto[]>
        }

    values:
      | ((
          parent: undefined,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo,
        ) => Value[] | Promise<Value[]>)
      | {
          fragment: string
          resolve: (
            parent: undefined,
            args: {},
            ctx: Context,
            info: GraphQLResolveInfo,
          ) => Value[] | Promise<Value[]>
        }
  }
}

export namespace CryptoResolvers {
  export const defaultResolvers = {
    id: (parent: Crypto) => parent.id,
    symbol: (parent: Crypto) => parent.symbol,
    name: (parent: Crypto) => (parent.name === undefined ? null : parent.name),
  }

  export type IdResolver =
    | ((
        parent: Crypto,
        args: {},
        ctx: Context,
        info: GraphQLResolveInfo,
      ) => number | Promise<number>)
    | {
        fragment: string
        resolve: (
          parent: Crypto,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo,
        ) => number | Promise<number>
      }

  export type SymbolResolver =
    | ((
        parent: Crypto,
        args: {},
        ctx: Context,
        info: GraphQLResolveInfo,
      ) => string | Promise<string>)
    | {
        fragment: string
        resolve: (
          parent: Crypto,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo,
        ) => string | Promise<string>
      }

  export type NameResolver =
    | ((
        parent: Crypto,
        args: {},
        ctx: Context,
        info: GraphQLResolveInfo,
      ) => string | null | Promise<string | null>)
    | {
        fragment: string
        resolve: (
          parent: Crypto,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo,
        ) => string | null | Promise<string | null>
      }

  export interface Type {
    id:
      | ((
          parent: Crypto,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo,
        ) => number | Promise<number>)
      | {
          fragment: string
          resolve: (
            parent: Crypto,
            args: {},
            ctx: Context,
            info: GraphQLResolveInfo,
          ) => number | Promise<number>
        }

    symbol:
      | ((
          parent: Crypto,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo,
        ) => string | Promise<string>)
      | {
          fragment: string
          resolve: (
            parent: Crypto,
            args: {},
            ctx: Context,
            info: GraphQLResolveInfo,
          ) => string | Promise<string>
        }

    name:
      | ((
          parent: Crypto,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo,
        ) => string | null | Promise<string | null>)
      | {
          fragment: string
          resolve: (
            parent: Crypto,
            args: {},
            ctx: Context,
            info: GraphQLResolveInfo,
          ) => string | null | Promise<string | null>
        }
  }
}

export namespace ValueResolvers {
  export const defaultResolvers = {
    id: (parent: Value) => parent.id,
    date: (parent: Value) => parent.date,
    value: (parent: Value) => parent.value,
  }

  export type IdResolver =
    | ((
        parent: Value,
        args: {},
        ctx: Context,
        info: GraphQLResolveInfo,
      ) => number | Promise<number>)
    | {
        fragment: string
        resolve: (
          parent: Value,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo,
        ) => number | Promise<number>
      }

  export type CryptocurrencyResolver =
    | ((
        parent: Value,
        args: {},
        ctx: Context,
        info: GraphQLResolveInfo,
      ) => Crypto | Promise<Crypto>)
    | {
        fragment: string
        resolve: (
          parent: Value,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo,
        ) => Crypto | Promise<Crypto>
      }

  export type DateResolver =
    | ((
        parent: Value,
        args: {},
        ctx: Context,
        info: GraphQLResolveInfo,
      ) => string | Promise<string>)
    | {
        fragment: string
        resolve: (
          parent: Value,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo,
        ) => string | Promise<string>
      }

  export type ValueResolver =
    | ((
        parent: Value,
        args: {},
        ctx: Context,
        info: GraphQLResolveInfo,
      ) => number | Promise<number>)
    | {
        fragment: string
        resolve: (
          parent: Value,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo,
        ) => number | Promise<number>
      }

  export interface Type {
    id:
      | ((
          parent: Value,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo,
        ) => number | Promise<number>)
      | {
          fragment: string
          resolve: (
            parent: Value,
            args: {},
            ctx: Context,
            info: GraphQLResolveInfo,
          ) => number | Promise<number>
        }

    cryptocurrency:
      | ((
          parent: Value,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo,
        ) => Crypto | Promise<Crypto>)
      | {
          fragment: string
          resolve: (
            parent: Value,
            args: {},
            ctx: Context,
            info: GraphQLResolveInfo,
          ) => Crypto | Promise<Crypto>
        }

    date:
      | ((
          parent: Value,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo,
        ) => string | Promise<string>)
      | {
          fragment: string
          resolve: (
            parent: Value,
            args: {},
            ctx: Context,
            info: GraphQLResolveInfo,
          ) => string | Promise<string>
        }

    value:
      | ((
          parent: Value,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo,
        ) => number | Promise<number>)
      | {
          fragment: string
          resolve: (
            parent: Value,
            args: {},
            ctx: Context,
            info: GraphQLResolveInfo,
          ) => number | Promise<number>
        }
  }
}

export interface Resolvers {
  Query: QueryResolvers.Type
  Crypto: CryptoResolvers.Type
  Value: ValueResolvers.Type
}

// @ts-ignore
declare module 'graphql-tools' {
  interface IResolvers extends Resolvers {}
}