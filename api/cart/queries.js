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

  pool.query("SELECT * FROM carts WHERE id = $1", [id], (err, results) => {
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
    "INSERT INTO carts (user_id, created, modified) VALUES ($1, now(), now())",
    [user_id],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(201).json();
    }
  );
};
//PUT api/carts/:id
const updateCart = (req, res) => {
  const reqId = parseInt(req.params.id);
  const { user_id } = req.body;
  pool.query(
    "UPDATE carts SET user_id = $2, modified = now() WHERE id = $1",
    [reqId, user_id],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json();
    }
  );
};
//DELETE api/carts/:id
const deleteCart = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("DELETE FROM carts WHERE id = $1", [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json();
  });
};

module.exports = {
  getAllCarts,
  getCartById,
  addNewCart,
  updateCart,
  deleteCart,
};
