const express = require("express");
const router = express.Router();

const { getProfileData, updateProfile } = require("../controllers/profile.js");

router.get("/", getProfileData);
router.patch("/", updateProfile);

module.exports = router;

