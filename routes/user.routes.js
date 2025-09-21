const express = require("express");
const router = express.Router();
const userController = require("../Controllers/user.conroller");
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("fullname.firstName").not().isEmpty().withMessage("First name is required"),
    body("fullname.lastName").not().isEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser
);

module.exports = router;