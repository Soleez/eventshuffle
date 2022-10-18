import {iEventDetails} from './event'

export interface iVoteClass {
  date: Date
  people: Array<string>
}

export interface iTimeslot {
  id: number
  date: Date
}

export interface iVoteObj {
  name: string
  date: Date
}

export interface iVoteInsert {
  name: string
  votes: Array<Date>
}

class VoteClass {
  date: Date
  people: Array<string>

  constructor(date: Date, people: Array<string>) {
    this.date = date
    this.people = people
  }
}


class VoteInsert {
  name: string
  dates: Array<Date>

  constructor(name: string, dates: Array<Date>) {
    this.name = name
    this.dates = dates
  }
}
  



const getVote = (date: Date, people: Array<string>) => { 
  return new VoteClass(
    date,
    people
  )
}


const setVote = (name: string, dates: Array<Date> ) => { 
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


const reduceVotes = (eventRows: Array<iEventDetails>, voteRows: Array<iVoteObj>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return eventRows.reduce((result: any, currentVal: iEventDetails) => {
    if(voteRows === undefined) {
      return result
    }
    const votes = voteRows.filter(voteRow => currentVal.date.getTime() === voteRow.date.getTime())
    
    if(votes.length > 0) {
      const voters = votes.map(vote => vote.name)
      const returnedObj: VoteClass = getVote(currentVal.date, voters)
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
