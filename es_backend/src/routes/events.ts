const eventsRouter = require('express').Router()
const eventController = require('../controllers/events')

const swaggerUi = require('swagger-ui-express');
const options = require('../utils/swaggerOptions')

import { body } from 'express-validator';


// Initialize swagger-jsdoc -> returns validated swagger spec in json format
eventsRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(options.swaggerSpec));

/**
 * @swagger
 * /api/v1/event/list:
 *   get:
 *     summary: Get all events
 *     responses: 
 *       200:
 *         description: Success
 */
eventsRouter.get('/event/list', eventController.getEvents)

/**
 * @swagger
 * /api/v1/event/{id}:
 *   get:
 *     summary: Get single event
 *     parameters:
 *     - in: path
 *       name: id
 *       type: integer
 *       required: true
 *     responses: 
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
eventsRouter.get('/event/:id', eventController.getEventById)

/**
 * @swagger
 * /api/v1/event/{id}/results:
 *   get:
 *     summary: Get single event results
 *     parameters:
 *     - in: path
 *       name: id
 *       type: integer
 *       required: true
 *     responses: 
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
eventsRouter.get('/event/:id/results', eventController.getEventResultById)

/**
 * @swagger
 * /api/v1/event:
 *   post:
 *     summary: Add new event
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Event name
 *                   example: New party
 *                 dates:
 *                   type: array
 *                   description: dates for new event
 *                   example: [ "2023-01-01", "2023-01-05", "2023-01-12"]
 *     responses: 
 *       201:
 *         description: Success
 *       400:
 *         description: Validation error
 */
eventsRouter.post('/event', [
  body('name').isString().notEmpty(), 
  body('dates').isArray().notEmpty()
], eventController.postEvent)

/**
 * @swagger
 * /api/v1/event/{id}/vote:
 *   post:
 *     summary: Vote for dates of event
 *     parameters:
 *     - in: path
 *       name: id
 *       type: integer
 *       required: true
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Participant name
 *                   example: Jani
 *                 votes:
 *                   type: array
 *                   description: dates for new event
 *                   example: [ "2023-01-01", "2023-01-05"]
 *     responses: 
 *       201:
 *         description: Success
 *       400:
 *         description: Validation error
 */
eventsRouter.post('/event/:id/vote', [
  body('name').isString().notEmpty(), 
  body('votes').isArray().notEmpty()
], eventController.postVote)

module.exports = eventsRouter
