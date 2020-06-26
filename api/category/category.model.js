const { Schema, model } = require("mongoose");
const { string } = require("../model.shortcuts");

const category = new Schema(
    {
        name: string.required,
        about: string.base,
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        collection: "categories",
        timestamps: true
    }
);

module.exports = model("Category", category);
