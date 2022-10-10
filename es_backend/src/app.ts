import express from 'express'
const app = express()
require('express-async-errors')
const cors = require('cors')
const events = require('./routes/events')
const participants = require('./routes/participants')

app.use(cors())
app.use(express.json())


app.get('/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong');
});

app.use('/api/', participants)
app.use('/api/v1/', events)

module.exports = app
