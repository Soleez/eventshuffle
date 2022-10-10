const participantsRouter = require('express').Router()
const Participant = require('../controllers/participant')

participantsRouter.get('/participants', Participant.getParticipants)

module.exports = participantsRouter
