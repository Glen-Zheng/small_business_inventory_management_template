-- @block
CREATE TABLE Stores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    store_location TEXT
);
-- @block
SELECT *
FROM stores;
-- @block
INSERT INTO Stores (store_location, hashed_password)
VALUES ("Don Mills and Sheppard", "randomhash");
-- @block
ALTER TABLE stores
ADD hashed_password VARCHAR(255) NOT NULL;
-- @block
ALTER TABLE stores DROP COLUMN hashed_password;
-- @block
DELETE from stores
WHERE id = 1;
-- @block
ALTER TABLE stores AUTO_INCREMENT = 1;
-- @block
DELETE FROM stores
WHERE id = 6;
-- @block
CREATE TABLE admin_data (
    usage_type VARCHAR(255) NOT NULL,
    pass_key VARCHAR(255) NOT NULL
);
-- @block
SELECT *
FROM admin_data;
-- @block
INSERT INTO admin_data(usage_type, pass_key)
VALUES (
        "admin password",
        "$2a$10$ZDLLJUPZbpiAMA6NPrYEgexB0Tp0WKcRW2yvKACK15rgKZDNfSD4K"
    );
--creating the meat of the db
--@block
CREATE TABLE ingredient_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255)
);
--@block
CREATE TABLE store_orders (
    id INT AUTO_INCREMENT,
    store_id INT NOT NULL,
    total_amount INT,
    order_date VARCHAR(255),
    contact_info VARCHAR(255),
    contact_name VARCHAR (255),
    PRIMARY KEY (id),
    FOREIGN KEY (store_id) references stores(id)
);
--@block
CREATE TABLE ordered_items (
    id INT AUTO_INCREMENT,
    order_id INT NOT NULL,
    inventory_item_id INT NOT NULL,
    quantity INT,
    cost INT,
    PRIMARY KEY (id),
    FOREIGN KEY (order_id) REFERENCES store_orders(id),
    FOREIGN KEY (inventory_item_id) REFERENCES inventory_items(id)
);
--@block
select *
from ordered_items;
--@block
CREATE TABLE inventory_items (
    id INT AUTO_INCREMENT,
    category_id INT,
    item_name VARCHAR (255),
    item_price INT,
    item_stock INT,
    item_size VARCHAR(255),
    item_units VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES ingredient_categories(id)
);
--inserting all the stuff now
--categories
--@block
INSERT INTO ingredient_categories (category_name)
VALUES ("Yogurt"),
    ("Powder"),
    ("Jam"),
    ("Syrup"),
    ("Toppings"),
    ("Teas"),
    ("Liquids"),
    ("Supplies");
--@block
INSERT INTO ingredient_categories (category_name)
VALUES ("Bakery");
--@block
SELECT *
from ingredient_categories;
--@block
INSERT INTO inventory_items (
        category_id,
        item_name,
        item_price,
        item_size,
        item_units
    )
