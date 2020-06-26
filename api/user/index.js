const { Router } = require("express");
const { register, logout, exists, login, update } = require("./user.controller");
const { validate } = require("../validator.helper");
const { registerValidator, loginValidator, updateValidator } = require("./user.validators");
const { reqDotPassword, auth, setPasswordToReqBody, throwOnFail } = require("./user.middleware");
const respond = require("../response.middleware");
 
const router = Router();

/**
 * @api {post} /api/user/login Login
 * @apiGroup User
 * @apiParam {Email} email
 * @apiParam {String} password
 * @apiSuccessExample {json} Success example:
 *  {
 *      "success": true,
 *      "token": "...",
 *      "user": {...}
 *  }
 */
router.post(
    "/login",
    validate(loginValidator),
    login
);

/**
 * @api {post} /api/user/register Register user
 * @apiGroup User
 * @apiParam {String} [firstName]
 * @apiParam {String} [lastName]
 * @apiParam {Email} email
 * @apiParam {String} password
 * @apiSuccessExample {json} Success example:
 *  {
 *      "success": true,
 *      "token": "...",
 *      "user": {...}
 *  }
 */
router.post(
    "/register",
    validate(registerValidator),
    register,
    throwOnFail,
    login,
    respond
);

/**
 * @api {put} /api/user/update Update user
 * @apiGroup User
 * @apiParam {String} [firstName]
 * @apiParam {String} [lastName]
 * @apiParam {Email} email
 * @apiParam {String} password
 * @apiSuccessExample {json} Success example:
 *  {
 *      "success": true,
 *      "token": "...",
 *      "user": {...}
 *  }
 */
router.put(
    "/update",
    auth,
    reqDotPassword,
    validate(updateValidator),
    update,
    throwOnFail,
    setPasswordToReqBody,
    login,
    respond
);

/**
 * @api {post} /api/user/logout Log out
 * @apiGroup User
 * @apiSuccessExample {json} Success example:
 *  {
 *      "success": true,
 *      "user": null
 *  }
 */
router.post(
    "/logout",
    logout,
    respond
);

/**
 * @api {get} /api/user/exists Is user exists
 * @apiGroup User
 * @apiSuccessExample {json} Success example:
 *  {
 *      "success": true,
 *      "exists": true [or false]
 *  }
 */
router.get(
    "/exists",
    exists,
    respond
);

module.exports = router;
