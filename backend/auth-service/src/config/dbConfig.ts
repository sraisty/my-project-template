import knex from 'knex'

const db = knex({
  client: 'pg',
  connection: process.env.DB_URI || 'postgres://user:password@localhost:5432/authservice',
})

export default db
