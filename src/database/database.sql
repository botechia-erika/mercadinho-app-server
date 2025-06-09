-- Active: 1704785311260@@127.0.0.1@3306

CREATE TABLE products (
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    item TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL DEFAULT "https://i.postimg.cc/J07Sp5fG/orange-Logo-removebg-preview-2.png",
    price REAL NOT NULL DEFAULT 0,
    category TEXT NOT NULL DEFAULT 'hort-fruti'
)

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    idProfile TEXT NOT NULL UNIQUE,
    fullName TEXT NOT NULL,
    nickname TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    avatar TEXT NOT NULL DEFAULT "https://i.postimg.cc/B6vxJjmY/orange-Logo-removebg-preview-2.png",
    role TEXT NOT NULL DEFAULT "Cadastrado",
    createdAt TEXT NOT NULL DEFAULT (DATETIME('NOW'))
);

CREATE TABLE accounts(
  id TEXT PRIMARY KEY NOT NULL UNIQUE,
  user_id TEXT NOT NULL,
  balance REAL NOT NULL DEFAULT 0,
  score NUMBER NOT NULL DEFAULT 0,
  category TEXT NOT NULL DEFAULT "blue",
  FOREIGN KEY (user_id) REFERENCES users(id)
  ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE purchases (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  buyer_id TEXT NOT NULL,
  finalPrice REAL NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT TIMESTAMP,
  FOREIGN KEY (buyer_id) REFERENCES users(id)
);
CREATE TABLE sales(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    idPurchase TEXT NOT NULL,
    item TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    totalPrice REAL NOT NULL,
    FOREIGN KEY (idPurchase) REFERENCES purchases(id)
    ON UPDATE CASCADE ON DELETE CASCADE
    FOREIGN KEY (item) REFERENCES products(id)
);


DROP TABLE purchases;
DROP TABLE sales;
DROP TABLE users;
DROP TABLE accounts;
SELECT * FROM accounts;
SELECT * FROM purchases;
SELECT * FROM sales;
SELECT * FROM users;


INSERT INTO products (id, item, description, image_url, price, category) VALUES 
("44fba7a9-9c72-4c97-9169-43df498807ac", "BANANA NANICA", "UNIDADE", "https://i.postimg.cc/Kc6J33CM/leites.webp", 3.99, "laticinios"),
("6dcbaca2-3197-4060-a21c-e4336e471d9a", "MANGA PALMER", "KG", "https://i.postimg.cc/Y95gzth9/manga-palmer.jpg", 12, "horti-fruti"),
("5398d327-06a2-4032-bec0-f673829c6061", "ABOBORA JAPONESA", "KG", "https://i.postimg.cc/nzB5kc0S/ABOBORA-JAPONESA.jpg", 5, "horti-fruti"),
("b957069a-c154-4ef7-ad94-161466b5a855", "TOMATE ITALIANO", "KG", "https://i.postimg.cc/SQD0tjmH/Tomate-Italiano.webp", 4.99, "horti-fruti"),
("e5abee09-a60a-41b3-a5e8-8ec4a8e33f44", "MORANGO", "CAIXINHA", "https://i.postimg.cc/HkB4qJS8/morango.webp", 8.99, "horti-fruti")
;


SELECT* FROM purchases WHERE buyer_id like "436.856.984-22";