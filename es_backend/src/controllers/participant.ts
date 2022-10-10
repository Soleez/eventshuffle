import { Request, Response } from "express";

const dbConfig = require('../utils/dbConfig')
const db = dbConfig.DB

const getParticipants = async (req: Request, res: Response) => {
  const sqlQuey: string = 'SELECT * FROM es_user'
  const result = await db.query(sqlQuey)
  res.status(200).send(result.rows)
}


module.exports = {
  getParticipants
}