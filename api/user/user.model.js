const { Schema, model } = require("mongoose");
const { string } = require("../model.shortcuts");
const { hashSync } = require("bcryptjs");

const User = new Schema(
    {
        email: {
            ...string.required,
            unique: true
        },
        password: string.required,
        firstName: string.base,
        lastName: string.base,
        photo: {
            type: Schema.Types.ObjectId,
            ref: "Image",
            default: process.env.DEFAULT_PHOTO
        }
    },
    {
        collection: "users",
        timestamps: true
    }
);

User.pre("save", function (next) {
    if (this.isNew || this.isModified("password")) {
        this.password = hashSync(this.password, 8);
    }

    next();
});

module.exports = model("User", User);