VALUES (1, "Yogurt", 36.00, "10kg barrel", "Individual"),
    (
        1,
        "Baked Yogurt",
        50.40,
        "950ml bottle",
        "12/case"
    ),
    (
        2,
        "Blue Powder",
        30.00,
        "100g bag",
        "Individual"
    ),
    (
        2,
        "Thai Tea Powder",
        483.00,
        "1kg bag",
        "Individual"
    ),
    (
        2,
        "Milk Cotta Powder",
        430.00,
        "1kg bag",
        "Individual"
    ),
    (2, "Mochi Powder", 278.46, "1kg bag", "20/case"),
    (
        2,
        "Coconut Powder",
        420.00,
        "1kg bag",
        "20/case"
    ),
    (2, "Matcha Powder", 345.00, "1kg bag", "20/case"),
    (
        2,
        "Unsalted Milk Foam Powder",
        380.00,
        "1kg bag",
        "20/case"
    ),
    (
        2,
        "Milktea Powder",
        12.00,
        "1kg bag",
        "Individual"
    ),
    (
        2,
        "Chocolate Powder",
        19.00,
        "1kg bag",
        "Individual"
    ),
    (2, "Milk Powder", 72.00, "500g bag", "12/case"),
    (2, "Yogurt Powder", 300.00, "1kg bag", "20/case"),
    (3, "Mango Jam", 23.63, "850g can", "6/case"),
    (3, "Mango Sago", 150.82, "850g can", "12/case"),
    (
        3,
        "Passionfruit Jam",
        140.00,
        "1kg jar",
        "12/case"
    ),
    (3, "Pineapple Jam", 145.00, "1kg jar", "12/case"),
    (
        3,
        "Strawberry Jam",
        150.00,
        "1kg jar",
        "12/case"
    ),
    (
        4,
        "Blueberry Syrup",
        168.00,
        "5kg jug",
        "4/case"
    ),
    (
        4,
        "Brown Sugar Syrup",
        185.00,
        "5kg jug",
        "4/case"
    ),
    (4, "Lemon Syrup", 145.00, "5kg jug", "4/case"),
    (4, "Lychee Syrup", 95.00, "2kg bottle", "8/case"),
    (4, "Orange Syrup", 160.00, "5kg jug", "4/case"),
    (
        4,
        "Cranberry Syrup",
        35.00,
        "5kg jug",
        "Individual"
    ),
    (
        4,
        "White Peach Syrup",
        189.00,
        "5kg jug",
        "4/case"
    ),
    (4, "Syrup", 78.00, "25kg jug", "Individual"),
    (5, "Aloe Vera", 138.60, "3kg can", "6/case"),
    (
        5,
        "Coconut Pineapple Jelly",
        68.00,
        "4kg container",
        "4/case"
    ),
    (
        5,
        "Lychee Popping Boba",
        126.00,
        "3.2kg container",
        "4/case"
    ),
    (
        5,
        "Mango Popping Boba",
        185.00,
        "3kg container",
        "6/case"
    ),
    (
        5,
        "Yogurt Popping Boba",
        185.00,
        "3kg container",
        "6/case"
    ),
    (
        5,
        "Original Agar Boba",
        126.00,
        "2kg bags",
        "6/case"
    ),
    (5, "Oats", 75.00, "850g can", "12/case"),
    (5, "Red Bean", 176.40, "3kg can", "6/case"),
    (5, "Taro Cubes", 99.29, "1kg can", "12/case"),
    (5, "Yello Peach", 36.00, "Jar", "12/case"),
    (
        5,
        "Purple Rice Popping Grain",
        99.75,
        "850g can",
        "12/case"
    ),
    (
        5,
        "Oat Popping Grain",
        99.75,
        "850g can",
        "12/case"
    ),
    (
        5,
        "Red Bean Popping Grain",
        99.75,
        "850g can",
        "12/case"
    ),
    (
        5,
        "Sago Popping Grain",
        99.75,
        "850g can",
        "12/case"
    ),
    (
        5,
        "Water Chestnut Popping Grain",
        99.75,
        "850g can",
        "12/case"
    ),
    (
        5,
        "Highland Barley Popping Grain",
        99.75,
        "850g can",
        "12/case"
    ),
    (
        6,
        "Highly Fragrant Jasmine Green Tea No. 3",
        828.00,
        "",
        "30 bags"
    ),
    (7, "Coconut Milk", 40.00, "400ml", "24/case"),
    (8, "Cups", 167.00, "500ml", "1,000/box"),
    (8, "Straws", 125.00, "", "5,000/box"),
    (8, "Lids", 99.75, "", "1,000/box"),
    (8, "Bags (2 cup)", 160.00, "", "1,000/bag"),
    (8, "Bags (large)", 140.00, "", "1,000/bag"),
    (
        8,
        "Hi Yogurt Cup Sealing Cover",
        55.00,
        "1kg",
        "2,000/roll"
    ),
    (
        8,
        "Cup Order Sticker Roll",
        -1,
        "1kg",
        "10 rolls/pack"
    ),
    (
        8,
        "UPC Label",
        100.00,
        "1300/roll",
        "10rolls/case"
    ),
    (
        8,
        "Thermal Label Small",
        20.00,
        "",
        ""
    ),
    (
        8,
        "Thermal Label Large",
        50.00,
        "",
        ""
    ),
    (9, "Lava Buns", 9.00, "Unit", "6/box"),
    (9, "Macarons", 2.89, "Unit", "");
