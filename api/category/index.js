const { Router } = require("express");
const { alter, register, remove, getAll } = require("./category.controller");
const { updateValidator, deleteValidator, registerValidator } = require("./category.validators");
const { validate } = require("../validator.helper");
const { user, passUserID } = require("./category.middleware");
const respond = require("../response.middleware");

const router = Router();

/**
* @api {get} /api/category Get all categories
* @apiGroup Categories
* @apiSuccessExample {json} Success example:
*   {
*       success: true,
*       categories: [...]
*   }
*/
router.get(
    "/",
    user,
    getAll,
    respond
);

/**
* @api {post} /api/category/register Add new category
* @apiParam {String} name
* @apiParam {String} about
* @apiGroup Categories
* @apiSuccessExample {json} Success example:
*   {
*       success: true,
*       category: {...}
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
* @api {put} /api/category/update Update category
* @apiParam {String} [name]
* @apiParam {String} [about]
* @apiGroup Categories
* @apiSuccessExample {json} Success example:
*   {
*       success: true,
*       category: {...}
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
* @api {delete} /api/category/delete Delete category
* @apiParam {String} id
* @apiGroup Categories
* @apiSuccessExample {json} Success example:
*   {
*       success: true,
*       category: {
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

module.exports = router;
