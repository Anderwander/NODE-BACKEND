import { Router } from "express";
import { isAdmin, isAuthorized } from "../../middlewares/auth.js";
import playerControler from "../../controlers/player/playerViewControler.js";

const router = Router();

router.get("/", isAuthorized, (req, res) => {
  playerControler.getAll(req, res);
  /*   res.send("Mostrar todos los jugadores");
   */
});

router.get("/new", isAdmin, (req, res) => {
  playerControler.createForm(req, res);
  /*   res.send("Mostrar todos los jugadores");
   */
});

router.get("/player/:id", (req, res) => {
  playerControler.getById(req, res);
  /* res.send("Mostrar un jugador con id " + req.params.id); */
});

router.post("/", isAuthorized, (req, res) => {
  playerControler.create(req, res);
  /* res.send("Crea un jugador "); */
});

router.put("/player/:id", isAuthorized, (req, res) => {
  playerControler.update(req, res);
  /*   res.send("Edita un jugador con id " + req.params.id);*/
});

router.post("/player/delete/:id", isAuthorized, (req, res) => {
  playerControler.deletes(req, res);
  /* res.send("Elimina un jugador con id " + req.params.id); */
});

/*
crear nuevo jugador
editar un jugador
eliminar un jugador
*/

export default router;
