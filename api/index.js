const express = require("express");
const products = require("./routes/products");
const users = require("./routes/users");
const carts = require("./routes/cart");
const bcrypt = require("bcrypt");
const pool = require("./config/dbConfig");
require("dotenv").config();
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");

const initializePassport = require("./config/passportConfig");

initializePassport(passport);

const api = express.Router();
api.use(express.urlencoded({ extended: false }));
api.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

api.use(passport.initialize());
api.use(passport.session());
api.use(flash());

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/api/dashboard");
  }
  next();
};

const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
  res.redirect("/api/login");
};

api.get("/", (req, res) => {
  res.render("home");
});
api.get("/login", checkAuthenticated, (req, res) => {
  res.render("login");
});
api.get("/signup", checkAuthenticated, (req, res) => {
  res.render("signup");
});
api.get("/dashboard", checkNotAuthenticated, (req, res) => {
  res.render("dashboard", { user: req.user.first_name });
});

api.post("/signup", async (req, res) => {
  const { email, first_name, last_name, username, password, password2 } =
    req.body;

  let errors = [];

  if (
    !email ||
    !first_name ||
    !last_name ||
    !username ||
    !password ||
    !password2
  ) {
    errors.push({ message: "All fields need to be filled." });
  }

  if (password.length < 6) {
    errors.push({ message: "Password needs to be 6 characters or more." });
  }

  if (password !== password2) {
    errors.push({
      message: "The two passwords do not match. Please try again.",
    });
  }

  if (errors.length > 0) {
    res.render("signup", { errors });
  } else {
    //Form validation passed

    let hashedPassword = await bcrypt.hash(password, 10);

    pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        if (results.rows.length > 0) {
          errors.push({
            message:
              "The email has already been used. Please login or use a different email.",
          });
          res.render("signup", { errors });
        } else {
          pool.query(
            "INSERT INTO users (email, password, first_name, last_name, username) VALUES ($1, $2, $3, $4, $5);",
            [email, hashedPassword, first_name, last_name, username],
            (err, results) => {
              if (err) {
                throw err;
              }
              req.flash(
                "success_msg",
                "You are now registered. Please login to continue."
              );
              res.redirect("/api/login");
            }
          );
        }
      }
    );
  }
});

api.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/api/dashboard",
    failureRedirect: "/api/login",
    failureFlash: true,
  })
);

api.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success_msg", "You have been succesfuly logged out.");
  res.redirect("/api/login");
});

api.use("/products", products);
api.use("/users", users);
api.use("/cart", carts);

module.exports = api;
