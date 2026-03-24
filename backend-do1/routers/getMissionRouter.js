const express = require("express");
const router = express.Router();

const getMissionController = require("../controllers/getMissionController");

router.get("/mission", getMissionController.getMission);

module.exports = router;