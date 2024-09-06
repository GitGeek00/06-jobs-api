const User = require("../models/User.js");
const Profile = require("../models/Profile");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const checkUser = await User.findOne({ email: req.body.email });

  if (checkUser) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Duplicate", msg: "User already exist!" });
    return;
  }

  const user = await User.create(req.body);
 
  await Profile.create({
    userName: req.body.userName,
    email: req.body.email,
    city: "",
    country: "",
  });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: user, token });
};

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  // Check if user exist
  if (!user) {
    throw new UnauthenticatedError(
      "User name or/and password invalid, please make sure you entered the correct user name and password"
    );
  }
  
  // compare password
  const isPasswordCorrect = await user.comparePassword(req.body.password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError(
      "User name or/and password invalid, please make sure you entered the correct user name and password"
    );
  }
  const token = user.createJWT();
  
  res.status(StatusCodes.OK).json({ user: { name: user.userName, email: user.email }, token });
};

module.exports = { register, login };
