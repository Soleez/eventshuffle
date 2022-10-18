import dotenv = require('dotenv')
dotenv.config()

process.env.TZ = 'EEST' // Europe/Helsinki  // UTC

const PORT = process.env.NODE_ENV === 'test' 
  ? process.env.TEST
  : 5001 //process.env.DEV

  
export default PORT
