const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const userRouter = require("./routers/userRouter");

app.use("/user", userRouter);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})