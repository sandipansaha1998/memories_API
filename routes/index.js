const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
router.get("/", postController.check);
router.use("/posts", require("./posts.js"));
module.exports = router;
