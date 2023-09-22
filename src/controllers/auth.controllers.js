import { pool } from "../db.js";
import bcrypt from "bcrypt";
import { createAccesToken } from "../libs/jwt.js";
import md5 from "md5";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (result.rowCount === 0)
    return res.status(401).json([ "Usuario no encontrado" ]);

  const validPassword = await bcrypt.compare(password, result.rows[0].password);
  if (!validPassword)
    return res.status(400).json([ "Contraseña incorrecta" ]);

  const token = await createAccesToken({ id: result.rows[0].id });

  res.cookie("token", token, {
    // httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000, // 1 día
  });

  return res.json(result.rows[0]);
};

export const signup = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const gravatar = `https://gravatar.com/avatar/${md5(email)}`

    const result = await pool.query(
      "INSERT INTO users (email, password, name, gravatar) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, hashedPassword, name, gravatar]
    );

    const token = await createAccesToken({ id: result.rows[0].id });

    res.cookie("token", token, {
      // httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    });

    return res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json([ "Usuario ya existe" ]);
    }
    next(error);
  }
};

export const signout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};

export const profile = async (req, res) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [
    req.userId,
  ]);

  return res.json(result.rows[0]);
};
