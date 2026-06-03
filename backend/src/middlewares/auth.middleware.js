const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "unauthorized user"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "you don't have access to do that"
            });
        }

        req.user = decoded;
        next();

    } catch (err) {

        return res.status(401).json({
            message: "unauthorized user"
        });

    }
}

async function authUser(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "unauthorized user"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (
            decoded.role !== "user" &&
    decoded.role !== "artist" 
        ) {
            return res.status(403).json({
                message: "you don't have access to do that"
            });
        }

        req.user = decoded;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "unauthorized user"
        });

    }
}

module.exports = {
    authArtist,
    authUser
};