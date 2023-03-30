import { Router } from "express";
import isAuthorized from "../../middlewares/auth.js";
import gameController from "../../controlers/game/gameAPIController.js";

const router = Router();

router.get("/", (req, res) => {
  gameController.getAll(req, res);
  /*   res.send("Mostrar todos los partidos");
   */
});

router.get("/:id", (req, res) => {
  gameController.getById(req, res);
  /* res.send("Mostrar un equipo con id " + req.params.id); */
});

router.post("/", isAuthorized, (req, res) => {
  gameController.create(req, res);
  /* res.send("Crea un equipo "); */
});

router.put("/:id", isAuthorized, (req, res) => {
  gameController.update(req, res);
  /* res.send("Edita un equipo con id " + req.params.id); */
});

router.delete("/:id", isAuthorized, (req, res) => {
  gameController.deletes(req, res);
  /* res.send("Elimina un equipo con id " + req.params.id); */
});

/*
crear nuevo jugador
editar un jugador
eliminar un jugador
*/

export default router;
