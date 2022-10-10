import { Request, Response } from "express";

const dbConfig = require('../utils/dbConfig')
const db = dbConfig.DB


const getEvents = async (req: Request, res: Response) => {
  const sqlQuery: string = 'SELECT * FROM es_event'
  const result = await db.query(sqlQuery)
  res.status(200).send(result.rows)
}


const getEventResult = async (req: Request, res: Response) => {
  const id = req.params.id
  const sqlQuery: string = `SELECT * FROM es_event WHERE es_event_id = ${id}`
  const result = await db.query(sqlQuery)
  res.status(200).send(result.rows)
}

module.exports = {
  getEvents,
  getEventResult
}