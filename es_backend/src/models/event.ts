import {iVoteClass} from './vote'

export interface iEventClass {
  name: string
  dates: Array<Date>
}

export interface iBasicEvent {
  id: number
  name: string
}

export interface iEventDetails extends iBasicEvent {
  date: Date
}

class EventClass {
  name: string
  dates: Array<Date>

  constructor(name: string, dates: Array<Date>) {
    this.name = name
    this.dates = dates
  }
}

class BasicEvent {
  id: number
  name: string

  constructor(id: number, name: string) {
    this.id = id,
    this.name = name
  }
}

class EventDetails extends BasicEvent {
  dates: Array<Date>
  votes: Array<iVoteClass>

  constructor(id: number, name: string, dates: Array<Date>, votes: Array<iVoteClass>) {
    super(id, name)
    this.dates = dates
    this.votes = votes
  }
}



class EventResults extends BasicEvent {
  suitableDates: Array<iVoteClass>

  constructor(id: number, name: string, suitableDates: Array<iVoteClass>) {
    super(id, name)
    this.suitableDates = suitableDates
  }
}



/**
 * 
 * @param rows 
 * @returns 
 */
const createEvents = (rows: Array<iBasicEvent>) => {
  return rows.map(row => new BasicEvent(row.id, row.name))
}

/**
 * 
 * @param rows 
 * @returns 
 */
const createEventDetails = (rows: Array<iEventDetails>, votes: Array<iVoteClass>) => {
  const dates = rows.map(row => row.date)
  const eventwithDetails = new EventDetails(rows[0].id, rows[0].name, dates, votes)
  return eventwithDetails
}

/**
 * 
 * @param rows 
 * @returns 
 */
 const createEventResults = (rows: Array<iEventDetails>, votes: Array<iVoteClass>) => {
  const eventwithDetails = new EventResults(rows[0].id, rows[0].name, votes)
  return eventwithDetails
}


/**
 * 
 * @param name 
 * @param dates 
 * @returns 
 */
const createNewEvent = (name: string, dates: Array<Date> ) => { 
  return new EventClass(
    name,
    dates
  )
}


module.exports = {
  createEvents,
  createEventDetails,
  createEventResults,
  createNewEvent,
}
