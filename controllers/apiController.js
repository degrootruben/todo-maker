const Task = require("../models/Task");
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const util = require("../util")

module.exports.getTasks = (req, res) => {
    Task.find().sort({ createdAt: 1 })
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
};

module.exports.getUserID = async (req, res) => {
    const user = await util.getCurrentUser(req, res);
    
    res.json(user._id);
};

module.exports.getUserEmail = async (req, res) => {
    const user = await util.getCurrentUser(req, res);
    
    if (user) {
        const email = user.email;
        res.json(email);
    } else {
        res.json({ error: "User email is not found, this probably means that the user is not logged in. "});
    }
};

module.exports.createTask = (req, res) => {
    const task = new Task(req.body);
    
    task.save()
    .then(() => {
        res.redirect("/tasks");
        console.log("Body of created task:", req.body);
    })
    .catch((err) => {
        console.log(err);
    });
};

module.exports.deleteTask = (req, res) => {
    Task.findByIdAndDelete(req.params.id)
    .then(result => {
        res.end();
    })
    .catch(err => {
        console.log(err);
    });
}
