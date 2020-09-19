const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    }
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;