const format = require('pg-format');

// Get events list
const getEvents: String = `
  SELECT 
    es_event_id AS id, 
    event_name AS name
  FROM es_event
`

// Get single event
const getEventsById: String = `
  SELECT 
    e.es_event_id AS id, 
    e.event_name AS name,
    et.timeslot AS date
  FROM es_event AS e
  LEFT OUTER JOIN es_event_timeslot AS et ON e.es_event_id = et.es_event_id
  WHERE e.es_event_id = $1
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
  getEvents,
  getEventsById,
  postEvent,
  postDates,
  lastId
}
