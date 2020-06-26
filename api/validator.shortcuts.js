const { Joi } = require("celebrate");

exports.string = {
    base: Joi.string().trim(true),
    required: Joi.string().trim(true).required(),
    email: Joi.string().trim(true).email(),
    objectID: Joi.string().trim(true).regex(/^[0-9a0-fA-F]{24}$/)
}

exports.object = {
    telephone: Joi.object().keys({
        code: Joi.string().trim(true).regex(/^\+[0-9]{1,3}$/).required(),
        value: Joi.string().trim(true).regex(/^[0-9]{9}$/).required()
    }),
    emptyTelephone: Joi.object().keys({
        code: Joi.string().trim(true).regex(/^\+[0-9]{1,3}$/).required().allow(""),
        value: Joi.string().trim(true).regex(/^[0-9]{9}$/).required().allow("")
    }),
    reqTelephone: Joi.object().keys({
        code: Joi.string().trim(true).regex(/^\+[0-9]{1,3}$/).required(),
        value: Joi.string().trim(true).regex(/^[0-9]{9}$/).required()
    }).required()
}