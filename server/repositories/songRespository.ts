import { NotFoundError, ValidationError } from "../errors/errors";
import { Song } from "../models/song.model";

export const getAllSongs = async () => {
  try {
    return await Song.find();
  } catch (error) {
    throw new Error("Failed to fetch songs");
  }
};

export const createSong = async (data: {
  title: string;
  artistName: string;
  duration: number;
  album?: string;
  year?: number;
  genre?: string;
}) => {
  if (!data.title) {
    throw new ValidationError("Title is required");
  }
  if (!data.artistName) {
    throw new ValidationError("Artist Name is required");
  }
  if (!data.duration) {
    throw new ValidationError("Song Duration is required");
  }

  // Check for duplicate song
  const existingSong = await Song.findOne({
    title: data.title,
    artistName: data.artistName,
  });
  if (existingSong) {
    throw new ValidationError(
      "A song with the same title and artist name already exists"
    );
  }

  try {
    const song = new Song(data);
    return await song.save();
  } catch (error) {
    throw new Error("Failed to create song");
  }
};

export const updateSong = async (
  id: string,
  data: Partial<{
    title: string;
    artistName: string;
    album?: string;
    year?: number;
    genre?: string;
    duration?: number;
  }>
) => {
  try {
    const song = await Song.findByIdAndUpdate(id, data, { new: true });
    if (!song) {
      throw new NotFoundError("Song not found");
    }
    return song;
  } catch (error) {
    throw new Error("Failed to update song");
  }
};

export const deleteSong = async (id: string) => {
  try {
    const song = await Song.findByIdAndDelete(id);
    if (!song) {
      throw new NotFoundError("Song not found");
    }
    return song;
  } catch (error) {
    throw new Error("Failed to delete song");
  }
};
export const findSong = async (id: string) => {
  try {
    const song = await Song.findById(id);
    if (!song) {
      throw new NotFoundError("Song not found");
    }
    return song;
  } catch (error) {
    throw new Error("Failed to find song");
  }
};
