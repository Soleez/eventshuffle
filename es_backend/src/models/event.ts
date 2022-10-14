import {iVoteClass} from './vote'


/**
 * 
 */
class EventClass {
  name: string
  dates: Array<Date>

  constructor(name: string, dates: Array<Date>) {
    this.name = name
    this.dates = dates
  }
}

interface iEventClass {
  name: string
  dates: Array<Date>
}

/**
 * 
 */
class BasicEvent {
  id: number
  name: string

  constructor(id: number, name: string) {
    this.id = id,
    this.name = name
  }
}

interface iBasicEvent {
  id: number
  name: string
}


/**
 * 
 */
class EventDetails extends BasicEvent {
  dates: Array<Date>

  constructor(id: number, name: string, dates: Array<Date>) {
    super(id, name)
    this.dates = dates
  }
}

interface iEventDetails extends iBasicEvent {
  date: Date
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
const createEventDetails = (rows: Array<iEventDetails>) => {
  const dates = rows.map(row => row.date)
  const eventwithDetails = new EventDetails(rows[0].id, rows[0].name, dates)
  return eventwithDetails
}

/**
 * 
 * @param name 
 * @param dates 
 * @returns 
 */
// validoi
const createNewEvent = (name: string, dates: Array<Date> ) => { 
  return new EventClass(
    name,
    dates
  )
}


module.exports = {
  createEvents,
  createEventDetails,
  createNewEvent,
}