-- --@block
-- SELECT *
-- FROM inventory_items;
-- --@block
-- CREATE table prices(cost INT);
-- insert into prices(cost)
-- VALUES (
-- )
--@block
SELECT *
FROM inventory_items;
-- @block
UPDATE inventory_items
SET item_price = CASE
        WHEN id = 1 THEN 36.00
        WHEN id = 2 THEN 50.40
        WHEN id = 3 THEN 9.00
        WHEN id = 4 THEN 30.00
        WHEN id = 5 THEN 483.00
        WHEN id = 6 THEN 420.00
        WHEN id = 7 THEN 278.46
        WHEN id = 8 THEN 420.00
        WHEN id = 9 THEN 345.00
        WHEN id = 10 THEN 72.00
        WHEN id = 11 THEN 300.00
        WHEN id = 12 THEN 23.63
        WHEN id = 13 THEN 150.82
        WHEN id = 14 THEN 140.00
        WHEN id = 15 THEN 145.00
        WHEN id = 16 THEN 150.00
        WHEN id = 17 THEN 168.00
        WHEN id = 18 THEN 185.00
        WHEN id = 19 THEN 145.00
        WHEN id = 20 THEN 95.00
        WHEN id = 21 THEN 160.00
        WHEN id = 22 THEN 189.00
        WHEN id = 23 THEN 78.00
        WHEN id = 24 THEN 138.60
        WHEN id = 25 THEN 68.00
        WHEN id = 26 THEN 126.00
        WHEN id = 27 THEN 185.00
        WHEN id = 28 THEN 185.00
        WHEN id = 29 THEN 126.00
        WHEN id = 30 THEN 75.00
        WHEN id = 31 THEN 176.40
        WHEN id = 32 THEN 99.29
        WHEN id = 33 THEN 99.75
        WHEN id = 34 THEN 99.75
        WHEN id = 35 THEN 99.75
        WHEN id = 36 THEN 99.75
        WHEN id = 37 THEN 99.75
        WHEN id = 38 THEN 99.75
        WHEN id = 39 THEN 828.00
        WHEN id = 40 THEN 40.00
        WHEN id = 41 THEN 167.00
        WHEN id = 42 THEN 125.00
        WHEN id = 43 THEN 99.75
        WHEN id = 44 THEN 160.00
        WHEN id = 45 THEN 140.00
        WHEN id = 46 THEN 55.00 -- WHEN id = 47 THEN 555
    END;
--@block
ALTER TABLE inventory_items
MODIFY COLUMN item_price DECIMAL(10, 2);
--@block
ALTER TABLE ordered_items
MODIFY COLUMN cost DECIMAL(10, 2);
--@block
ALTER TABLE store_orders
MODIFY COLUMN total_amount DECIMAL(10, 2);
--@block
ALTER TABLE inventory_items
MODIFY COLUMN item_price DECIMAL(10, 2);
--@block
UPDATE inventory_items
SET item_name = CASE
        WHEN id = 6 THEN "Milk Cotta Powder"
    END;
--@block
DELETE FROM inventory_items;
--@block
SELECT *
FROM store_orders;
--@block
ALTER TABLE store_orders
ADD COLUMN buyer_location VARCHAR(255),
    ADD COLUMN order_status VARCHAR(50) DEFAULT 'Pending',
    ADD COLUMN order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
--@block
ALTER TABLE store_orders DROP COLUMN order_date;
--@block
SELECT *
FROM inventory_items;
--@block
SELECT store_orders.id,
    store_orders.total_amount,
    store_orders.order_date,
    store_orders.contact_info,
    store_orders.contact_name,
    store_orders.buyer_location,
    store_orders.order_status,
    stores.store_location,
    ordered_items.quantity,
    ordered_items.cost,
    inventory_items.item_name
FROM store_orders
    INNER JOIN stores ON store_orders.store_id = stores.id
    INNER JOIN ordered_items ON store_orders.id = ordered_items.order_id
    INNER JOIN inventory_items ON ordered_items.inventory_item_id = inventory_items.id
WHERE store_orders.id = 6;
--@block
SELECT store_orders.id,
    store_orders.total_amount,
    store_orders.order_date,
    store_orders.contact_info,
    store_orders.contact_name,
    store_orders.buyer_location,
    store_orders.order_status,
    stores.store_location
FROM store_orders
    LEFT JOIN stores ON store_orders.store_id = stores.id;
--@block
SELECT so.id AS order_id,
    so.total_amount,
    so.order_date,
    stores.store_location,
    so.contact_info,
    so.contact_name,
    so.buyer_location,
    so.order_status,
    oi.quantity,
    oi.cost,
    ii.item_name,
    ii.item_price,
    ii.item_size,
    ii.item_units
FROM store_orders so
    LEFT JOIN stores ON so.store_id = stores.id
    LEFT JOIN ordered_items oi ON so.id = oi.order_id
    LEFT JOIN inventory_items ii ON oi.inventory_item_id = ii.id
ORDER BY so.id,
    ii.item_name;
-- SELECT orders.order_id,
--     customers.customer_name,
--     products.product_name,
--     orders.quantity
-- FROM orders
--     LEFT JOIN customers ON orders.customer_id = customers.customer_id
--     LEFT JOIN products ON orders.product_id = products.product_id;
--@block
SELECT inventory_items.id,
    ingredient_categories.category_name,
    inventory_items.item_name,
    inventory_items.item_price,
    inventory_items.item_stock,
    inventory_items.item_size,
    inventory_items.item_units
FROM inventory_items
    INNER JOIN ingredient_categories ON inventory_items.category_id = ingredient_categories.id
ORDER BY inventory_items.category_id;
--@block
DELETE FROM inventory_items
WHERE id = 154;
--@block
SELECT *
from store_orders;
--@block
select *
from inventory_items;
--@block
UPDATE inventory_items
SET column1 = value1,
    column2 = value2,
...
WHERE condition;