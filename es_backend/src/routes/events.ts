const eventsRouter = require('express').Router()
const eventController = require('../controllers/events')

eventsRouter.get('/event/list', eventController.getEvents)
eventsRouter.get('/event/:id', eventController.getEventById)
eventsRouter.get('/event/:id/results', eventController.getEventById)
eventsRouter.post('/event', eventController.postEvent)
eventsRouter.post('/event/:id/vote', eventController.postVote)


module.exports = eventsRouter
