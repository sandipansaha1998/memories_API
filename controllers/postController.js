const { default: mongoose } = require("mongoose");
const Post = require("../models/postMessage.js");

module.exports.check = (req, res) => {
  return res.send("<h1>Connection Success</h1>");
};

module.exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json({
      data: posts,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.createPost = async (req, res) => {
  const newPost = req.body;
  try {
    let postCreated = await Post.create(newPost);
    postCreated = postCreated.toJSON();
    return res.status(200).json({ data: postCreated });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

module.exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = req.body;
    const postTobeUpdated = await Post.findById(id);
    if (!postTobeUpdated) {
      return res.status(404).send("No post with that id");
    }
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json({ data: updatedPost });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const postTobeDeleted = await Post.findById(id);
  if (!postTobeDeleted) {
    return res.status(404).send("No post with that id");
  }
  await Post.findByIdAndRemove(id);
  res.status(200).json({
    message: "Post deleted",
  });
};
