const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// GET /register
exports.showRegister = (req, res) => {
    res.send("register page");
};

// POST /register
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        if (username.length < 3) {
            return res.status(400).json({
                message: "Username must be at least 3 characters."
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters."
            });
        }

        const existingUser = await User.findOne({username});

        if (existingUser) {
            return res.status(400).json({
                message: "That username is already taken."
            });
        }

        const existingEmail = await User.findOne({email});

        if (existingEmail) {
            return res.status(400).json({
                message: "That email is already registered."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username, email, password: hashedPassword
        });

        await newUser.save();

        return res.redirect("/login");

    } catch (err) {
        return res.status(500).json({
            message: "Error registering user", error: err.message
        });
    }
};

// GET /login
exports.showLogin = (req, res) => {
    res.render("index",  {error: null, user: null});
};

// POST /login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const user = await User.findOne({username});

        if (!user) {
            return res.status(400).json({
                message: "Invalid username or password."
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({
                message: "Invalid username or password."
            });
        }

        return res.redirect("/notes");

    } catch (err) {
        return res.status(500).json({
            message: "Error logging in", error: err.message
        });
    }
};

// POST /logout
exports.logout = (req, res) => {
    return res.redirect("/login");
};