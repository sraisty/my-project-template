import type { Knex } from 'knex'
import dotenv from 'dotenv'

dotenv.config() // Load environment variables

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: process.env.DB_URI,
    migrations: {
      directory: './src/db/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './src/db/seeds',
      extension: 'ts',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DB_URI,
    migrations: {
      directory: './src/db/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './src/db/seeds',
      extension: 'ts',
    },
  },
}

export default config
