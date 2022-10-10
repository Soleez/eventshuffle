require('dotenv').config()

const PORT = process.env.NODE_ENV === 'test' 
  ? process.env.TEST
  : 5001 //process.env.DEV

module.exports = {
  PORT
}
