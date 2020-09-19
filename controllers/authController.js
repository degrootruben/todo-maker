const util = require("../util");
const User = require("../models/User");

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", password: "" };
  
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
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}