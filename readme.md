In order to run this the services require a NATS server listening on localhost port 4222

to install and run nats with docker, Run the following commands:
docker pull nats:latest
docker run -p 4222:4222  nats:latest

then run each folder microservice:
npm start