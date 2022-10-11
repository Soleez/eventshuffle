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
`


module.exports = {
  EventClass,
  getEvents,
  getEventsById,
  postEvent
}
