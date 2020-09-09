const Datastore = require("nedb");
const util = require("../util");

const database = new Datastore("database.db");
database.loadDatabase();

const index = (req, res) => {
    res.status(200).sendFile(util.getPath("views/index.html"));
};

const getTasks = (req, res) => {
    database.find({}, (err, data) => {
        if (err) {
            res.end();
            return;
        }
        res.json(data);
    });
};

const createTask = (req, res) => {
    const timestamp = Date.now();
    req.body.timestamp = timestamp;
    
    database.insert(req.body);
    console.log("Request body:", req.body);
    res.redirect("/");
};

const deleteTask = (req, res) => {
    database.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
        if (err) {
            console.log("Error while deleting entry from database");
        }
    });
    res.redirect("/");
}

module.exports = {
    index,
    getTasks,
    createTask,
    deleteTask
}
