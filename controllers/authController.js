const mongoose = require("mongoose");
const User = require("../models/User");
const Note = require("../models/Note");
const bcrypt = require("bcrypt");

// GET /register
exports.showRegister = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/notes");
    }
    res.render("register", {error: null, user: req.user || null});
};

// POST /register
exports.register = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters."
            });
        }

        const existingUser = await User.findOne({email});
        
        if (existingUser) {
            return res.status(400).json({
                message: "That email is already registered."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
            lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase(),
            email: email.toLowerCase().trim(),
            password: hashedPassword
        });

        await newUser.save();

        return res.redirect("/login");

    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong. Please try again.",
            error: err.message
        });
    }
};

// GET /login
exports.showLogin = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/notes");
    }
    res.render("index", {error: null, user: req.user || null});
};

// POST /logout
exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        return res.redirect("/login");
    });
};

// GET /settings
exports.showSettings = (req, res) => {
    res.render("settings", {error: null, user: req.user});
};

// DELETE /settings
exports.deleteAccount = async (req, res) => {
    try {
        const {password} = req.body;

        if (!password) {
            return res.status(400).json({
                message: "Password is required."
            });
        }

        const user = await User.findById(req.user.id);

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({message: "Incorrect password."});
        }

        await Note.deleteMany({user: req.user.id});
        await User.findByIdAndDelete(req.user.id);

        req.logout((err) => {
            if (err) return next(err);
            return res.status(200).json({
                message:"Account deleted successfully."
            });
        });

    } catch (err) {
        return res.status(500).json({
            message: "Error deleting account",
            error: err.message
        });
    }
};