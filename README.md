# What is this?

# How to run this?

With docker-compose go to root of the project and give command. 

docker-compose up

Servers starts in you localhost:5001 and database is running in 5002



You can run the backend without database:
If you want to run the backend alone with docker you can use commands
cd es_backend
docker build -t es_backend .
docker run --name es_backend_server -p 5001:5001 es_backend 
backend runs in localhost 5005
If you dont want to use docker you run the backendcode useing npm start.

