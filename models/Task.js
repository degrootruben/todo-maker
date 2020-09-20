const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    id: {
        type: String, 
        required: true
    }
}, { timestamps: true });

const Task = mongoose.model("task", taskSchema);

module.exports = Task;