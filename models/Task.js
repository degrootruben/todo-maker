const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = Schema({
    taskName: {
        type: String,
        required: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true,
        required: true
    }
}, { timestamps: true });

const Task = mongoose.model("task", taskSchema);

module.exports = Task;