const express = require("express");
const bodyParser = require("body-parser");
const util = require("./util");

require('dotenv').config();

const routes = require("./routes/routes");

const app = express();
const port = process.env.PORT || "8000";

app.use(express.static("public", { root: __dirname }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
