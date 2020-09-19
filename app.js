const express = require("express");
const util = require("./util");
const morgan = require("morgan");
const mainRoutes = require("./routes/mainRoutes");
const apiRoutes = require("./routes/apiRoutes");
const authRoutes = require("./routes/authRoutes");
const { checkUser } = require("./middleware/authMiddleware");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;
const dbURI = process.env.DB_URI;

// Middelware
app.use(express.static("public", { root: __dirname }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

// Open database and server
app.listen(port, () => {
    console.log(`Server is listening to requests on http://localhost:${port}`);
});
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
//     .then((result) => {
//         console.log("Connected to MongoDB-database");
//     }).catch(err => console.log(err));


// Routes
app.get("*", checkUser);
app.use(mainRoutes);
app.use("/api", apiRoutes);
app.use(authRoutes);

// 404
app.use((req, res) => {
    res.sendFile(util.getPath("views/404.html"));
});


