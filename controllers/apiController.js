const Task = require("../models/Task");
const jwt = require("jsonwebtoken");
const User = require('../models/User');

module.exports.getTasks = (req, res) => {
    Task.find().sort({ createdAt: 1 })
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
};

module.exports.getUserID = (req, res) => {
    const token = req.cookies.JWT;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message());
                res.json({ error: "Error while trying to verify user" });
            } else {
                console.log(decodedToken);
                const user = await User.findById(decodedToken.id);
                res.json(user._id);
            }
        });
    } else {
        res.json({ error: "User is not logged in" });
    }
};

module.exports.getUserEmail = (req, res) => {
    const email = req.cookies.EMAIL;

    if (email) {
        res.json({ email });
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
