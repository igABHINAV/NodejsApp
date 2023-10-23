const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(400).json({
            success: false,
            message: "USer Has no access token"
        })
    }
    try {
        const d = jwt.verify(token, process.env.JWT_SECRET);
        req.user = d;
        next();
    } catch (error) {
        res.clearCookie("token");
        return res.status(400).send(error.message);
    }

}