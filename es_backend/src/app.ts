const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const events = require('./routes/events')
const participants = require('./routes/participants')

app.use(cors())
app.use(express.json())


app.use('/api/', participants)
app.use('/api/v1/', events)

module.exports = app
