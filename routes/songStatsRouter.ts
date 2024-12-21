import { Router } from "express";

import { getSongStatsController } from "../controllers/songStatsController";



const songStatsRouter = Router();

songStatsRouter
    .route("/")
    .get(getSongStatsController);



export { songStatsRouter };


