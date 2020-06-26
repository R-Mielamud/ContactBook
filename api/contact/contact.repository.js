const Contact = require("./contact.model");
const moment = require("moment");

exports.add = async (data) => {
    const contact = new Contact(data);
    await contact.save();

    await Contact.populate(contact, [
        {
            path: "category",
            select: "name about"
        },
        {
            path: "photo",
            select: "hash url"
        }
    ]);

    return contact;
};

exports.byId = async id => {
    const contact = await Contact
        .findById(id)
        .populate("category", "name about")
        .populate("photo", "url hash")
        .lean()
        .exec();

    return contact;
};

exports.birthdays = async user => {
    let contacts = await Contact.find({ user: user._id }).select("firstName lastName mainTelephone birthDate").lean().exec();

    const __date_fmt__ = date => {
        if (date >= 10) return date;
        else return "0" + String(date);
    };

    contacts = contacts.filter(cont => {
        const birth = moment(`${__date_fmt__(cont.birthDate.getMonth())}${__date_fmt__(cont.birthDate.getDate())}`, "MMDD");
        const before = moment().isBefore(birth);
        const after = moment().add(30, "days").isAfter(birth);

        if (before && after) {
            cont.birthdayStr = moment(birth).fromNow();
        }

        return before && after;
    });

    return contacts;
};

exports.all = async (user, filter, min = false) => {
    const firstNameF = filter.firstName ? { firstName: { $regex: new RegExp(".*" + filter.firstName + ".*", "i") } } : {};
    const lastNameF = filter.lastName ? { lastName: { $regex: new RegExp(".*" + filter.lastName + ".*", "i") } } : {};
    const mainEmailF = filter.mainEmail ? { mainEmail: { $regex: new RegExp(".*" + filter.mainEmail + ".*", "i") } } : {};

    const contacts = await Contact
        .find({
            user: user._id,
            ...firstNameF,
            ...lastNameF,
            ...mainEmailF
        })
        .sort("-createdAt")
        .populate("category", "name about")
        .populate("photo", "url hash")
        .select(min ? "firstName lastName photo category who favorite user createdAt updatedAt birthDate" : "")
        .lean()
        .exec();

    contacts.sort((c1, c2) => c1.favorite ? -1 : 1);

    if (filter.category) {
        contacts = contacts.filter(c => (new RegExp(".*" + filter.category + ".*", "i")).test(c.category.name));
    }
    
    return contacts;
};

exports.update = async (userID, _id, data) => {
    const check = await Contact.findById(_id);

    if (!(check && String(userID) === String(check.user))) {
        throw {
            message: "Not author of contact"
        }
    }

    if (data.photo === "") {
        data.photo = process.env.DEFAULT_PHOTO;
    }

    const contact = await Contact.updateOne({ _id }, data).exec();

    await Contact.populate(contact, [
        {
            path: "category",
            select: "name about"
        },
        {
            path: "photo",
            select: "hash url"
        }
    ]);

    return contact;
};

exports.remove = async (userID, _id) => {
    const check = await Contact.findById(_id);

    if (!(check && String(userID) === String(check.user))) {
        throw {
            message: "Not author of contact"
        }
    }

    await Contact.deleteOne({ _id }).exec();

    return {
        state: "deleted"
    };
};
