DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100),
	department_name VARCHAR(100),
	price DECIMAL(10,2),
	stock_quantity INT
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Muay Thai shorts', 'Clothing', 30.55, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('NVIDIA GTX 1080', 'Electronics', 550.52, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Plushie', 'Toys', 12.33, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Organic Plant Based Protein Powder', 'Health', 25.11, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('The Sword of Shanarra (Paperback)', 'Books', 20.22, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Shin Pads', 'Sports & Fitness', 25.33, 11);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Mouth Guard', 'Sports & Fitness', 8.89, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Charcoal Activated Underwear', 'Clothing', 43.21, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Slim Front Pocket Wallet', 'Accessories', 16.69, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Moccasin Slippers', 'Shoes', 35.62, 5);

SELECT * FROM products;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';