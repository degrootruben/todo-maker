const express = require("express");
const util = require("./util");
const morgan = require("morgan");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");

require('dotenv').config();

const app = express();
const port = process.env.PORT || "8000";

app.use(express.static("public", { root: __dirname }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));

// Routes
app.use("/", routes);

// 404
app.use((req, res) => {
    res.sendFile(util.getPath("views/404.html"));
});

// Open server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
