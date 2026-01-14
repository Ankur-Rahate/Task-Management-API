import express from "express";

import userRouter from "./users/userrouter.js";
import globleErrorHander from "./middlewares/globalErrorHandler.js";
import { taskRouter } from "./Task/taskRouter.js";

const app = express();
app.use(express.json());

app.get("/", (req, res)=>{
  res.json({message: "hellow world"})
})

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

app.use(globleErrorHander);

export default app;
