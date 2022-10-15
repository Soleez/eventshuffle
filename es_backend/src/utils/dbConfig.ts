require('dotenv').config()
const dbClient = require('pg')

const DB = new dbClient.Client({
  user: "postgres",
  host: "localhost",  
  database: "postgres",
  password: "postgres",
  port: 5002,
  timezone: 'UTC+2'
})

DB.connect()

module.exports = {
  DB
}
