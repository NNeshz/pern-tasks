import { Router } from "express";

const router = Router();

router.post("/signin", (req, res) => {
    res.send("Ingresnado")
})

router.post("/signup", (req, res) => {
    res.send("Registrando")
})

router.post("/signout", (req, res) => {
    res.send("Cerrando sesion")
})

router.get("/profile", (req, res) => {
    res.send("Perfil del usuario")
})

export default router;