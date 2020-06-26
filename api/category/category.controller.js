const { register, alter, get, remove } = require("./category.service");

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
    const result = await get(req.user);
    res.data = result;
    next();
};

exports.remove = async (req, res, next) => {
    const result = await remove(req.user._id, req.body.id);
    res.data = result;
    next();
};