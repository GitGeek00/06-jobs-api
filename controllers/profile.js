const Profile = require("../models/Profile");
var ObjectId = require("mongoose").Types.ObjectId;
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const getProfileData = async (req, res) => {
  try {
    const data = await Profile.findOne({ email: req.body.email });

    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    console.log(error);
    return;
  }
};

const updateProfile = async (req, res) => {
  const { userName, city, country } = req.body.data;
  req.body.data.email = req.body.email;

  if (userName === "") {
    throw new BadRequestError("Name can't be empty");
  }
  const profile = await Profile.findOneAndUpdate({ email: req.body.email }, req.body.data, {
    new: true,
    runValidators: true,
  });
  if (!profile) {
    throw new NotFoundError(`No profile with email ${req.body.email}`);
  }
  res.status(StatusCodes.OK).json({ profile });
};

module.exports = { getProfileData, updateProfile };
