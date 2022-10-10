const eventsRouter = require('express').Router()
const Events = require('../controllers/events')

eventsRouter.get('/event/list', Events.getEvents)
eventsRouter.get('/event/:id', Events.getEventResult)

module.exports = eventsRouter
