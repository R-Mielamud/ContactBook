const { Segments, Joi } = require("celebrate");
const { string } = require("../validator.shortcuts");

exports.registerValidator = {
    [Segments.BODY]: Joi.object().keys({
        name: string.required,
        about: string.base
    })
};

exports.updateValidator = {
    [Segments.BODY]: Joi.object().keys({
        id: string.objectID.required(),
        data: Joi.object().keys({
            name: string.base.allow(""),
            about: string.base.allow("")
        })
    })
};

exports.deleteValidator = {
    [Segments.BODY]: Joi.object().keys({
        id: string.objectID.required()
    })
};