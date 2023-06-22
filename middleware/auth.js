const jwt = require("jsonwebtoken");
const decode = require("jsonwebtoken").decode;
const User = require("../models/user");
const auth = async (req, res, next) => {
  try {
    console.log("AUTH");
    const token = req.headers.authorization.split(" ")[1];
    let decodedData = jwt.verify(token, "test");
    let userId = decodedData?.id;

    const user = await User.findById(userId);
    if (!user) {
      console.log("Not authorized");
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    req.userId = userId;
    console.log("Authenticated");
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Toke Expired",
    });
  }
};
module.exports = auth;
