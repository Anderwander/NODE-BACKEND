import { Router } from "express";
import { isAuthorized } from "../../middlewares/auth.js";
import playerControler from "../../controlers/player/playerAPIControler.js";

const router = Router();

router.get("/", (req, res) => {
  playerControler.getAll(req, res);
  /*   res.send("Mostrar todos los jugadores");
   */
});

router.get("/:id", (req, res) => {
  playerControler.getById(req, res);
  /* res.send("Mostrar un jugador con id " + req.params.id); */
});

router.post("/", isAuthorized, (req, res) => {
  playerControler.create(req, res);
  /* res.send("Crea un jugador "); */
});

router.put("/:id", isAuthorized, (req, res) => {
  playerControler.update(req, res);
  /*   res.send("Edita un jugador con id " + req.params.id);*/
});

router.delete("/:id", isAuthorized, (req, res) => {
  playerControler.deletes(req, res);
  /* res.send("Elimina un jugador con id " + req.params.id); */
});

/*
crear nuevo jugador
editar un jugador
eliminar un jugador
*/

export default router;
