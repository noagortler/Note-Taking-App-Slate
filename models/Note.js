const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },

    content: {
        type: String,
        required: true,
        trim: true,
        maxLength: 10000
    },

    category: {
        type: String,
        required: true,
        enum: ["Notes", "To-Do", "List"]
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

}, {timestamps: true});

module.exports = mongoose.model("Note", noteSchema);