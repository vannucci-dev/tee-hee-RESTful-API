const { Client } = require("pg");

(async () => {
  const usersTable = `
  CREATE TABLE IF NOT EXISTS users (
    user_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    email character varying(50) NOT NULL,
    password text NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    table_last_update timestamp with time zone NOT NULL DEFAULT now(),
    username text NOT NULL
);
  `;

  const productsTable = `
  CREATE TABLE IF NOT EXISTS products (
    product_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    name character varying(50) NOT NULL,
    price money NOT NULL,
    description character varying(50) NOT NULL,
    image_link text,
    table_last_update timestamp with time zone DEFAULT now()
);
  `;

  const ordersTable = `
  CREATE TABLE IF NOT EXISTS orders (
    order_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    total integer NOT NULL,
    status character varying(50) NOT NULL,
    user_id integer NOT NULL REFERENCES users(user_id),
    created timestamp with time zone NOT NULL DEFAULT now(),
    modified timestamp with time zone NOT NULL DEFAULT now(),
    table_last_update timestamp with time zone NOT NULL DEFAULT now()
);
  `;

  const orderItemsTable = `
  CREATE TABLE IF NOT EXISTS order_items (
    order_items_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
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
  CREATE TABLE IF NOT EXISTS carts (
    cart_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    user_id integer NOT NULL REFERENCES users(user_id),
    modified timestamp with time zone NOT NULL DEFAULT now(),
    created timestamp with time zone NOT NULL DEFAULT now(),
    table_last_update timestamp with time zone NOT NULL DEFAULT now()
);
  `;

  const cartItemsTable = `
  CREATE TABLE IF NOT EXISTS cart_items (
    cart_id integer REFERENCES carts(cart_id),
    product_id integer REFERENCES products(product_id),
    quantity integer NOT NULL,
    table_last_update timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT cart_items_pkey PRIMARY KEY (cart_id, product_id)
);
  `;

  const functionTimeStampModified = `
  CREATE OR REPLACE FUNCTION trigger_set_timestamp()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.modified = NOW();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
  `;

  const functionTimeStampLastUpdate = `
  CREATE OR REPLACE FUNCTION trigger_set_timestamp_update_table()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.table_last_update = NOW();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
  `;

  const trigger_update_user = `
  CREATE TRIGGER set_timestamp_update_table
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp_update_table();
  `;
  const trigger_update_products = `
  CREATE TRIGGER set_timestamp_update_table
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp_update_table();
  `;
  const trigger_update_carts = `
  CREATE TRIGGER set_timestamp_update_table
  BEFORE UPDATE ON carts
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp_update_table();
  `;
  const trigger_update_cart_items = `
  CREATE TRIGGER set_timestamp_update_table
  BEFORE UPDATE ON cart_items
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp_update_table();
  `;
  const trigger_update_orders = `
  CREATE TRIGGER set_timestamp_update_table
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp_update_table();
  `;
  const trigger_update_order_items = `
  CREATE TRIGGER set_timestamp_update_table
  BEFORE UPDATE ON order_items
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp_update_table();
  `;

  const trigger_update_carts_modified = `
  CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON carts
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp();
  `;

  const trigger_update_orders_modified = `
  CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp();
  `;

  try {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    await client.connect();

    // Create tables on database
    await client.query(usersTable);
    await client.query(productsTable);
    await client.query(ordersTable);
    await client.query(orderItemsTable);
    await client.query(cartsTable);
    await client.query(cartItemsTable);
    await client.query(functionTimeStampLastUpdate);
    await client.query(functionTimeStampModified);
    await client.query(trigger_update_user);
    await client.query(trigger_update_products);
    await client.query(trigger_update_order_items);
    await client.query(trigger_update_orders);
    await client.query(trigger_update_carts);
    await client.query(trigger_update_cart_items);
    await client.query(trigger_update_carts_modified);
    await client.query(trigger_update_orders_modified);

    await client.end();
  } catch (err) {
    console.log("ERROR CREATING ONE OR MORE TABLES: ", err);
  }
})();
