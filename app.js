const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const bodyParser = require("body-parser");
const Task = require("./models/task");
const dataJSON = require("./data.json");
require('dotenv').config();

const app = express();
const port = process.env.PORT || "8000";
const dbURI = process.env.DB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("Connected to MongoDB-database");
        app.listen(port, () => {
            console.log(`Listening to requests on http://localhost:${port}`);
        });
    })
    .catch((err) => console.log("Error while connecting to MongoDB database", err));

app.use(express.static("public", { root: __dirname }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.status(200).sendFile(getPath("index.html"));
});

app.get("/get-data", (req, res) => {
    res.send(dataJSON);
});

app.get("/get-list", (req, res) => {
    Task.find()
    .then((result) => {
        console.log("'/get-list' result:", result);
        res.send(result);
    })
    .catch ((err) => {
        console.log("Error while searching through database:", err);
    });
});

app.post("/", (req, res) => {
    console.log("Request body:", req.body);

    const task = new Task(req.body);

    task.save()
    .then(() => {
        res.redirect("/");
    })
    .catch((err) => {
        console.log("Error while trying to save to database:", err);
    });
});

app.use((req, res) => {
    res.send("404.html");
});

function getPath(fileName) {
    return __dirname + "/public/" + fileName;
}
