import { Router } from "express";
import isAuthorized from "../../middlewares/auth.js";
import teamController from "../../controlers/team/teamViewController.js";

const router = Router();

router.get("/", (req, res) => {
  teamController.getAll(req, res);
  /*   res.send("Mostrar todos los jugadores");
   */
});

router.get("/team/:id", (req, res) => {
  teamController.getById(req, res);
  /* res.send("Mostrar un jugador con id " + req.params.id); */
});

router.get("/new", (req, res) => {
  teamController.createForm(req, res);
  /*   res.send("Mostrar todos los jugadores");
   */
});

router.post("/", isAuthorized, (req, res) => {
  teamController.create(req, res);
  /* res.send("Crea un jugador "); */
});

router.put("/team/:id", isAuthorized, (req, res) => {
  teamController.update(req, res);
  /*   res.send("Edita un jugador con id " + req.params.id);*/
});

router.post("/team/delete/:id", isAuthorized, (req, res) => {
  teamController.deletes(req, res);
  /* res.send("Elimina un jugador con id " + req.params.id); */
});

/*
crear nuevo jugador
editar un jugador
eliminar un jugador
*/

export default router;
