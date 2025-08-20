const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(404).json({ message: "User not Found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = generateToken(user._id);

    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

exports.updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  try {
    const userId = req.params.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.file) {
      user.profilePic = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const updatedUser = await user.save();
    const { password: _, ...userWithoutPassword } = updatedUser.toObject();
    const token = generateToken(updatedUser._id);
    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
