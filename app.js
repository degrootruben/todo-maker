const express = require("express");
const util = require("./util");
const morgan = require("morgan");
const routes = require("./routes/routes");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");

require('dotenv').config();

const app = express();
const port = process.env.PORT || "8000";
const dbURI = process.env.DB_URI;
// Open database and server
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
    .then((result) => {
        console.log("Connected to MongoDB-database");
        app.listen(port, () => {
            console.log(`Server is listening to requests on http://localhost:${port}`);
        })
    }).catch(err => console.log(err));

app.use(express.static("public", { root: __dirname }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

// Routes
app.use(routes);
app.use(authRoutes);

// 404
app.use((req, res) => {
    res.sendFile(util.getPath("views/404.html"));
});


