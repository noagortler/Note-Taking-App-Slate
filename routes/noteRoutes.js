const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

router.get("/", noteController.getAllNotes);
router.get("/:id", noteController.getNoteById);

router.post("/", noteController.createNote);

router.get("/:id/edit", noteController.getEditNote);
router.put("/:id", noteController.updateNote);

router.delete("/:id", noteController.deleteNote);

module.exports = router;