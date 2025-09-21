const captainModel = require("../models/captain.model");
const { validationResult } = require("express-validator");
const captainService = require("../Services/captain.service");

module.exports.registerCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vechicle, location } = req.body;
    

    const isCaptainExist = await captainModel.findOne({ email });
    if (isCaptainExist) {
      return res
        .status(400)
        .json({ Message: "Captain with this email already exists" });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.CreateCaptain({
      fullname,
      email,
      password: hashedPassword,
      vechicle,
      location,
    });

    await captain.save();

    const token = captain.generateAuthToken();
    res.status(201).json({ captain, token });
  } catch (error) {
    next(error);
    res.status(500).json({ message: error.message });
  }
};
