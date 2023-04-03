import { Router } from "express";
import playerRouter from "./player.js";
import teamRouter from "./team.js";
//import gameRouter from "./game.js";
import stadiumRouter from "./stadium.js";
//import tournamentsRouter from "./tournament.js";
import authRouter from "./auth.js";

const router = Router();

router.use("/players", playerRouter);
router.use("/teams", teamRouter);
//router.use("/games", gameRouter);
router.use("/stadiums", stadiumRouter);
router.use("/", authRouter);
//router.use("/tournaments", tournamentsRouter);
router.get("/", (req, res) => {
  const auth = req.user;
  res.render("index", { auth });
});

export default router;
