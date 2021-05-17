const Pool = require("pg").Pool;

//configuration details in production would be kept in a separate file
//with restrictive permissions that is not accessible from version control
//configuration here is for demo purpose

const pool = new Pool({
  user: "api_user",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
});

// GET api/products
const getAllProducts = (req, res) => {
  pool.query("SELECT * FROM products", (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};
// GET api/products/:id
const getProductById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM products WHERE id = $1", [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};
//POST api/products
const addNewProduct = (req, res) => {
  const { name, price, description, image_link } = req.body;

  pool.query(
    "INSERT INTO products (name, price, description, image_link) VALUES ($1, $2, $3, $4)",
    [name, price, description, image_link],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(201).json();
    }
  );
};
//PUT api/products/:id
const updateProduct = (req, res) => {
  const reqId = parseInt(req.params.id);
  const { name, price, description, image_link } = req.body;
  pool.query(
    "UPDATE products SET name = $2, available_sizes = $3, available_colors = $4 WHERE id = $1",
    [reqId, name, price, description, image_link],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json();
    }
  );
};
//DELETE api/products/:id
const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("DELETE FROM products WHERE id = $1", [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json();
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
