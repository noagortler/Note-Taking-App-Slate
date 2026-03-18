require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


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