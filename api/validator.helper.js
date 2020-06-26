const { celebrate } = require("celebrate");

exports.validate = schema => {
    return celebrate(schema, {
        allowUnknown: false,
        abortEarly: false,
        stripUnknown: [
            "object"
        ]
    });
}