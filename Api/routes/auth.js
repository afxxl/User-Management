const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware.js");
const { body } = require("express-validator");
const upload = require("../middleware/upload.js");

const {
  registerUser,
  loginUser,
  updateUser,
} = require("../controllers/userController.js");

router.post(
  "/register",
  [
    body("username")
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  registerUser,
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  loginUser,
);
router.put(
  "/update/:id",
  protect,
  upload.single("profilePic"),
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  body("email").isEmail().withMessage("Invalid email format"),
  updateUser,
);

module.exports = router;
