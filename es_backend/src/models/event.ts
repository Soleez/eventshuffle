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
  suitableDates: Array<VoteClass>

  constructor(id: number, name: string, suitableDates: Array<VoteClass>) {
    super(id, name)
    this.suitableDates = suitableDates
  }
}


class VoteClass {
  date: Date
  people: Array<string>

  constructor(date: Date, people: Array<string>) {
    this.date = date
    this.people = people
  }
}


const createEvents = (rows: Array<any>) => {
  return rows.map(row => new BasicEvent(row.id, row.name))
}

const createEventDetails = (rows: Array<any>) => {
  const dates = rows.map(row => row.date)
  const eventwithDetails = new EventDetails(rows[0].id, rows[0].name, dates)
  return eventwithDetails
}

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
