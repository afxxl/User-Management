const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { body } = require("express-validator");
const router = express.Router();

const {
  getAllUsers,
  updateUser,
  deleteUser,
  addUser,
} = require("../controllers/adminController.js");

router.get("/users", protect, getAllUsers);
router.put(
  "/update/:id",
  protect,
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  body("email").isEmail().withMessage("Invalid email format"),
  updateUser,
);

router.delete("/delete/:id", protect, deleteUser);
router.post(
  "/add",
  protect,
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
  addUser,
);

module.exports = router;
