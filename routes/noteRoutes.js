const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const {ensureAuthenticated} = require("../middleware/authMiddleware");

router.get("/", ensureAuthenticated, noteController.getAllNotes);
router.get("/:id", ensureAuthenticated, noteController.getNoteById);

router.post("/", ensureAuthenticated, noteController.createNote);

router.get("/:id/edit", ensureAuthenticated, noteController.getEditNote);
router.put("/:id", ensureAuthenticated, noteController.updateNote);

router.delete("/:id", ensureAuthenticated, noteController.deleteNote);

module.exports = router;