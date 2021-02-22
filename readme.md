In order to run this the services require a NATS server listening on localhost port 4222

## How to run it
to install and run nats with docker, Run the following commands:
```sh
docker pull nats:latest
docker run -p 4222:4222  nats:latest
```

then from each folder run:
```sh
npm start
```

you could now send a post request to localhost:3000/order to create an order
```sh
curl --location --request POST 'localhost:3000/order' \
--header 'Content-Type: application/json' \
--data-raw '{
   "pizzas":[
      {
         "toppings":[
            {
               "name":"cheese"
            },
            {
               "name":"onion"
            }
         ]
      }
   ]
}'
```

this will return the order with an additional id field, you can check the order status using GET on localhost:3000/order/:id

```sh
curl --location --request GET 'localhost:3000/order/e72706a0-1e64-4111-bee9-5bc11583d933'
```
