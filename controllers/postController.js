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
    console.log(postCreated);
    return res.status(200).json(postCreated);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
