import { Router } from "express";
import isAuthorized from "../middlewares/auth.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Mostrar todos los estadios");
});

router.get("/:id", (req, res) => {
  res.send("Mostrar un estadio con id " + req.params.id);
});

router.post("/", isAuthorized, (req, res) => {
  res.send("Crea un estadio ");
});

router.put("/:id", isAuthorized, (req, res) => {
  res.send("Edita un estadio con id " + req.params.id);
});

router.delete("/:id", isAuthorized, (req, res) => {
  res.send("Elimina un estadio con id " + req.params.id);
});

/*
crear nuevo jugador
editar un jugador
eliminar un jugador
*/

export default router;
