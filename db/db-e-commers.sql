CREATE TABLE IF NOT EXISTS users (
    id          INTEGER PRIMARY KEY NOT NULL,
    first_name  VARCHAR(50),
    last_name   VARCHAR(50),
    email       VARCHAR(100) NOT NULL,
    password    VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    id          INTEGER PRIMARY KEY NOT NULL,
    name        VARCHAR(100) NOT NULL,
    description TEXT,
    stock       INTEGER NOT NULL,
    price       BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
    id          INTEGER PRIMARY KEY NOT NULL,
    total       BIGINT NOT NULL,
    status      VARCHAR(50) NOT NULL,
    created     DATE,
    user_id     INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS order_item (
    id          INTEGER PRIMARY KEY NOT NULL,
    quantity    INTEGER NOT NULL,
    orders_id   INTEGER NOT NULL,
    product_id  INTEGER NOT NULL,
    FOREIGN KEY (orders_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS cart (
    id          INTEGER PRIMARY KEY NOT NULL,
    total       BIGINT NOT NULL,
    created     DATE,
    user_id     INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS cart_item (
    id          INTEGER PRIMARY KEY NOT NULL,
    quantity    INTEGER NOT NULL,
    cart_id     INTEGER NOT NULL,
    product_id  INTEGER NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES cart(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE USER 