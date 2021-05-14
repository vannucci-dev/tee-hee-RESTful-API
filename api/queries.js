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

// GET api/tees
const getAllTees = (req, res) => {
  pool.query("SELECT * FROM tees", (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};
// GET api/tees/:id
const getSingleTeeById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM tees WHERE id = $1", [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};
//POST api/tees
const createNewTee = (req, res) => {
  const { name, available_sizes, available_colors } = req.body;

  pool.query(
    "INSERT INTO tees (name, available_sizes, available_colors) VALUES ($1, $2, $3)",
    [name, available_sizes, available_colors],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(201).json();
    }
  );
};
//PUT api/tees/:id
const updateTee = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, available_sizes, available_colors } = req.body;
  pool.query(
    "UPDATE tees SET name = $2, available_sizes = $3, available_colors = $4 WHERE id = $1",
    [id, name, available_sizes, available_colors],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json();
    }
  );
};
//DELETE api/tees/:id
const deleteTee = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("DELETE FROM tees WHERE id = $1", [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json();
  });
};

module.exports = {
  getAllTees,
  getSingleTeeById,
  createNewTee,
  updateTee,
  deleteTee,
};
