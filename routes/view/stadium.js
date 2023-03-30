import { Router } from "express";
import isAuthorized from "../../middlewares/auth.js";
import stadiumController from "../../controlers/stadium/stadiumViewController.js";

const router = Router();

router.get("/", (req, res) => {
  stadiumController.getAll(req, res);
  /*   res.send("Mostrar todos los jugadores");
   */
});

router.get("/new", (req, res) => {
  stadiumController.createForm(req, res);
  /*   res.send("Mostrar todos los jugadores");
   */
});

router.get("/stadium/:id", (req, res) => {
  stadiumController.getById(req, res);
  /* res.send("Mostrar un jugador con id " + req.params.id); */
});

router.post("/", isAuthorized, (req, res) => {
  stadiumController.create(req, res);
  /* res.send("Crea un jugador "); */
});

router.put("/stadium/:id", isAuthorized, (req, res) => {
  stadiumController.update(req, res);
  /*   res.send("Edita un jugador con id " + req.params.id);*/
});

router.post("/stadium/delete/:id", isAuthorized, (req, res) => {
  stadiumController.deletes(req, res);
  /* res.send("Elimina un jugador con id " + req.params.id); */
});

export default router;
