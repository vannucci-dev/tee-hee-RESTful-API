const pool = require("../dbConfig");

// GET api/carts
const getAllCarts = (req, res) => {
  pool.query("SELECT * FROM carts", (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};
// GET api/carts/:id
const getCartById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM carts WHERE cart_id = $1", [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};
//POST api/carts
const addNewCart = (req, res) => {
  const { user_id } = req.body;

  pool.query(
    "INSERT INTO carts (user_id) VALUES ($1)",
    [user_id],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(201).json(req.body);
    }
  );
};
//DELETE api/carts/:id
const deleteCart = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("DELETE FROM carts WHERE cart_id = $1", [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send("Deletion confirmed.");
  });
};

module.exports = {
  getAllCarts,
  getCartById,
  addNewCart,
  deleteCart,
};
