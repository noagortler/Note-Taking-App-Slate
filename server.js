require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./config/passport");

const app = express();
const PORT = 3000;


// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.use(express.static("assets"));

// session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false
        }
    })
);


// passport
app.use(passport.initialize());
app.use(passport.session());


// auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/", authRoutes);


// note routes
const noteRoutes = require("./routes/noteRoutes");
app.use("/notes", noteRoutes);


// connect to MongoDB then start the server
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Slate is running on http://localhost:${PORT}`);
    });
  })

  .catch((err) => {
    console.log("MongoDB connection error", err);
  });