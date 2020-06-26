exports.user = async (req, res, next) => {
    if (req.user) {
        return next();
    }

    return next({
        status: 401,
        message: "Auth required"
    });
};

exports.passUserID = async (req, res, next) => {
    if (req.body.data) {
        req.body.data.user = req.user._id;
    } else {
        req.body.user = req.user._id;
    }

    next();
}