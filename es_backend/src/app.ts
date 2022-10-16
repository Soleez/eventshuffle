const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const events = require('./routes/events')
const logger = require('morgan')

app.use(cors())
app.use(express.json())
app.use(logger('combined'))

app.use('/api/v1/', events)

module.exports = app
