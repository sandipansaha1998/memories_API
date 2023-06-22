const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middleware/auth.js");

router.post("/create", auth, postController.createPost);
router.get("/", postController.getPosts);
router.patch("/:id", auth, postController.updatePost);
router.delete("/:id", auth, postController.deletePost);
router.post("/toggle-like/:id", auth, postController.toggleLike);
module.exports = router;
