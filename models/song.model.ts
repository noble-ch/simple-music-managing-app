import mongoose, { Schema, Document, Model } from "mongoose";

interface ISong extends Document {
  title: string;
  artistName: string;
  duration: number;
  songArt?: string;
  album?: string;
  year?: number;
  genre?: string;
  description?: string;
}

const songSchema: Schema<ISong> = new Schema(
  {
    title: { type: String, required: true },
    artistName: { type: String, required: true },
    duration: { type: Number, required: true },
    songArt: { type: String, default: null },
    album: { type: String, default: null },
    year: { type: Number, default: null },
    genre: { type: String, default: null },
    description: { type: String, default: null },
  },
  {
    timestamps: true, 
    versionKey: false,
  }
);

const Song: Model<ISong> = mongoose.model<ISong>("Song", songSchema);

export { Song, songSchema, ISong };
