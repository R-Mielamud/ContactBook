exports.reqDotPassword = (req, res, next) => {
    req.password = req.body.password;
    next();
};

exports.auth = (req, res, next) => {
    if (req.user) {
        return next();
    }

    next({ status: 403, message: "Auth required" });
};

exports.setPasswordToReqBody = (req, res, next) => {
    req.body.password = req.password;
    next();
};

exports.throwOnFail = (req, res, next) => {
    if (res.data.message) {
        return next(res.data);
    }

    next();
};
