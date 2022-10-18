import express = require('express')
require('express-async-errors')
const app = express()
import cors = require('cors')
import logger = require('morgan')
import events = require('./routes/events')


app.use(cors())
app.use(express.json())
app.use(logger('combined'))

app.use('/api/v1/', events.default)

export default app
