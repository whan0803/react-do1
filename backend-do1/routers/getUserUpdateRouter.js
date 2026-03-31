const express = require("express");
const router = express.Router();

const getUserUpdateController = require("../controllers/getUserUpdateController");

router.post("/me", getUserUpdateController.getProfile);
router.post("/update", getUserUpdateController.updateProfile);

module.exports = router;
