import express from "express";
import { createTask, deleteTask, getMyTasks, updateTask } from "./taskController.js";
import authMiddleware from "../middlewares/authMiddelware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const taskRouter = express.Router();

taskRouter.post("/", authMiddleware, createTask);
taskRouter.get("/", authMiddleware, getMyTasks);
taskRouter.put("/:id", authMiddleware, updateTask);
taskRouter.delete("/:id",authMiddleware,authorizeRoles("admin"), deleteTask);



export {taskRouter};