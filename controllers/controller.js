const Datastore = require("nedb");
const util = require("../util");

const database = new Datastore("database.db");
database.loadDatabase();

const index = (req, res) => {
    res.status(200).sendFile(util.getPath("views/index.html"));
};

const getList = (req, res) => {
    database.find({}, (err, data) => {
        if (err) {
            res.end();
            return;
        }
        res.json(data);
    });
};

const createToDo = (req, res) => {
    const timestamp = Date.now();
    req.body.timestamp = timestamp;
    
    database.insert(req.body);
    console.log("Request body:", req.body);
};

module.exports = {
    index,
    getList,
    createToDo
}
