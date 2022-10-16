require('dotenv').config()
const dbClient = require('pg')
import { DatabaseError } from "pg"

const DB = new dbClient.Client({
  user: "postgres",
  host: "localhost",  
  database: "postgres",
  password: "postgres",
  port: 5002
})


DB.connect((err: DatabaseError) => {
  if(err) {
    console.error('connection error', err.stack)
  }
})



module.exports = {
  DB
}
