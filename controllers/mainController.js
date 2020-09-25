const util = require("../util");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports.index = (req, res) => {
    const token = req.cookies.JWT;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message());
            } else {
                User.countDocuments({ _id: decodedToken.id }, (err, count) => {
                    if(count > 0) {
                        res.redirect("/tasks");
                    } else {
                        res.status(200).sendFile(util.getPath("views/index.html"));
                    }
                }); 
            }
        });
    } else {
        res.status(200).sendFile(util.getPath("views/index.html"));
    }
}

module.exports.tasks = (req, res) => {
    const token = req.cookies.JWT;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message());
            } else {
                User.countDocuments({ _id: decodedToken.id }, (err, count) => {
                    if(count > 0) {
                        res.status(200).sendFile(util.getPath("views/tasks.html"));
                    } else {
                        res.redirect("/login");
                    }
                }); 
            }
        });
    } else {
        res.redirect("/login");
    }
}
