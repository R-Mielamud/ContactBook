const { Schema, model } = require("mongoose");
const { string } = require("../model.shortcuts");

const contact = new Schema(
    {
        firstName: string.base,
        lastName: string.base,
        mainTelephone: string.telephoneReq,
        mainEmail: string.base,
        emails: [string.base],
        telephones: [string.telephone],
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        who: string.base,
        about: string.base,
        birthDate: {
            type: Date
        },
        messangers: {
            telegram: string.base,
            viber: string.base,
            whatsapp: string.base,
            facebook: string.base,
            twitter: string.base,
            instagram: string.base
        },
        favorite: {
            type: Boolean,
            default: false
        },
        photo: {
            type: Schema.Types.ObjectId,
            ref: "Image",
            default: process.env.DEFAULT_PHOTO
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        collection: "contacts",
        timestamps: true
    }
);

module.exports = model("Contact", contact);
