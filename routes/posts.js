const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/create", postController.createPost);
router.get("/", postController.getPosts);
router.patch("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
module.exports = router;
