const express = require("express");
const cors = require("cors");
const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());

const userRouter = require("./routers/userRouter");
const getMissionRouter = require("./routers/getMissionRouter");
const getUserUpdateRouter = require("./routers/getUserUpdateRouter");


app.use("/user", userRouter);
app.use("/getMission", getMissionRouter);
app.use("/profile", getUserUpdateRouter); 

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})