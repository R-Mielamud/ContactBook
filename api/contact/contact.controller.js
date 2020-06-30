const { alter, register, get, remove, byId, birthdays, share } = require("./contact.service");

exports.register = async (req, res, next) => {
    const result = await register(req.body);
    res.data = result;
    next();
};

exports.alter = async (req, res, next) => {
    const result = await alter(req.user._id, req.body.id, req.body.data);
    res.data = result;
    next();
};

exports.getAll = async (req, res, next) => {
    const result = await get(req.user, req.query, false);
    res.data = result;
    next();
};

exports.getById = async (req, res, next) => {
    const result = await byId(req.params.id);
    res.data = result;
    next();
};

exports.birthdays = async (req, res, next) => {
    const result = await birthdays(req.query.tz || "Europe/Kiev", req.user);
    res.data = result;
    next();
};

exports.getMin = async (req, res, next) => {
    const result = await get(req.user, req.query, true);
    res.data = result;
    next();
};

exports.remove = async (req, res, next) => {
    const result = await remove(req.user._id, req.body.id);
    res.data = result;
    next();
};

exports.share = async (req, res, next) => {
    const result = share(req.app, req.user, req.body.userEmail, req.body.id);
    res.data = result;
    next();
};
