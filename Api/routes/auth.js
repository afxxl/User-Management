const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware.js");

const {
  registerUser,
  loginUser,
  updateUser,
} = require("../controllers/userController.js");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update/:id", protect, updateUser);

module.exports = router;
