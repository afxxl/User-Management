const { validationResult } = require("express-validator");
const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const search = req.query.search || "";
    const users = await User.find({
      isAdmin: false,
      $or: [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    }).select("username email profilePic isAdmin");

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  try {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    await user.save();
    const users = await User.find({ isAdmin: false }).select(
      "username email profilePic isAdmin",
    );

    return res.status(200).json({ users });
  } catch (error) {}
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found to delete" });
    }
    const users = await User.find({ isAdmin: false }).select(
      "username email profilePic isAdmin",
    );
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.addUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ username, email, password });
    if (!user) {
      return res.status(400).json({ message: "User not created" });
    }

    const users = await User.find({ isAdmin: false }).select(
      "username email profilePic isAdmin",
    );
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
