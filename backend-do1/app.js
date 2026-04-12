const express = require("express");
const cors = require("cors");
const { initDb } = require("./db/initDb");

const app = express();

app.use(cors());
app.use(express.json());

initDb().catch((err) => {
  console.error("DB initialization failed:", err);
});

const userRouter = require("./routers/userRouter");
const getMissionRouter = require("./routers/getMissionRouter");
const getUserUpdateRouter = require("./routers/getUserUpdateRouter");

app.use("/api", userRouter);
app.use("/api", getMissionRouter);
app.use("/api", getUserUpdateRouter);

app.get("/", (req, res) => {
  res.send("서버 정상 작동");
});
app.get("/api", (req, res) => {
  res.send("api서버 정상 작동");
});

module.exports = app;
