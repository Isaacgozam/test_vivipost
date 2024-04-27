# Vivipost Backend Interview

UPDATES *************

✔ 1. Clone repository 

✔ 2. Create a backend server (free to choose library, NodeJS/Express recommended) - Done with NodeJS/Express

✔ 3. Make it so the backend endpoint /orders return the orders data with the following structure...

BONUS

✔ 1. Prepare the development environment with the previous Installation instructions. - I understood that this refers to the files management and organization, maybe it was something else?

✔ 2. Implement authorization using the 'token' header with the key 'VivipostInterview'. - Simulating an immediate login by the user

✔ 3. Implement an algorithm to modify the price based on the following conditions:... - Changes are notified in the console


Original post:

## Installation

1. Clone repository

2. Create a backend server (free to choose library, NodeJS/Express recommended)

```bash
  cd backend
  # Create project with your preferred backend library
```

## Ojective

Make it so the backend endpoint */orders* return the orders data with the following structure.
```json
    [
        {
            "id_order":1,
            "id_user":3,
            "tracking_number":"551354861575",
            "registration_date":"2024-09-03T18:05:00.000Z",
            "name":"Ronald E. Hernandez",
            "email":"RonaldEHernandez@rhyta.com",
            "products": [
                {
                    "id_product":3,
                    "name":"Luxurious Concrete Salad",
                    "price":"79.99",
                    "weight":800,
                    "height":35,
                    "length":23,
                    "width":28,
                    "registration_date":"2024-02-01T06:00:00.000Z",
                    "id_order_product":1,
                    "id_order":1,
                    "quantity":1
                },
                ... other products
            ]
        },
        ... other orders
    ]
```

## Instructions

1. Prepare the development environment with the previous Installation instructions.

2. Connect to the MySQL database with the credentials available in the */resources/.env* file.

3. Follow the DB Diagram available in the */resources/DB_Diagram.png* file to get the necessary information to accomplish the objective.

## Bonus

1. Ensure a clear separation of concerns among business logic, model and controller layers.

2. Implement authorization using the 'token' header with the key 'VivipostInterview'.

3. Implement an algorithm to modify the price based on the following conditions:
  - If the product weights less than 0.3kg the product is free.
  - For each whole 100g increment the price by $0.5.
  - Add an extra cost to the initial pricing based on the Tier of the product.
```bash
The products are spearated in different Tiers based on their volume.
  - Tier 1: 0cm^3 - 5,000cm^3
  - Tier 2: 5,001cm^3 - 10,000cm^3
  - Tier 3: 10,001cm^3 - 15,000cm^3
  ... and so on
The base extra cost for Tier 1 is $0.1 and each subsequent Tier multiply the cost 
from the previous Tier by a factor of 1.2. 
Ex. Tier 1: $0.1, Tier 2: $0.12, Tier 3: $0.144...
```

*IMPORTANT: The database weights are expressed in grams (g) and the dimensions in centimeters (cm).*
