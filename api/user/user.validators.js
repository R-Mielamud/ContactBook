const { Joi, Segments } = require("celebrate");
const { string } = require("../validator.shortcuts");

exports.registerValidator = {
    [Segments.BODY]: Joi.object().keys({
        email: string.email.required(),
        password: string.required.min(6),
        firstName: string.base,
        lastName: string.base,
        photo: string.objectID
    })
};

exports.updateValidator = {
    [Segments.BODY]: Joi.object().keys({
        email: string.email,
        password: string.base.min(6),
        firstName: string.base.allow(""),
        lastName: string.base.allow(""),
        photo: string.objectID.allow("")
    })
};

exports.loginValidator = {
    [Segments.BODY]: Joi.object().keys({
        email: string.email.required(),
        password: string.required
    })
};
