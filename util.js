const jwt = require("jsonwebtoken");
const User = require('./models/User');

module.exports.getPath = (fileName) => {
    return __dirname + "/public/" + fileName;
}

module.exports.getCurrentUser = async (req, res) => {
    const token = req.cookies.JWT;

    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decodedToken.id);
            return user;
        } catch (err) {
            console.log(err);
            return null;
        }
    } else {
        return null;
    }
}