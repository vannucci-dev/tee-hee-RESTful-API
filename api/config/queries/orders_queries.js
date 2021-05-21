const pool = require("../dbConfig");

// GET api/order
const getAllOrders = (req, res) => {
  pool.query("SELECT * FROM orders", (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};
// GET api/order/:id
const getOrderById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(
    "SELECT * FROM orders WHERE order_id = $1",
    [id],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results.rows);
    }
  );
};
//POST api/order
const addNewOrder = (req, res) => {
  const { total, status, user_id } = req.body;

  pool.query(
    "INSERT INTO orders (total, status, user_id) VALUES ($1, $2, $3)",
    [total, status, user_id],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(201).json(req.body);
    }
  );
};
//PUT api/order
const updateOrder = (req, res) => {
  const reqId = parseInt(req.params.id);
  const { total, status, user_id } = req.body;
  pool.query(
    "UPDATE orders SET total = $2, status = $3, user_id = $4 WHERE order_id = $1",
    [reqId, total, status, user_id],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(req.body);
    }
  );
};
//DELETE api/order/:id
const deleteOrder = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("DELETE FROM orders WHERE order_id = $1", [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send("Deletion confirmed");
  });
};

module.exports = {
  getAllOrders,
  updateOrder,
  getOrderById,
  addNewOrder,
  deleteOrder,
};
