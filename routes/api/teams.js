import { Router } from "express";
import isAuthorized from "../../middlewares/auth.js";
import teamController from "../../controlers/team/teamAPIController.js";

const router = Router();

router.get("/", (req, res) => {
  teamController.getAll(req, res);
  /*   res.send("Mostrar todos los equipos");
   */
});

router.get("/:id", (req, res) => {
  teamController.getById(req, res);
  /* res.send("Mostrar un equipo con id " + req.params.id); */
});

router.post("/", isAuthorized, (req, res) => {
  teamController.create(req, res);

  /* res.send("Crea un equipo "); */
});

router.put("/:id", isAuthorized, (req, res) => {
  teamController.update(req, res);
  /* res.send("Edita un equipo con id " + req.params.id); */
});

router.delete("/:id", isAuthorized, (req, res) => {
  teamController.deletes(req, res);
  /* res.send("Elimina un equipo con id " + req.params.id); */
});

/*
crear nuevo jugador
editar un jugador
eliminar un jugador
*/

export default router;