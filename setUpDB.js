const pool = require("./api/config/dbConfig");

const usersTable = `
  CREATE TABLE users (
    user_id integer PRIMARY KEY,
    email character varying(50) NOT NULL,
    password text NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    table_last_update timestamp with time zone NOT NULL DEFAULT now(),
    username text NOT NULL
);
  `;

const productsTable = `
  CREATE TABLE products (
    product_id integer PRIMARY KEY,
    name character varying(50) NOT NULL,
    price money NOT NULL,
    description character varying(50) NOT NULL,
    image_link text,
    table_last_update timestamp with time zone DEFAULT now()
);
  `;

const ordersTable = `
  CREATE TABLE orders (
    order_id integer PRIMARY KEY,
    total integer NOT NULL,
    status character varying(50) NOT NULL,
    user_id integer NOT NULL REFERENCES users(user_id),
    created timestamp with time zone NOT NULL DEFAULT now(),
    modified timestamp with time zone NOT NULL DEFAULT now(),
    table_last_update timestamp with time zone NOT NULL DEFAULT now()
);
  `;

const orderItemsTable = `
  CREATE TABLE order_items (
    order_items_id integer PRIMARY KEY,
    created date NOT NULL,
    order_id integer NOT NULL REFERENCES orders(order_id),
    quantity integer NOT NULL,
    price money NOT NULL,
    product_id integer NOT NULL REFERENCES products(product_id),
    name character varying(50) NOT NULL,
    description character varying(200) NOT NULL,
    table_last_update timestamp with time zone NOT NULL DEFAULT now()
);
  `;

const cartsTable = `
  CREATE TABLE carts (
    cart_id integer PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(user_id),
    modified timestamp with time zone NOT NULL DEFAULT now(),
    created timestamp with time zone NOT NULL DEFAULT now(),
    table_last_update timestamp with time zone NOT NULL DEFAULT now()
);
  `;

const cartItemsTable = `
  CREATE TABLE cart_items (
    cart_id integer REFERENCES carts(cart_id),
    product_id integer REFERENCES products(product_id),
    quantity integer NOT NULL,
    table_last_update timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT cart_items_pkey PRIMARY KEY (cart_id, product_id)
);
  `;

pool.connect();

// Create tables on database
pool.query(usersTable);
pool.query(productsTable);
pool.query(ordersTable);
pool.query(orderItemsTable);
pool.query(cartsTable);
pool.query(cartItemsTable);

pool.end();
