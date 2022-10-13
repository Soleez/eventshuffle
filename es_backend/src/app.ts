const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const events = require('./routes/events')

app.use(cors())
app.use(express.json())

app.use('/api/v1/', events)

module.exports = app
