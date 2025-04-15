# What is this?

App is done 2022 to learn Node.js backend development and TypeScript.

This is Eventshuffle-backend. It can be used for organizing meetings 
between multiple participants. It saves new events and lets participants
vote suitable dates for them.

# How to run this?

With docker-compose go to root of the project and give command. 
```
docker-compose up
```

Servers starts in you localhost:5001 and database is running in 5002
After the first connection you need to run create_needed_tables.sql script from ./es_database_tables.sql
Default sql connection for localhost can be found from docker-compose.yaml

After connecting to database try [Swagger](http://localhost:5001/api/v1/api-docs/) or npm run test from in directory /es_database
