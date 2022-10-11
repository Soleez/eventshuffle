/**
 *  
Show the results of an event
Endpoint: /api/v1/event/{id}/results Responds with dates that are suitable for all participants.

Request
Method: GET

Parameters: id, long

Response
{
  "id": 0,
  "name": "Jake's secret party",
  "suitableDates": [
    {
      "date": "2014-01-01",
      "people": [
        "John",
        "Julia",
        "Paul",
        "Daisy",
        "Dick"
      ]
    }
  ]
}
 */