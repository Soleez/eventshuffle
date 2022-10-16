
const supertest = require('supertest')
const apiTest = require('../app')

const api = supertest(apiTest)


const newEvent = {
  "name": "Automation testing",
  "dates": [
    "2023-01-01",
    "2023-01-05",
    "2023-01-12"
  ]
}

const newVotes = {
  "name": "TestUser",
  "votes": [
    "2023-01-01",
    "2023-01-05",
  ]
}

describe('Test posting to database', () => {
  test('Post new event', async () => {
    await api
    .post('/api/v1/event')
    .send(newEvent)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  })
  test('Post votes to first event', async () => {
    await api
    .post('/api/v1/event/1/vote')
    .send(newVotes)
    .expect('Content-Type', /application\/json/)
  })
})

describe('Test all get actions', () => {
  test('Get all events', async () => {
    await api
    .get('/api/v1/event/list')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  })
  test('Get one event', async () => {
    await api
    .get('/api/v1/event/1')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  })
  test('Get one event with results', async () => {
    await api
    .get('/api/v1/event/1/results')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  })
})

