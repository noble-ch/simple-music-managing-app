import { Request, Response } from "express";
import { calculateSongStats } from "../services/songStatsService";
import { SongStats } from "../types";
import { StatusCodes } from "http-status-codes";


export const getSongStatsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats: SongStats = await calculateSongStats(); 
    console.log("Successfully fetched song stats:", stats);

    res.status(StatusCodes.OK).json(stats);
  } catch (error) {
    console.error("Error fetching song stats:", error);
    res.status(500).json({ message: "Failed to fetch song stats", error: (error as any).message });
  }
};
