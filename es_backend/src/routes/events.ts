const eventsRouter = require('express').Router()
const eventController = require('../controllers/events')
import { body } from 'express-validator';


eventsRouter.get('/event/list', eventController.getEvents)
eventsRouter.get('/event/:id', eventController.getEventById)
eventsRouter.get('/event/:id/results', eventController.getEventResultById)
eventsRouter.post('/event', [
  body('name').isString().notEmpty(), 
  body('dates').isArray().notEmpty()
], eventController.postEvent)
eventsRouter.post('/event/:id/vote', [
  body('name').isString().notEmpty(), 
  body('votes').isArray().notEmpty()
], eventController.postVote)

module.exports = eventsRouter
