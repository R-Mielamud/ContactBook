const { Router } = require("express");
const user = require("./user");
const contact = require("./contact");
const category = require("./category");
const image = require("./image");

const router = Router();

router.use("/user", user);
router.use("/contact", contact);
router.use("/category", category);
router.use("/image", image);

module.exports = router;
