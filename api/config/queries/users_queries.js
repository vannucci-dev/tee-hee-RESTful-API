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

// GET api/users
const getAllUsers = (req, res) => {
  pool.query("SELECT * FROM users", (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};
// GET api/users/:id
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM users WHERE user_id = $1", [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};
//POST api/users
const addNewUser = (req, res) => {
  const { email, password, first_name, last_name, google_json, facebook_json } =
    req.body;

  pool.query(
    "INSERT INTO users (email, password, first_name, last_name, google_json, facebook_json) VALUES ($1, $2, $3, $4, $5, $6)",
    [email, password, first_name, last_name, google_json, facebook_json],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(201).json();
    }
  );
};
//PUT api/users/:id
const updateUser = (req, res) => {
  const reqId = parseInt(req.params.id);
  const { email, password, first_name, last_name, google_json, facebook_json } =
    req.body;
  pool.query(
    "UPDATE users SET email = $2, password = $3, first_name = $4, last_name = $5, google_json = $6, facebook_json = $7 WHERE user_id = $1",
    [reqId, email, password, first_name, last_name, google_json, facebook_json],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json();
    }
  );
};
//DELETE api/users/:id
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("DELETE FROM users WHERE user_id = $1", [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json();
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  addNewUser,
  updateUser,
  deleteUser,
};
