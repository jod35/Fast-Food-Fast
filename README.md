# Fast Food Fast
This is a food delivery app for a restaurant


## Features
- Users can create accounts
- Users can make orders
- Users can update or delete their orders if they are not yet worked on
- Restaurants view orders and confirm delivery
- Users can change their credentials if needed
- Restaurant can mark orders as complete
- Restaurant can keep track of complete orders


## Built With 
- Flask (Python Web Framework)
- JavaScript
- CSS and HTML
- Marshmallow (Object serialization and deserialization tool)
- PostgreSQL database
- Pytest

## Create your own instance

### 1. Install PostgreSQL
Download and install PostgreSQL
### 2. Install Requirements with 

  ##### ` pip install -r requirements.txt `

### 3.Run with the following

 ##### ` export FLASK_APP=run.py `

  ##### ` flask run `

### 4. Run tests with 
 ##### ` pytest `


 
## The API 
 
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
 /api/users/| GET | get all user accounts
 /api/user/username | GET | get a user with a username
 /api/user/username | PATCH | update user credentials except for the password




## Live Project
[Project is live right here](https://fast-food-fastlive.herokuapp.com)


## Author
[Ssali Jonathan](https://github.com/jod35)