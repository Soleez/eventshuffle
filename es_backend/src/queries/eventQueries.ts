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
    MIN(e.es_event_id) AS id, 
    e.event_name AS name,
    et.timeslot AS date
  FROM es_event AS e
  LEFT OUTER JOIN es_event_timeslot AS et ON e.es_event_id = et.es_event_id
  WHERE e.es_event_id = $1
  GROUP BY name, date
`

// Post single event
const postEvent: string = `
  INSERT INTO es_event (event_name)
  VALUES ($1)
  returning es_event_id
`

// Get all timeslots
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
  INNER JOIN es_user_timeslot_for_event AS votes 
    ON et.es_event_timeslot_id = votes.es_event_timeslot_id
  WHERE et.es_event_id = $1
  GROUP BY date, name
  ORDER BY date
`

// Get single event results
const getVoteResultByEventId: String = `

  -- reading from bottom to up makes it easier to understand

  SELECT DISTINCT
    user_name AS name,
    et.timeslot AS date
  FROM es_event_timeslot AS et
  INNER JOIN es_user_timeslot_for_event AS votes 
  ON et.es_event_timeslot_id = votes.es_event_timeslot_id
  WHERE et.es_event_id = $1 AND et.timeslot = (

    -- declare temp table to select only timeslot
    SELECT temp_x.date FROM (

      -- select timeslots that are having the count of all users
      SELECT DISTINCT
        COUNT(distinct user_name) as count,
        et.timeslot AS date
      FROM es_event_timeslot AS et
      INNER JOIN es_user_timeslot_for_event AS votes 
      ON et.es_event_timeslot_id = votes.es_event_timeslot_id
      WHERE et.es_event_id = $1
      GROUP BY date
      HAVING COUNT(distinct user_name) = (

        -- select count of different users
        SELECT DISTINCT
          COUNT(distinct user_name) as count
        FROM es_event_timeslot AS et
        INNER JOIN es_user_timeslot_for_event AS votes 
        ON et.es_event_timeslot_id = votes.es_event_timeslot_id
        WHERE et.es_event_id = $1
      )
    ) temp_x -- end temp table
  )
`


const lastId: string = `
  SELECT lastval() as id
`

const checkEventId: string = `
  SELECT MAX(es_event_id) FROM es_event
`


module.exports = {
  checkEventId,
  getEvents,
  getEventsById,
  getVoteByEventId,
  getVoteResultByEventId,
  getTimeslots,
  postEvent,
  postDates,
  postVotes,
  lastId
}
