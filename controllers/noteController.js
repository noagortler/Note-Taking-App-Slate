const mongoose = require("mongoose");
const Note = require("../models/Note");

function formatDate(dateValue) {
    if (!dateValue) return null;
    return new Date(dateValue).toISOString().split("T")[0];
}

// GET /notes

exports.getAllNotes = async (req, res) => {
    try {
        const { category } = req.query;
        const validCategories = ["Notes", "To-Do", "List"];

        const filter = {};

        if (category) {
            if (!validCategories.includes(category)) {
                return res.status(400).json({
                    message: "Invalid category."
                });
            }

            filter.category = category;
        }

        filter.user = req.user.id;
        const notes = await Note.find(filter).sort({ createdAt: -1 });

        const response = {
            notes: notes.map(note => ({
                id: note._id,
                title: note.title,
                content: note.content,
                category: note.category,
                createdAt: formatDate(note.createdAt),
                updatedAt: formatDate(note.updatedAt)
            }))
        };

        return res.render("dashboard", {
            notes: response.notes,
            error: null,
            user: req.user || null,
            category: category || null
        });

    } catch (err) {
        return res.status(500).json({
            message: "Error retrieving notes",
            error: err.message
        });
    }
};

// GET /notes/:id

exports.getNoteById = async (req, res) => {
    try {
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid note ID."
            });
        }

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found."
            });
        }

        const response = {
            id: note._id,
            title: note.title,
            content: note.content,
            category: note.category,
            createdAt: formatDate(note.createdAt),
            updatedAt: formatDate(note.updatedAt)
        };

        return res.render("note", {
            note: response,
            user: req.user || null
        });

    } catch (err) {
        return res.status(500).json({
            message: "Error retrieving note",
            error: err.message
        });
    }
};

// POST /notes

exports.createNote = async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const validCategories = ["Notes", "To-Do", "List"];

        if (!title || !content || !category) {
            return res.status(400).json({
                message: "Title, content and category are required."
            });
        }

        if (title.length > 100) {
            return res.status(400).json({
                message: "Title cannot be longer than 100 characters."
            });
        }

        if (content.length > 10000) {
            return res.status(400).json({
                message: "Content cannot be longer than 10000 characters."
            });
        }

        if (!validCategories.includes(category)) {
            return res.status(400).json({
                message: "Invalid category. Must be one of: Notes, To-Do, List."
            });
        }

        const newNote = new Note({ title, content, category, user: req.user.id });
        const savedNote = await newNote.save();

        return res.redirect("/notes");

    } catch (err) {
        return res.status(400).json({
            message: "Error creating note",
            error: err.message
        });
    }
};

// GET /notes/:id/edit
exports.getEditNote = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid note ID."
            });
        }

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found."
            });
        }

        return res.render("edit", {
            note: {
                id: note._id,
                title: note.title,
                content: note.content,
                category: note.category
            },

            error: null,
            user: req.user || null
        });

    } catch (err) {
        return res.status(500).json({
            message: "Error retrieving note",
            error: err.message
        });
    }
};

// PUT /notes/:id

exports.updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, category } = req.body;
        const validCategories = ["Notes", "To-Do", "List"];

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid note ID."
            });
        }

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required."
            });
        }

        if (title.length > 100) {
            return res.status(400).json({
                message: "Title cannot be longer than 100 characters."
            });
        }

        if (content.length > 10000) {
            return res.status(400).json({
                message:
                    "Content cannot be longer than 10000 characters."
            });
        }

        if (category && !validCategories.includes(category)) {
            return res.status(400).json({
                message: "Invalid category. Must be one of: Notes, To-Do, List."
            });
        }

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found."
            });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to edit this note."
            });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            {title, content, category},
            {new: true, runValidators: true}
        );

        return res.status(200).json({
            message: "Note updated successfully",
            note: {
                id: updatedNote._id,
                title: updatedNote.title,
                content: updatedNote.content,
                category: updatedNote.category,
                updatedAt: formatDate(updatedNote.updatedAt)
            }
        });
        
    } catch (err) {
        return res.status(400).json({
            message: "Error updating note",
            error: err.message
        });
    }
};

// DELETE /notes/:id

exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid note ID."
            });
        }

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found."
            });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to delete this note."
            });
        }

        await Note.findByIdAndDelete(id);

        return res.status(204).send();

    } catch (err) {
        return res.status(500).json({
            message: "Error deleting note",
            error: err.message
        });
    }
};