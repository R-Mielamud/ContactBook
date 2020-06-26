const Image = require("./image.model");

exports.add = async data => {
    const image = new Image(data);
    await image.save();
    return image;
};
