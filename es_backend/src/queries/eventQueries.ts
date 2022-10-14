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

// Get single event
const getTimeslots: String = `
  SELECT 
    MIN(et.es_event_timeslot_id) AS id, 
    et.timeslot AS date
  FROM es_event_timeslot AS et
  WHERE et.es_event_id = $1
  GROUP BY date
`

// Post dates for event
const postDates: Function = (dates: Array<Array<any>>) => {
  return format(`
    INSERT INTO es_event_timeslot (es_event_id, timeslot)
    VALUES %L
  `, dates)
}


// Post dates for event
const postVotes: Function = (data: Array<Array<any>>) => {
  return format(`
    INSERT INTO es_user_timeslot_for_event (es_event_timeslot_id, user_name, timeslot)
    VALUES %L
  `, data)
}



// Get single event
const getVoteByEventId: String = `
  SELECT 
    et.timeslot AS date, 
    votes.user_name AS name
  FROM es_event_timeslot AS et
  LEFT OUTER JOIN es_user_timeslot_for_event AS votes 
    ON et.es_event_timeslot_id = votes.es_event_timeslot_id
  WHERE et.es_event_id = $1
  GROUP BY date, name
  ORDER BY date
`


const lastId: string = `
  SELECT lastval() as id
`


module.exports = {
  getEvents,
  getEventsById,
  getVoteByEventId,
  getTimeslots,
  postEvent,
  postDates,
  postVotes,
  lastId
}
