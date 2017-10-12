drop database if exists bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
id INT NOT NULL auto_increment,
product_name VARCHAR(45) NULL,
dept_name VARCHAR(45) NULL,
price DECIMAL(10,2) NULL,
stock_quantity INT(10) NULL,
Primary key (id)
);

Insert Into products (product_name, dept_name, price, stock_quantity)
VALUES ("Tv stand", "Furniture", 250, 10), ("Cotton Sweater", "Clothing", 15.00, 75),
("Nike Shoes", "Shoes", 75.89, 25), ("Hot Pockets", "Food", 5.50, 100), ("Baseball bat","Sporting Goods", 19.25, 55), 
("Camping Stove", "Outdoors", 123.40, 15), ("DVD Player", "Electronics", 20, 200), 
("Bed Frame","Furniture", 570, 10), ("Black suit","Clothing", 450.00, 45), ("Tent","Outdoors", 115, 36);

SELECT * FROM bamazon_db.products;
