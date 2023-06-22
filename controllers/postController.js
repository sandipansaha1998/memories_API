const Post = require("../models/postMessage.js");
const User = require("../models/user.js");

// Checks if server is up
module.exports.check = (req, res) => {
  return res.send("<h1>Connection Success</h1>");
};

// Fetch All posts
module.exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("creator", "name");
    return res.status(200).json({
      posts,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Fetch My posts
module.exports.myPosts = async (req, res) => {
  try {
    let userId = req.userId;
    console.log(userId);
    const posts = await Post.find({ creator: userId });
    console.log(posts);
    return res.status(200).json({
      posts,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Creates post
module.exports.createPost = async (req, res) => {
  let userId = req.userId;
  const newPost = {
    ...req.body,
    creator: userId,
  };
  console.log(newPost);
  try {
    let postCreated = await Post.create(newPost);
    postCreated = await Post.findById(postCreated._id).populate(
      "creator",
      "name"
    );
    postCreated = postCreated.toJSON();
    return res.status(200).json({ postCreated });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

// Updates Post
module.exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = req.body;
    const postTobeUpdated = await Post.findById(id);
    if (!postTobeUpdated) {
      return res.status(404).send("No post with that id");
    }
    const updatedPost = await Post.findByIdAndUpdate(id, post, {
      new: true,
    }).populate("creator", "name");
    res.status(200).json({ updatedPost });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
// Deletes Post
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

// Toggles like
module.exports.toggleLike = async (req, res) => {
  const { id } = req.params;
  let userId = req.userId;

  const post = await Post.findById(id).populate("creator", "name");
  if (!post) {
    return res.status(404).send("No post with that id");
  }
  // unlike
  if (post.likes.includes(userId)) {
    post.likes = post.likes.filter((user) => {
      if (user === userId) return false;
      return true;
    });
  } else {
    // Like
    post.likes.push(userId);
  }

  post.save();
  res.status(200).json({
    post,
  });
};
