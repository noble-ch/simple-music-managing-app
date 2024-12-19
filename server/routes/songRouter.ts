import { Router } from "express";
import {
  getAllSongsController,
  getSongController,
  createSongController,
  updateSongController,
  deleteSongController,
} from "../controllers/songControllers";

const songRouter = Router();

songRouter
  .route("/")
  .get(getAllSongsController); 

songRouter
  .route("/:id")
  .get(getSongController);
songRouter
  .route("/create")
  .post(createSongController); 

songRouter
  .route("/update/:id")
  .patch(updateSongController); 
songRouter
  .route("/delete/:id")
  .delete(deleteSongController); 

export { songRouter };
