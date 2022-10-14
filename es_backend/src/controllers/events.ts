import { Request, Response } from "express";
import { DatabaseError, QueryResult } from "pg";

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
  const eventResult = await db.query(eventQuery.getEventsById, [id])

  const votesResult = await db.query(eventQuery.getVoteByEventId, [id])
  console.log(votesResult.rows)

  // 1 date many users
  const mapVotes = (rows: Array<any>) => {
    //for (const i: number; )
  }
  const mappedVotes = mapVotes(votesResult.rows)

  const votes = Vote.getVote()

  const allEvents = Event.createEventDetails(eventResult.rows)
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


/**
 * 
 * @param req 
 * @param res 
 */
 const postVote = async (req: Request, res: Response) => {
  const body = req.body
  const id = parseInt(req.params.id)

  // check that dates are ok
  const timeslots = await db.query(eventQuery.getTimeslots, [id])
  //console.log(timeslots.rows)
  //console.log(body.dates)

  const vote = Vote.setVote(body.name, body.dates)

  // kokeile formatin kahta inserttiä kerralla
  if(vote.name, vote.dates) {

      const mapData = (id: number, name: String, dates: Array<Date>) => {
        return dates.map(date => [id, name, date])
      }
      const dataForQuery = mapData(timeslots[0].id, vote.name, vote.dates)
      const postVotes = eventQuery.postVotes(dataForQuery)
      
      await db.query(postVotes, (err: DatabaseError, result: QueryResult) => {
        if (err) throw err
      })


      res.status(201).send(vote.name)
  }
}



module.exports = {
  getEvents,
  getEventById,
  postEvent,
  postVote
}