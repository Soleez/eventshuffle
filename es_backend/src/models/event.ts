const format = require('pg-format');


class EventClass {
  name: string
  dates: Array<Date>

  constructor(name: string, dates: Array<Date>) {
    this.name = name
    this.dates = dates
  }
}


// Get events list
const getEvents: String = `
  SELECT * 
  FROM es_event
`

// Get single event
const getEventsById: String = `
  SELECT * 
  FROM es_event 
  WHERE es_event_id = $1
`

// Post single event
const postEvent: string = `
  INSERT INTO es_event (event_name)
  VALUES ($1)
  returning es_event_id
`

// Post dates for event
const postDates: Function = (dates: Array<Array<any>>) => {
  return format(`
    INSERT INTO es_event_timeslot (es_event_id, timeslot)
    VALUES %L
  `, dates)
}

const lastId: string = `
  SELECT lastval() as id
`


module.exports = {
  EventClass,
  getEvents,
  getEventsById,
  postEvent,
  postDates,
  lastId
}
