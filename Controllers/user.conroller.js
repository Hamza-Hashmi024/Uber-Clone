const userModel = require("../models/user.model");
const userService = require("../Services/user.services");
const { validationResult } = require("express-validator");
const BlacklistToken = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password } = req.body;
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ Message: "User with this email already exists" });
    } 
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
      firstName: fullname.firstName,
      lastName: fullname.lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = user.generateAuthToken();

    res.cookie("token", token, );

    const { password: _, ...userData } = user.toObject();

    res.status(200).json({ user: userData, token });
  } catch (error) {
    next(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json({ user: req.user } );
}
 

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  const blacklistedToken = new BlacklistToken({ token });
  await blacklistedToken.save();
  res.status(200).json({Message : "Logged Out Successfully"})
}
