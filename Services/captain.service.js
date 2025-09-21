const Captain = require("../models/captain.model");

module.exports.CreateCaptain = async ({ fullname, email, password, vechicle, location }) => {
  // Sirf ye fields check karenge (location required nahi hai ab)
  if (
    !fullname?.firstName ||
    !email ||
    !password ||
    !vechicle?.color ||
    !vechicle?.plate ||
    !vechicle?.capicity ||
    !vechicle?.vechicleType
  ) {
    throw new Error("All fields are required");
  }

  // ✅ Hash password
  const hashedPassword = await Captain.hashPassword(password);

  const captain = new Captain({
    fullname,
    email,
    password: hashedPassword,
    vechicle,
    ...(location && { location }) 
  });

  return captain;
};