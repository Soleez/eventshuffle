/**
 *  
Show an event
Endpoint: /api/v1/event/{id}

Request
Method: GET

Parameters: id, long

Response
Body:

{
  "id": 0,
  "name": "Jake's secret party",
  "dates": [
    "2014-01-01",
    "2014-01-05",
    "2014-01-12"
  ],
  "votes": [
    {
      "date": "2014-01-01",
      "people": [
        "John",
        "Julia",
        "Paul",
        "Daisy"
      ]
    }
  ]
}
 */