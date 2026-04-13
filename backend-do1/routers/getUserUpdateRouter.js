const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const getUserUpdateController = require("../controllers/getUserUpdateController");

router.use(authMiddleware);

router.post("/me", getUserUpdateController.getProfile);
router.post("/update", getUserUpdateController.updateProfile);

module.exports = router;
