const Datastore = require("nedb");

const database = new Datastore("database.db");
database.loadDatabase();

module.exports.getTasks = (req, res) => {
    database.find({}).sort({ time: 1 }).exec((err, data) => {
        if (err) {
            console.log("Error while fetching tasks from database");
            res.end();
            return;
        }
        res.json(data);
    });      
};

module.exports.createTask = (req, res) => {
    console.log("Body of created task:", req.body);
    database.insert(req.body);
    res.end();
};

module.exports.deleteTask = (req, res) => {
    database.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
        if (err) {
            console.log("Error while deleting task from database");
        }
    });
    res.end();
}
