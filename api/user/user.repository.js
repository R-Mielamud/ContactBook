const User = require("./user.model");
const { hashSync } = require("bcryptjs");

exports.add = async (data) => {
    const checkingResult = await User.find({ email: data.email }).lean().exec();
    
    if (checkingResult.length > 0) {
        throw {
            status: 400,
            message: "This email is already taken"
        }
    }

    const user = new User(data);
    await user.save();

    await User.populate(user, {
        path: "photo",
        select: "url"
    });

    return user;
};

exports.update = async (id, data) => {
    data.password = hashSync(data.password, 8);
    data.photo = data.photo || process.env.DEFAULT_PHOTO;

    const user = await User.findById(id);

    if (user.email !== data.email) {
        const checkingResult = await User.find({ email: data.email }).lean().exec();
    
        if (checkingResult.length > 0) {
            throw {
                status: 400,
                message: "This email is already taken"
            }
        }
    }

    await user.update(data);

    await User.populate(user, {
        path: "photo",
        select: "url"
    });

    return user;
}

exports.getByEmail = async email => {
    const user = await User.findOne({ email });

    await User.populate(user, {
        path: "photo",
        select: "url"
    });

    return user;
};
