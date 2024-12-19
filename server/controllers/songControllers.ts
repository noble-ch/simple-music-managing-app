import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import {
  findSong,
  getAllSongs,
  createSong,
  updateSong,
  deleteSong,
} from "../repositories/songRespository";

export const getAllSongsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const songs = await getAllSongs();
    res.status(StatusCodes.OK).json(songs);
  } catch (error) {
    throw new Error();
  }
};

export const createSongController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const song = await createSong(req.body);
    res.status(StatusCodes.CREATED).json(song);
  } catch (error) {
    next(error);
    console.log(error)
  }
};

export const updateSongController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const song = await updateSong(req.params.id, req.body);
    res.status(StatusCodes.OK).json(song);
  } catch (error) {
    next(error);
  }
};

export const deleteSongController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await deleteSong(req.params.id);
    res.status(StatusCodes.OK).json({ msg: "Song Deleted", id: req.params.id });
  } catch (error) {
    next(error);
  }
};
export const getSongController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const song = await findSong(req.params.id);
    res.status(StatusCodes.OK).json(song);
  } catch (error) {
    next(error);
  }
};
