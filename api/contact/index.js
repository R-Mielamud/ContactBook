const { Router } = require("express");
const { register, alter, getAll, getMin, remove, getById, birthdays } = require("./contact.controller");
const { validate } = require("../validator.helper");
const { registerValidator, updateValidator, deleteValidator, getQueryValidator } = require("./contact.validators");
const { user, passUserID } = require("./contact.middleware");
const respond = require("../response.middleware");

const router = Router();

/**
* @api {post} /api/contact/register Add new contact
* @apiParam {String} [firstName]
* @apiParam {String} [lastName]
* @apiParam {String} [who]
* @apiParam {String} [about]
* @apiParam {Date} [birthDate]
* @apiParam {Email} [mainEmail]
* @apiParam {Telephone} mainTelephone Telephone is {code: String, value: String}
* @apiParam {Telephone[]} [telephones]
* @apiParam {Email[]} [emails]
* @apiParam {Boolean} [favorite]
* @apiParam {Image} [photo]
* @apiParam {Category} category
* @apiParam {Messangers} [messangers] Messangers is { telegram: [String], viber: [String], whatsapp: [String], facebook: [String], twitter: [String], instagram: [String]
        }
* @apiGroup Contacts
* @apiSuccessExample {json} Success example:
*   {
*       success: true,
*       contact: {...}
*   }
*/
router.post(
    "/register",
    user,
    validate(registerValidator),
    passUserID,
    register,
    respond
);

/**
* @api {put} /api/contact/update Update contact
* @apiParam {String} [firstName]
* @apiParam {String} [lastName]
* @apiParam {String} [who]
* @apiParam {String} [about]
* @apiParam {Date} [birthDate]
* @apiParam {Email} [mainEmail]
* @apiParam {Telephone} [mainTelephone] Telephone is {code: String, value: String}
* @apiParam {Telephone[]} [telephones]
* @apiParam {Email[]} [emails]
* @apiParam {Boolean} [favorite]
* @apiParam {Image} [photo]
* @apiParam {Category} [category]
* @apiParam {Messangers} [messangers] Messangers is { telegram: [String], viber: [String], whatsapp: [String], facebook: [String], twitter: [String], instagram: [String]
        }
* @apiGroup Contacts
* @apiSuccessExample {json} Success example:
*   {
*       success: true,
*       contact: {...}
*   }
*/
router.put(
    "/update",
    user,
    validate(updateValidator),
    alter,
    respond
);

/**
* @api {get} /api/contact Get all contacts of logined user. Supports filtering by firstName, lastName, mainEmail, category
* @apiGroup Contacts
* @apiSuccessExample {json} Success example:
*   {
*       success: true,
*       contacts: [...]
*   }
*/
router.get(
    "/",
    user,
    validate(getQueryValidator),
    getAll,
    respond
);

/**
* @api {get} /api/contact/min Get minimum contacts info
* @apiGroup Contacts
* @apiSuccessExample {json} Success example:
*   {
*       success: true,
*       contacts: [...]
*   }
*/
router.get(
    "/min",
    user,
    validate(getQueryValidator),
    getMin,
    respond
);

/**
* @api {delete} /api/contact/delete Delete contact
* @apiParam {String} id
* @apiGroup Contacts
* @apiSuccessExample {json} Success example:
*   {
*       success: true,
*       contact: {
*           state: "deleted"
*       }
*   }
*/
router.delete(
    "/delete",
    user,
    validate(deleteValidator),
    remove,
    respond
);

/**
* @api {get} /api/contact/birthdays Get coming contact birthdays
* @apiGroup Contacts
* @apiSuccessExample {json} Success example:
*   {
*       success: true,
*       contacts: [...]
*   }
*/
router.get(
    "/birthdays",
    user,
    birthdays,
    respond
);

/**
* @api {get} /api/contact/:id Get contact by id (replace :id in path with real id)
* @apiGroup Contacts
* @apiSuccessExample {json} Success example:
*   {
*       success: true,
*       contact: {...}
*   }
*/
router.get(
    "/:id",
    user,
    getById,
    respond
);

module.exports = router;
