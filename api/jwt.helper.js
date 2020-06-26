const { sign } = require("jsonwebtoken");
const passport = require("passport");

exports.createToken = data => sign(data, process.env.JWT_KEY, { expiresIn: "24h" });

exports.authenticateJWT = (routesWhiteList = [
    "/user/register",
    "/user/login",
    "/image/register",
    "/user/exists"
]) => (req, res, next) => {
    (routesWhiteList.some(route => route === req.path) || req.method === "OPTIONS")
        ? next()
        : passport.authenticate("jwt", (err, user, info) => {
            if (err || !user) {
                next({
                    status: 400,
                    success: false,
                    message: "Token invalid"
                });
            }

            req.logIn(user, { session: false }, next);
        })(req, res, next);
};
