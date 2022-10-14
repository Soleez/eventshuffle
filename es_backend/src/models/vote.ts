
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



module.exports = {
  getVote,
  setVote
}
