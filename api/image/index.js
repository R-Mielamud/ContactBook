const { Router } = require("express");
const { register } = require("./image.controller");
const respond = require("../response.middleware");
const multer = require("multer");

const storage = multer.memoryStorage();
const fileSize = 10000000;

const upload = multer({
    storage,
    limits: {
        fileSize
    }
});

const router = Router();

/**
 * @api {post} /api/image/register Add new image
 * @apiGroup Images
 * @apiParam {MultipartFormDataFile} image
 * @apiSuccessExample {json} Success example
 *  {
 *      "success": true,
 *      "image": {...}
 *  }
 */
router.post(
    "/register",
    upload.single("image"),
    (req, res, next) => {
        if (!req.file) {
            throw {
                status: 400,
                message: "No file"
            }
        }

        next();
    },
    register,
    respond
);

module.exports = router;
