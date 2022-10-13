import { Request, Response } from "express";
import { DatabaseError, QueryResult } from "pg";

const Event = require('../models/event')
const dbConfig = require('../utils/dbConfig')
const eventQuery = require('../queries/eventQueries')
const db = dbConfig.DB

/**
 * 
 * @param req 
 * @param res 
 */
const getEvents = async (req: Request, res: Response) => {
  const result = await db.query(eventQuery.getEvents)
  const allEvents = Event.createEvents(result.rows)

  const resultObj = { "events": allEvents}
  res.status(200).send(resultObj)
}


/**
 * 
 * @param req 
 * @param res 
 */
const getEventById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const result = await db.query(eventQuery.getEventsById, [id])

  const allEvents = Event.createEventDetails(result.rows)
  res.status(200).send(allEvents)
}

/**
 * 
 * @param req 
 * @param res 
 */
const postEvent = async (req: Request, res: Response) => {
  const body = req.body

  const event = Event.createNewEvent(body.name, body.dates)

  // kokeile formatin kahta inserttiä kerralla
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
}


module.exports = {
  getEvents,
  getEventById,
  postEvent
}