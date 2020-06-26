const { Schema, model } = require("mongoose");
const { string } = require("../model.shortcuts");

const image = new Schema(
    {
        url: string.base,
        hash: string.base
    },
    {
        collection: "images",
        timestamps: true
    }
);

module.exports = model("Image", image);
