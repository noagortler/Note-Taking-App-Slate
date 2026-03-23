const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");

router.get("/register", authController.showRegister);
router.post("/register", authController.register);

router.get("/login", authController.showLogin);
router.post("/login", (req, res, next) => {
    if (req.body.email) {
        req.body.email = req.body.email.toLowerCase().trim();
    }
    
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);

        if (!user) {
            return res.render("index", {
                error: info?.message || "Invalid email or password.",
                user: null
            });
        }

        req.logIn(user, (loginErr) => {
            if (loginErr) return next(loginErr);
            
            return res.redirect("/notes");
        });
    })(req, res, next);
});

router.post("/logout", authController.logout);

router.get("/settings", authController.showSettings);
router.delete("/settings", authController.deleteAccount);

module.exports = router;