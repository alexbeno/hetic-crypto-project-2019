import { DataSource, DataSourceConfig } from 'apollo-datasource'

import { Context } from '../types'

export class BaseAPI extends DataSource<Context> {
  constructor() {
    super()
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context.
   */
  initialize(config: DataSourceConfig<Context>) {
    this.context = config.context
  }
}
