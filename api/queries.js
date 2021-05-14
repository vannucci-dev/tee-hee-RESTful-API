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

const getAllTees = (req, res) => {
  pool.query("SELECT * FROM tees", (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getAllTees,
};
