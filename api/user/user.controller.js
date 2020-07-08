const { register, profile, update } = require("./user.service");
const passport = require("passport");
const { __getErrorFormatted } = require("../error.helper");
const { createToken } = require("../jwt.helper");

exports.register = async (req, res, next) => {
    res.data = await register(req.body);
    next();
};

exports.update = async (req, res, next) => {
    res.data = await update(req.user._id, req.body);
    return next();
};

exports.logout = async (req, res, next) => {
    req.logOut();

    res.data = {
        user: null
    };

    next();
};

exports.profile = async (req, res, next) => {
    res.data = await profile(req.query.email);
    next();
};

exports.login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err || !user) {
            return res.status(err ? 401 : 200).json({
                ...(err ? { message: err.message || err } : {}),
                user: null
            });
        }

        req.logIn(user, err => {
            if (err) {
                res.status(err ? 401 : 200).json({
                    user: null,
                    message: __getErrorFormatted(err).message
                });
            }
        });

        return res.json({ user, token: createToken({ id: user._id.valueOf() }) });
    })(req, res, next)
};
