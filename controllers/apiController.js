const Task = require("../models/Task");
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const util = require("../util");
const { ObjectId } = require("mongoose");

module.exports.getTasks = async (req, res) => {
    const user = await util.getCurrentUser(req, res);
    const userID = new ObjectId(user._id);

    if (user) {
        Task.find({ userID: userID.path }).sort({ createdAt: 1 })
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            console.log(err);
        });
    } else {
        res.json({ error: "No user is logged in" });
    }
};

module.exports.getUserID = async (req, res) => {
    const user = await util.getCurrentUser(req, res);

    if (user) {
        res.json(user._id);
    } else {
        res.json({ error: "No user is logged in" });
    }
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

module.exports.createTask = async (req, res) => {
    const user = await util.getCurrentUser(req, res);

    if (user) {
        const task = new Task(req.body);
    
        task.save()
        .then(() => {
            res.redirect("/tasks");
            console.log("Body of created task:", req.body);
        })
        .catch((err) => {
            console.log(err);
        });
    } else {
        res.json({ error: "No user is logged in" });
    }
    
};

module.exports.deleteTask = async (req, res) => {
    const user = await util.getCurrentUser(req, res);

    if (user) {
        Task.findByIdAndDelete(req.params.id)
        .then(result => {
            console.log("Id of deleted task", { id: req.params.id });
            res.end();
        })
        .catch(err => {
            console.log(err);
        });
    } else {
        res.json({ error: "No user is logged in" });
    }
}
