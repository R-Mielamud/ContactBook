const { register } = require("./image.service");
const { toImgur } = require("./image.helper");

exports.register = async (req, res, next) => {
    const data = await toImgur(req.file);
    res.data = await register(data);
    next();
};
