const Datastore = require("nedb");
const util = require("../util");

const database = new Datastore("database.db");
database.loadDatabase();

const index = (req, res) => {
    res.status(200).sendFile(util.getPath("views/index.html"));
};

const tasks = (req, res) => {
    res.status(200).sendFile(util.getPath("views/tasks.html"));
};

const getTasks = (req, res) => {
    database.find({}).sort({ time: 1 }).exec((err, data) => {
        if (err) {
            console.log("Error while fetching tasks from database");
            res.end();
            return;
        }
        res.json(data);
    });      
};

const createTask = (req, res) => {
    console.log("Body of created task:", req.body);
    database.insert(req.body);
    res.end();
};

const deleteTask = (req, res) => {
    database.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
        if (err) {
            console.log("Error while deleting task from database");
        }
    });
    res.end();
}

module.exports = {
    index,
    tasks,
    getTasks,
    createTask,
    deleteTask
}
