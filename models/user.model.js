const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullname: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "Name must be at least 3 characters long"],
    },
    lastName: {
      type: String,
      required: true,
      minlength: [3, "Last Name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "email Name must be at least 5 characters long"],
  },
  password: { type: String, required: true, select: false },

  socketId: { type: String },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET , {expiresIn : `24h`});
  return token;
};

userSchema.methods.comparePassword = async function (Password) {
  return await bcrypt.compare(Password, this.password);
};

userSchema.statics.hashPassword = async function (Password) {
  return await bcrypt.hash(Password, 10);
};
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
