const express = require("express");
const util = require("./util");
const morgan = require("morgan");
const routes = require("./routes/routes");
const authRoutes = require("./routes/authRoutes");
const { checkUser } = require("./middleware/authMiddleware");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

require('dotenv').config();

const app = express();
const port = process.env.PORT || "8000";
const dbURI = process.env.DB_URI;

// Middelware
app.use(express.static("public", { root: __dirname }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

// Open database and server
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
    .then((result) => {
        console.log("Connected to MongoDB-database");
        app.listen(port, () => {
            console.log(`Server is listening to requests on http://localhost:${port}`);
        })
    }).catch(err => console.log(err));


// Routes
app.get("*", checkUser);
app.use(routes);
app.use(authRoutes);

// 404
app.use((req, res) => {
    res.sendFile(util.getPath("views/404.html"));
});


