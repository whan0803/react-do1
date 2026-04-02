const express = require("express");
const router = express.Router();

const getMissionController = require("../controllers/getMissionController");
const missionSuccessController = require("../controllers/missionSuccessController");
const missionFailController = require("../controllers/missionFailController");
const missionListController = require("../controllers/missionListController");
const getCalenderMissionController = require("../controllers/getCalenderMissionController");

router.post("/mission", getMissionController.getMission);
router.post("/today-result", getMissionController.getTodayMissionResult);
router.post("/day-count", getMissionController.getMissionDayCount);
router.post("/success", missionSuccessController.successMission);
router.post("/fail", missionFailController.failMission);
router.post("/list", missionListController.missionList);
router.post("/calender", getCalenderMissionController.getCalenderMission);

module.exports = router;
