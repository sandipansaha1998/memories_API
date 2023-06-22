const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// User Login
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exsistingUser = await User.findOne({ email });
    if (!exsistingUser) {
      return res.status(404).json({ message: "User doses not exsist" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      exsistingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    // Creates JWT
    const token = jwt.sign(
      {
        email: exsistingUser.email,
        id: exsistingUser._id,
      },
      "test",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      token,
      user: {
        id: exsistingUser.id,
        email: exsistingUser.email,
        name: exsistingUser.name,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
// User sign up
module.exports.signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const exsistingUser = await User.findOne({ email });
    console.log(exsistingUser);
    if (exsistingUser) {
      return res.status(409).json({ message: "User already exsists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords Dont match" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    return res.status(200).json({
      message: "Successfully signed",
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
