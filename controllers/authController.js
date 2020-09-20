const util = require("../util");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", password: "" };
  
    // Incorrect email
    if (err.message === "Incorrect email") {
        errors.email = err.message;
    }

    // Incorrect password
    if (err.message === "Incorrect password") {
        errors.password = err.message;
    }

    // Duplicate email error
    if (err.code === 11000) {
      errors.email = "That email is already registered";
      return errors;
    }
  
    // Validation errors
    if (err.message.includes("user validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
}

const maxAgeOfJWT = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAgeOfJWT
    });
};

module.exports.login_get = (req, res) => {
    res.status(200).sendFile(util.getPath("views/login.html"));
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("JWT", token, { httpOnly: true, maxAge: maxAgeOfJWT * 1000 });
        res.cookie("EMAIL", email, { httpOnly: true, maxAge: maxAgeOfJWT * 1000 });
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.signup_get = (req, res) => {
    res.status(200).sendFile(util.getPath("views/signup.html"));
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie("JWT", token, { httpOnly: true, maxAge: maxAgeOfJWT * 1000 });
        res.status(201).json({ user: user._id });
    } 
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie("JWT", "", { maxAge: 1 });
    res.redirect("/");
}