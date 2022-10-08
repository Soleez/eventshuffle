require('dotenv').config()

const PORT = process.env.NODE_ENV === 'test' 
  ? process.env.TEST
  : 5001 //process.env.DEV

const DB_CONNECTION = process.env.DB_CONNECTION


module.exports = {
  DB_CONNECTION,
  PORT
}
