const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
router.get("/", postController.check);
router.use("/posts", require("./posts.js"));
router.use("/user", require("./user.js"));

module.exports = router;
