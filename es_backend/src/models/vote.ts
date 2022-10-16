
export interface iVoteClass {
  date: Date
  people: Array<String>
}


class VoteClass {
  date: Date
  people: Array<String>

  constructor(date: Date, people: Array<String>) {
    this.date = date
    this.people = people
  }
}


export interface iTimeslot {
  id: number
  date: Date
}

export interface iVoteInsert {
  name: String
  votes: Array<Date>
}

class VoteInsert {
  name: String
  dates: Array<Date>

  constructor(name: String, dates: Array<Date>) {
    this.name = name
    this.dates = dates
  }
}
  



// validoi
const getVote = (date: Date, people: Array<String>) => { 
  return new VoteClass(
    date,
    people
  )
}

// validoi
const setVote = (name: String, dates: Array<Date> ) => { 
  return new VoteInsert(
    name,
    dates
  )
}

const mapTimeslotId = (timeslots: Array<iTimeslot>, data: iVoteInsert) => {
  return data.votes.map(date => { 
    date = new Date(date)
    const found = timeslots.find(row => row.date.getTime() === date.getTime())
    if(found) return [found.id, data.name, date]
    else return {validationError: `Date ${date} is not valid for this event`}
  })
}


const reduceVotes = (eventRows: Array<any>, voteRows: Array<any>) => {
  return eventRows.reduce((result, currentVal) => {
    if(voteRows === undefined) {
      return result
    }
    const votes = voteRows.filter(voteRow => currentVal.date.getTime() === voteRow.date.getTime())
    
    if(votes.length > 0) {
      const voters = votes.map(vote => vote.name)
      const returnedObj = getVote(currentVal.date, voters)
      return result.concat(returnedObj)
    }
    else return result
  }, [])
}



module.exports = {
  getVote,
  setVote,
  mapTimeslotId,
  reduceVotes
}
