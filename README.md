# RESTAPI

Before start, make sure you have installed:

```bash
docker -v
docker-compose -v
npm -v
```

and Postman or a similar tool.

## How to set it up

Check your docker:
```bash
docker-compose ps
```

At this point, nothing should be running. Now we can download the image and run docker in the background:
```bash
docker-compose up -d
```

Check your docker again. This time we will have a container up mapping to the internal port 1433:
```bash
docker-compose ps
```

## Create the database
First lets install the dependecies:
```bash
npm install
```

To create our database we can access the sqlcmd by doing:
```bash
docker exec -it sql-server-db "bash"
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P Summer@2021.
create database productsmanagement
go
```

Check if the database was created by listing all:
```bash
select name from sys.Databases
go
```

Select the one we created and create table:
```bash
use productsmanagement
go
CREATE TABLE products(productId int IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL, name nvarchar(100) NOT NULL, description nvarchar(1500), price decimal(19,2) NOT NULL, currency nvarchar(3) NOT NULL, views int NOT NULL, deleted bit NOT NULL)
go
```

Check if the table is there:
```bash
select * from products
go
```

This is just a sample on how to add a line in the table by cmd:
```bash
INSERT INTO products(name, description, price, currency, views, deleted) VALUES(N'Shoelala', N'Shoes for man in a special ocasion', 90, N'USD', 150, 0)
go
```

Now we are set!

Let's run the application:
```bash
npm start
```

## Usage
Here some samples of usage.

Get the list of products not flagged as deleted:
```bash
http://localhost:8080/api/products
```

Get a product by id and not flagged as deleted (the views number will be increased):
```bash
http://localhost:8080/api/product/5
```

Get a product by id not flagged as deleted, and convert currency(optional), the views number will be increased:
```bash
http://localhost:8080/api/product/5/CAD
```

Add a product(description is optional):
Body JSON:
```bash
    {
        "name": "Shoelala",
        "description": "Shoes for man on a special occasion",
        "price": 92.32,
        "currency": "USD",
        "views": 639,
        "deleted": false
    }
```
POST request:
```bash
http://localhost:8080/api/product
```

Update an existing product:
Body JSON:
```bash
    {
        "name": "Shoelala",
        "description": "Shoes for man on ANY occasion",
        "price": 57.89,
        "currency": "USD",
        "views": 639,
        "deleted": false
    }
```
PUT request:
```bash
http://localhost:8080/api/product/1
```

Delete product, here we flag the product as '"deleted": true':
DELETE request:
```bash
http://localhost:8080/api/product/5
```

Get Top viewed products:
Here we can set 2 different query params that are optional: top and currency.
top is the number of elements in the top viewed list you want, and currency is for convert the price in the currency set.
```bash
http://localhost:8080/api/products/top?top=6&currency=CAD
```
If no top is set, the default value is 5.
If no currency is set, the default is USD.

Please feel free to contact me if you need any further information: camila.herculano@gmail.com
