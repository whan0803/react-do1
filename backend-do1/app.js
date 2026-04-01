const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const userRouter = require("./routers/userRouter");
const getMissionRouter = require("./routers/getMissionRouter");
const getUserUpdateRouter = require("./routers/getUserUpdateRouter");

app.use("/user", userRouter);
app.use("/getMission", getMissionRouter);
app.use("/profile", getUserUpdateRouter);

app.get("/", (req, res) => {
  res.send("서버 정상 작동");
});

module.exports = app;
