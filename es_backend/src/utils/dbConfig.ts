import dotenv = require('dotenv')
dotenv.config()
import pg = require('pg')

const DB = new pg.Client({
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : 5432,
  user: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'postgres',
})


DB.connect((err: Error) => {
  if(err) {
    console.error('connection error', err.stack)
  }
})


export default DB
