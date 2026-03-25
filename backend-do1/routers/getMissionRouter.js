const express = require("express");
const router = express.Router();

const getMissionController = require("../controllers/getMissionController");
const missionSuccessController = require("../controllers/missionSuccessController")
const missionFailController = require("../controllers/missionFailController")

router.post("/mission", getMissionController.getMission);
router.post("/success", missionSuccessController.successMission)
router.post("/fail", missionFailController.failMission)

module.exports = router;