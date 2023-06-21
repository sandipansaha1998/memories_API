const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/create", postController.createPost);
router.get("/", postController.getPosts);
router.patch("/:id", postController.update);
module.exports = router;
