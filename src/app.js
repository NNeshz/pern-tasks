import express from "express";
import morgan from "morgan";

import tasksRoutes from "./routes/tasks.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", tasksRoutes);
app.use("/api", authRoutes);

app.get("/test", (req, res) => {
  throw new Error("Error de conexion");
  res.send("Test");
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

export default app;
