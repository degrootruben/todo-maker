const express = require('express');
const util = require("../util");

module.exports.index = (req, res) => {
    res.status(200).sendFile(util.getPath("views/index.html"));
}

module.exports.tasks = (req, res) => {
    res.status(200).sendFile(util.getPath("views/tasks.html"));
}
