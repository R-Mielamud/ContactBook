const { Joi, Segments } = require("celebrate");
const { string, object } = require("../validator.shortcuts");

exports.registerValidator = {
    [Segments.BODY]: Joi.object().keys({
        firstName: string.base,
        lastName: string.base,
        mainEmail: string.email,
        mainTelephone: object.reqTelephone,
        emails: Joi.array().items(string.base),
        telephones: Joi.array().items(object.telephone),
        category: string.objectID.required(),
        who: string.base,
        about: string.base,
        birthDate: Joi.date(),
        messangers: Joi.object().keys({
            telegram: string.base,
            viber: string.base,
            whatsapp: string.base,
            facebook: string.base,
            twitter: string.base,
            instagram: string.base
        }),
        favorite: Joi.boolean().default(false),
        photo: string.objectID
    })
};

exports.updateValidator = {
    [Segments.BODY]: Joi.object().keys({
        id: string.objectID.required(),
        data: Joi.object().keys({
            firstName: string.base.allow(""),
            lastName: string.base.allow(""),
            mainEmail: string.email.allow(""),
            mainTelephone: object.emptyTelephone,
            emails: Joi.array().items(string.email),
            telephones: Joi.array().items(object.emptyTelephone),
            category: string.objectID,
            who: string.base.allow(""),
            about: string.base.allow(""),
            birthDate: Joi.date().allow(""),
            messangers: Joi.object().keys({
                telegram: string.base.allow(""),
                viber: string.base.allow(""),
                whatsapp: string.base.allow(""),
                facebook: string.base.allow(""),
                twitter: string.base.allow(""),
                instagram: string.base.allow("")
            }),
            favorite: Joi.boolean().default(false),
            photo: string.objectID.allow("")
        })
    })
};

exports.shareValidator = {
    [Segments.BODY]: Joi.object().keys({
        userEmail: string.email.required(),
        id: string.objectID.required()
    })
};

exports.deleteValidator = {
    [Segments.BODY]: Joi.object().keys({
        id: string.objectID.required()
    })
};

exports.getQueryValidator = {
    [Segments.QUERY]: Joi.object().keys({
        firstName: string.base,
        midName: string.base,
        lastName: string.base,
        mainEmail: string.base,
        category: string.base
    })
};