import { Request, Response } from "express";
import { DatabaseError, QueryResult } from "pg";

const Event = require('../models/event')
const dbConfig = require('../utils/dbConfig')
const db = dbConfig.DB


const getEvents = async (req: Request, res: Response) => {
  const result = await db.query(Event.getEvents)
  res.status(200).send(result.rows)
}


const getEventById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const result = await db.query(Event.getEventsById, [id])
  res.status(200).send(result.rows)
}


const postEvent = async (req: Request, res: Response) => {
  const body = req.body
  const event = new Event.EventClass(
    body.name,
    body.dates
  )
  if(event) {
      await db.query(Event.postEvent, [event.name], (err: DatabaseError, result: QueryResult) => {
        if (err) throw err
      })
      const result = await db.query('SELECT lastval() as id')
      res.status(201).send(result.rows[0])
  }
}


module.exports = {
  getEvents,
  getEventById,
  postEvent
}