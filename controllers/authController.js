const util = require("../util");
const User = require("../models/User");

module.exports.login_get = (req, res) => {
    res.status(200).sendFile(util.getPath("views/login.html"));
}

module.exports.login_post = async (req, res) => {
    res.send("User is trying to login");
    console.log(req.body);
}

module.exports.signup_get = (req, res) => {
    res.status(200).sendFile(util.getPath("views/signup.html"));
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        res.status(201).json(user);
    } 
    catch (err) {
        console.log(err);
        res.status(400).send("Error while signing up");
    }
}