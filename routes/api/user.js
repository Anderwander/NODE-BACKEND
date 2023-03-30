import { Router } from "express";
import userController from "../../controlers/user/userController.js";
import isAuthorized from "../../middlewares/auth.js";

const router = Router();

router.get("/", (req, res) => {
  userController.getAll(req, res);
});

router.post("/", (req, res) => {
  userController.create(req, res);
});

router.post("/login", (req, res) => {
  userController.login(req, res);
});

router.post("/login", (req, res) => {
  userController.login(req, res);
});

router.get("/login", (req, res) => {
  userController.loginForm(req, res);
});

export default router;
