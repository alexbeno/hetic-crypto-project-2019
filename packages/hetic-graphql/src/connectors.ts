import { execSync } from 'child_process'
import { Pool, PoolConfig, QueryConfig } from 'pg'

/*
 * Layer on top of a database/backend driver that has GraphQL-specific error handling,
 * logging, batching, and/or caching.
 *
 * https://github.com/apollographql/graphql-tools/blob/master/designs/connectors.md
 */
export class PostgreSQLConnector {
  private pool: Pool

  constructor(config?: PoolConfig) {
    this.pool = new Pool(config)
  }

  async connect() {
    try {
      await this.pool.connect()
    } catch {
      execSync('docker-compose up -d db')
      this.pool.connect()
    }
  }

  disconnect() {
    return this.pool.end()
  }

  async query<T = any>(queryTextOrConfig: string | QueryConfig, values?: any[]): Promise<T[]> {
    const { rows } = await this.pool.query(queryTextOrConfig, values)
    return rows as T[]
  }

  async queryOne<T = any>(queryTextOrConfig: string | QueryConfig, values?: any[]): Promise<T> {
    const { rows } = await this.pool.query(queryTextOrConfig, values)
    return rows[0] as T
  }
}
