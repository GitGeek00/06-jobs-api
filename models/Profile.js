const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ProfileSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: [3, "Name should be more than 3 characters"],
    maxLength: [50, "Name shouldn't be more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ,
      "Please provide valid email",
    ],
    unique: true,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
});


module.exports = mongoose.model("Profile", ProfileSchema);
