import { Router } from "express";
import tournamentController from "../../controlers/tournament/tournamentAPIController.js";
import isAuthorized from "../../middlewares/auth.js";

const router = Router();

router.get("/", (req, res) => {
  tournamentController.getAll(req, res);
  /*  res.send("Mostrar todos los torneos"); */
});

router.get("/:id", (req, res) => {
  tournamentController.getById(req, res);
  /* res.send("Mostrar un torneo con id " + req.params.id); */
});

router.post("/", isAuthorized, (req, res) => {
  tournamentController.create(req, res);
  /* res.send("Crea un torneo "); */
});

router.put("/:id", isAuthorized, (req, res) => {
  tournamentController.update(req, res);
  /* res.send("Edita un torneo con id " + req.params.id); */
});

router.delete("/:id", isAuthorized, (req, res) => {
  tournamentController.deletes(req, res);
  /* res.send("Elimina un torneo con id " + req.params.id); */
});

/*
crear nuevo jugador
editar un jugador
eliminar un jugador
*/

export default router;
