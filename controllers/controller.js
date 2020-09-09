const Task = require('../models/task');
const util = require("../util");

const index = (req, res) => {
    res.status(200).sendFile(util.getPath("views/index.html"));
};

const getData = (req, res) => {
    res.send(dataJSON);
};

const getList = (req, res) => {
    Task.find()
    .then((result) => {
        console.log("'/get-list' result:", result);
        res.send(result);
    })
    .catch ((err) => {
        console.log("Error while searching through database:", err);
    });
};

const createToDo = (req, res) => {
    console.log("Request body:", req.body);

    const task = new Task(req.body);

    task.save()
    .then(() => {
        res.redirect("/");
    })
    .catch((err) => {
        console.log("Error while trying to save to database:", err);
    });
};

function getPath(fileName) {
    return __dirname + "/public/" + fileName;
}

module.exports = {
    index,
    getData,
    getList,
    createToDo
}
