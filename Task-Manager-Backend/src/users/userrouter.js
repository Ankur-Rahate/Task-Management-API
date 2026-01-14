import express from "express";
import {register, loginUser, getme} from "./usercontoller.js";
import authMiddleware from "../middlewares/authMiddelware.js";

const userRouter = express.Router();

userRouter.post("/signup", register);
userRouter.post("/login", loginUser);
userRouter.get("/me", authMiddleware, getme)

export default userRouter;