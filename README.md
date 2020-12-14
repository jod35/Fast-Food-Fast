 
 | ENDPOINT | METHOD | ACTION       |
 |----------|-------|---------------|
 /api/orders/ | GET  | return all orders
 /api/orders/  |POST | create new order
 /api/order/ID | GET  | get order by id
 /api/order/ID | PATCH | replace order with id
 /api/order/ID | PUT | update/edit an order with an id
 /api/order/ID | DELETE | delete an order with an id
 /api/orders/complete/ | GET | all orders that are complete
 /api/order/complete/ID | PATCH | mark an order as complete