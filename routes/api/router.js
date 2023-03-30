import { Router } from "express";
import playerRouter from "./player.js";
import teamRouter from "./teams.js";
import gameRouter from "./games.js";
import stadiumRouter from "./stadiums.js";
import tournamentsRouter from "./tournaments.js";
import userRouter from "./user.js";

const router = Router();

router.use("/players", playerRouter);
router.use("/teams", teamRouter);
router.use("/games", gameRouter);
router.use("/stadiums", stadiumRouter);
router.use("/tournaments", tournamentsRouter);
router.use("/users", userRouter);

export default router;
