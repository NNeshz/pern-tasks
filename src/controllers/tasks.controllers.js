import { pool } from "../db.js";

export const getAllTask = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM task WHERE user_id = $1", [
      req.userId,
    ]);
    if (result.rowCount === 0) return res.status(404).send("No tasks found");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  const { id } = req.params;

  const result = await pool.query("SELECT * FROM task WHERE id = $1", [id]);

  if (result.rows.length === 0)
    return res.status(404).send("No existe una tarea con ese id");

  res.json(result.rows[0]);
};

export const createTask = async (req, res, next) => {
  const { title, description } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO task (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, req.userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Ya existe una tarea con ese nombre",
      });
    }
    next(error);
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query("DELETE FROM task WHERE id = $1", [id]);

  if (result.rowCount === 0)
    return res.status(404).send("No existe una tarea con ese id");

  res.status(202).json("Tarea elminada correctamente");
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const result = await pool.query(
    "UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *",
    [title, description, id]
  );

  if (result.rowCount === 0)
    return res.status(404).send("No existe una tarea con ese id");

  res.json(result.rows[0]);
};
