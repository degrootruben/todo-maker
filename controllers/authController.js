const util = require("../util");

module.exports.login_get = (req, res) => {
    res.status(200).sendFile(util.getPath("views/login.html"));
}

module.exports.login_post = (req, res) => {
    res.send("User is trying to login");
    console.log(req.body.email);
}

module.exports.signup_get = (req, res) => {
    res.status(200).sendFile(util.getPath("views/signup.html"));
}

module.exports.signup_post = (req, res) => {
    res.send("New user signed up");
}