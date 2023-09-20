import { pool } from "../db.js";
import bcrypt from "bcrypt";

import { createAccesToken } from "../libs/jwt.js"

export const signin = (req, res) => {
  res.send("signin");
};

export const signup = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *",
      [email, hashedPassword, name]
    );

    const token = await createAccesToken({ id: result.rows[0].id})
    // res.json(result.rows[0]);
    return res.json({
      token: token
    })
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Usuario ya existe" });
    }
    next(error);
  }
};

export const signout = (req, res) => {
  res.send("signout");
};

export const profile = (req, res) => {
  res.send("profile");
};
