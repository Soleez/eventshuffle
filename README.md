# What is this?

This is Eventshuffle-backend. It can be used for organizing meetings 
between multiple participants. It saves new events and lets participants
vote suitable dates for them.

App is running in:
https://eventshuffle.fly.dev/api/v1/api-docs/

# How to run this?

With docker-compose go to root of the project and give command. 
```
docker-compose up
```

Last minute notes: Browser might not be able to use multiple docker localhosts with my configurations
so it could be easier to run Backend on localmachine and database on docker.

Servers starts in you localhost:5001 and database is running in 5002
After the first connection you need to run create_needed_tables.sql script from ./es_database_tables.sql
Default sql connection for localhost can be found from docker-compose.yaml

After connecting to database try [Swagger](http://localhost:5001/api/v1/api-docs/) or npm run test from in directory /es_database
