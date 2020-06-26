const Category = require("./category.model");
const Contact = require("../contact/contact.model");

exports.all = async (user) => {
    const result = await Category.find({
        $or: [
            { user: { $exists: false } },
            { user: user._id }
        ]
    }).lean().exec();

    for (const cat of result) {
        const count = await Contact.find({ category: cat._id, user: user._id })
            .countDocuments()
            .lean()
            .exec();

        cat.contactsCount = count;
    }
    
    return result;
};

exports.add = async (data) => {
    const category = new Category(data);
    await category.save();
    return category;
};

exports.update = async (userID, _id, data) => {
    const check = await Category.findById(_id);

    if (!(check && check.user && String(check.user._id) === String(userID))) {
        throw {
            message: "Not author of category"
        }
    }

    const result = await Category.updateOne({ _id }, data).exec();
    return result;
};

exports.remove = async (userID, _id) => {
    const check = await Category.findById(_id);

    if (!(check && check.user && String(check.user._id) === String(userID))) {
        throw {
            message: "Not author of category"
        }
    }

    const result = await Category.deleteOne({ _id }).exec();
    return result;
};