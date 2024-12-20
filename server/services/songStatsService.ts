import { SongStats } from "../types";
import { Song } from "../models/song.model";

export const calculateSongStats = async (): Promise<SongStats> => {
  try {
    // Total number of songs
    const totalSongs = await Song.countDocuments();

    // Distribution by genre
    const genreDistribution = await Song.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Distribution by release year
    const releaseYearDistribution = await Song.aggregate([
      { $project: { year: { $toInt: "$year" } } },
      { $group: { _id: "$year", count: { $sum: 1 } } },
      { $sort: { _id: -1 } },
    ]);

    // Total number of unique artists
    const totalArtists = await Song.distinct("artistName").countDocuments();

    // Total number of albums
    const totalAlbums = await Song.distinct("album").countDocuments();

    // Artist statistics: count songs and albums per artist
    const artistCounts = await Song.aggregate([
      { $group: { _id: "$artistName", songCount: { $sum: 1 }, albumCount: { $addToSet: "$album" } } },
      { $project: { songCount: 1, albumCount: { $size: "$albumCount" } } },
    ]);

    // Album statistics: count songs per album
    const albumCounts = await Song.aggregate([
      { $group: { _id: "$album", songCount: { $sum: 1 } } },
      { $project: { album: "$_id", songCount: 1, _id: 0 } },
    ]);

    return {
      totalSongs,
      genreDistribution,
      releaseYearDistribution,
      totalArtists,
      totalAlbums,
      artistCounts,
      albumCounts,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error calculating song stats:", error.message, error.stack);
    } else {
      console.error("Error calculating song stats:", error);
    }
    throw new Error("Error calculating song stats");
  }
};
