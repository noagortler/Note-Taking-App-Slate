const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");

router.get("/register", authController.showRegister);
router.post("/register", authController.register);

router.get("/login", authController.showLogin);
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);

        if (!user) {
            return res.status(401).json({
                message: info?.message || "Login failed"
            });
        }

        req.logIn(user, (loginErr) => {
            if (loginErr) return next(loginErr);
            
            return res.redirect("/notes");
        });
    })(req, res, next);
});

router.post("/logout", authController.logout);

module.exports = router;