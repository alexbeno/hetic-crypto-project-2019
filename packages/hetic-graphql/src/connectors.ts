import { Client, ClientConfig, QueryConfig } from 'pg'

/*
 * Layer on top of a database/backend driver that has GraphQL-specific error handling,
 * logging, batching, and/or caching.
 *
 * https://github.com/apollographql/graphql-tools/blob/master/designs/connectors.md
 */
export class PostgreSQLConnector {
  private client: Client

  constructor(config?: string | ClientConfig) {
    this.client = new Client(config)
  }

  connect() {
    return this.client.connect()
  }

  disconnect() {
    return this.client.end()
  }

  async query<T = any>(queryTextOrConfig: string | QueryConfig, values?: any[]): Promise<T[]> {
    const { rows } = await this.client.query(queryTextOrConfig, values)
    return rows as T[]
  }

  async queryOne<T = any>(queryTextOrConfig: string | QueryConfig, values?: any[]): Promise<T> {
    const { rows } = await this.client.query(queryTextOrConfig, values)
    return rows[0] as T
  }
}
