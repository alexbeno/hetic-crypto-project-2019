// https://github.com/apollographql/apollo-server/issues/2617

import { DataSource } from 'apollo-datasource'

declare module 'apollo-datasource' {
  interface DataSource<TContext = any> {
    context: TContext
  }
}
