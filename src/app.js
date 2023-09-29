import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import tasksRoutes from "./routes/tasks.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { ORIGIN } from "./config.js";
import { pool } from "./db.js";

const app = express();

// Middlewares
app.use(cors({
  origin: ORIGIN,
  credentials: true,
}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", tasksRoutes);
app.use("/api", authRoutes);

// Test Routes
app.get("/", (req, res) => {
  res.send("Welcome to my new API");
});

app.get("/api/ping", async (req, res) => {
  const response = await pool.query("SELECT NOW()")
  res.send(response.rows[0]);
})

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

export default app;
