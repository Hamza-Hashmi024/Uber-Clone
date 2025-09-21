const express = require("express");
const router = express.Router();
const captainController = require("../Controllers/captain.controler");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");


router.post(
  "/register",
  [
    body("fullname.firstName")
      .notEmpty().withMessage("First name is required")
      .isLength({ min: 3 }).withMessage("First name must be at least 3 characters"),
    body("fullname.lastName")
      .optional()
      .isLength({ min: 3 }).withMessage("Last name must be at least 3 characters"),
    body("email")
      .isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("vechicle.color")
      .notEmpty().withMessage("Vehicle color is required")
      .isLength({ min: 3 }).withMessage("Color must be at least 3 characters"),
    body("vechicle.plate")
      .notEmpty().withMessage("Vehicle plate is required"),
    body("vechicle.capicity")
      .isInt({ min: 1 }).withMessage("Capacity must be at least 1"),
    body("vechicle.vechicleType")
      .isIn(["car", "motorcycle", "auto"]).withMessage("Invalid vehicle type"),
  ],
  captainController.registerCaptain
);



module.exports = router;