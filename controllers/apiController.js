const Task = require("../models/Task");

module.exports.getTasks = (req, res) => {
    Task.find().sort({ createdAt: 1 })
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
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
