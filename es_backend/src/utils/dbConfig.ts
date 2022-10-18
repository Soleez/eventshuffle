import dotenv = require('dotenv')
dotenv.config()
import pg = require('pg')

const DB = new pg.Client({
  user: "postgres",
  host: "localhost",  
  database: "postgres",
  password: "postgres",
  port: 5002
})


DB.connect((err: Error) => {
  if(err) {
    console.error('connection error', err.stack)
  }
})


export default DB
