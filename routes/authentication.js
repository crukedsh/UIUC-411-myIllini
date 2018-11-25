let jwt = require('jsonwebtoken');

let authentication = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY.toString(), (err, decoded) => {
            if (err) {
                res.status(401).json({
                    error: err.toString()
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({
            error: "Auth token is not supplied"
        });
    }
};

module.exports = {
    authentication: authentication
}