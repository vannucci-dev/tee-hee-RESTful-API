const pool = require("../dbConfig");

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
    "UPDATE products SET name = $2, price = $3, description = $4, image_link = $5 WHERE id = $1",
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
