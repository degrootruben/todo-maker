const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const dataJSON = require("./data.json");
const util = require("./util");

require('dotenv').config();

const routes = require("./routes/routes");

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
app.use("/", routes);

// 404
app.use((req, res) => {
    res.status(404).sendFile(util.getPath("views/404.html"));
});
