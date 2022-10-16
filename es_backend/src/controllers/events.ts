import { Request, Response } from "express";
import { DatabaseError, QueryResult } from "pg";
import { validationResult } from 'express-validator';


const Event = require('../models/event')
const Vote = require('../models/vote')
const dbConfig = require('../utils/dbConfig')
const eventQuery = require('../queries/eventQueries')
const db = dbConfig.DB

/**
 * 
 * @param req 
 * @param res 
 */
const getEvents = async (req: Request, res: Response) => {
  await db.query(eventQuery.getEvents, (err: DatabaseError, result: QueryResult) => {
    if (err) throw err
    const allEvents = Event.createEvents(result.rows)
  
    const resultObj = { 'events': allEvents}
    res.status(200).send(resultObj)
  })
}


const eventIdCheck = async (id: number) => {
  const checkEventMaxId = await db.query(eventQuery.checkEventId)
  if((checkEventMaxId.rows[0].max < id) || (id < 0)) {
    return {'error': `event id ${id} is not found`}
  }
}

/**
 * 
 * @param req 
 * @param res 
 */
const getEventById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const idCheck = await eventIdCheck(id)

  if(idCheck?.error) {
    res.status(404).json(idCheck)
  }
  else {
    const eventDetails = await getEventDetails(id)
    res.status(200).send(eventDetails)
  }
}


/**
 * 
 * @param id 
 * @returns query values
 */
const getEventDetails = async (id: number) => {
  const eventResult = await db.query(eventQuery.getEventsById, [id])
  const votesResult = await db.query(eventQuery.getVoteByEventId, [id])
  
  const reducedVotes = Vote.reduceVotes(eventResult.rows, votesResult.rows)

  const eventDetails = Event.createEventDetails(eventResult.rows, reducedVotes)

  return eventDetails
}

/**
 * 
 * @param req 
 * @param res 
 */
 const getEventResultById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  const idCheck = await eventIdCheck(id)

  if(idCheck?.error) {
    res.status(404).json(idCheck)
  }
  else {
    const eventResult = await db.query(eventQuery.getEventsById, [id])
    const votesResult = await db.query(eventQuery.getVoteResultByEventId, [id])
    
    const reducedVotes = Vote.reduceVotes(eventResult.rows, votesResult.rows)
    
    const eventDetails = Event.createEventResults(eventResult.rows, reducedVotes)
    
    res.status(200).send(eventDetails)
  }
}

/**
 * 
 * @param req 
 * @param res 
 */
const postEvent = async (req: Request, res: Response) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const rbody = req.body

  const event = Event.createNewEvent(rbody.name, rbody.dates)

  if(event.name && event.dates) {
    await db.query(eventQuery.postEvent, [event.name], (err: DatabaseError, result: QueryResult) => {
      if (err) throw err
    })

    const result = await db.query(eventQuery.lastId)
    const lastId = result.rows[0]
    
    const mapDates = (id: number, dates: Array<Date>) => {
      return dates.map(date => [id, date])
    }

    const datesForQuery = mapDates(lastId.id, event.dates)
    const postDates = eventQuery.postDates(datesForQuery)
    
    await db.query(postDates, (err: DatabaseError, result: QueryResult) => {
      if (err) throw err
    })
    res.status(201).send(lastId)
  }
  else res.status(400).json({ errors: errors.array() });
}


/**
 * 
 * @param req 
 * @param res 
 */
const postVote = async (req: Request, res: Response) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const rbody = req.body
  const id = parseInt(req.params.id)

  const idCheck = await eventIdCheck(id)

  if(idCheck?.error) {
    res.status(404).json(idCheck)
  }
  else {
    // get event dates to check input is valid
    const timeslotsResult = await db.query(eventQuery.getTimeslots, [id])
    const timeslots = timeslotsResult.rows
  
    const mappedData: Array<any> = Vote.mapTimeslotId(timeslots, rbody)
  
    // send response if data is not valid
    const findErrors = mappedData.find(row => !Array.isArray(row))
    if(findErrors) {
      res.status(400).send(findErrors)
    }
    else {
      // post values
      const postVotes = eventQuery.postVotes(mappedData)
      await db.query(postVotes, (err: DatabaseError, result: QueryResult) => {
        if (err) throw err
      })
  
      // get new details
      const eventDetails = await getEventDetails(id)
  
      res.status(201).send(eventDetails)
    }
  }
}

module.exports = {
  getEvents,
  getEventById,
  getEventResultById,
  postEvent,
  postVote
}