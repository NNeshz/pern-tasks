import Router from "express-promise-router";
import { createTask, deleteTask, getAllTask, getTask, updateTask } from "../controllers/tasks.controllers.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/tasks", isAuth, getAllTask);

router.get("/tasks/:id", isAuth, getTask);

router.post("/tasks", isAuth, createTask);

router.put("/tasks/:id", isAuth, updateTask);

router.delete("/tasks/:id", isAuth, deleteTask);

export default router;
