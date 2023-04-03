import { Router } from "express";
import stadiumController from "../../controlers/stadium/stadiumAPIController.js";
import { isAuthorized } from "../../middlewares/auth.js";

const router = Router();

router.get("/", (req, res) => {
  stadiumController.getAll(req, res);
  /*  res.send("Mostrar todos los estadios"); */
});

router.get("/:id", (req, res) => {
  stadiumController.getById(req, res);
  /* res.send("Mostrar un estadio con id " + req.params.id); */
});

router.post("/", isAuthorized, (req, res) => {
  stadiumController.create(req, res);
  /* res.send("Crea un estadio "); */
});

router.put("/:id", isAuthorized, (req, res) => {
  stadiumController.update(req, res);
  /* res.send("Edita un estadio con id " + req.params.id); */
});

router.delete("/:id", isAuthorized, (req, res) => {
  stadiumController.deletes(req, res);
  /* res.send("Elimina un estadio con id " + req.params.id); */
});

export default router;
