const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization?.split(" ")[1]; 
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Access Denied! No token provided",
            });
        }

        const decoded = jwt.verify(token, process.env.jwt_secret);
        req.body.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).send({
            success: false,
            message: "Invalid token",
        });
    }
};
