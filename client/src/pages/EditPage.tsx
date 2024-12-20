import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { Save, Cancel } from "@mui/icons-material";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  MenuItem,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";

import { useAppSelector, AppDispatch } from "../lib/store";
import {
  fetchSongByIdStart,
  editSongStart,
} from "../lib/services/song/songSlice";
import { Song } from "../types";

const genres = ["Afro Beat", "Pop", "Jazz", "Rock", "Hip Hop"];

const EditPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { song, loading, editSongError, editSongSuccess } = useAppSelector(
    (state) => state.songReducer
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Song>();

  useEffect(() => {
    if (id) {
      dispatch(fetchSongByIdStart(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (song) {
      setValue("title", song.title ?? "");
      setValue("artistName", song.artistName ?? "");
      setValue("duration", song.duration ?? 0);
      setValue("songArt", song.songArt ?? "");
      setValue("album", song.album ?? "Single");
      setValue("year", song.year ?? 0);
      setValue("description", song.description ?? "");
      setValue("genre", genres.includes(song.genre ?? "") ? song.genre : "Afro Beat");
    }
  }, [song, setValue]);

  useEffect(() => {
    if (editSongSuccess) {
      toast.success("Song Updated Successfully");
      navigate("/");
    }
  }, [editSongSuccess, navigate]);

  useEffect(() => {
    if (editSongError) {
      toast.error(`Error: ${editSongError}`);
    }
  }, [editSongError]);

  const onSubmit: SubmitHandler<Song> = (data) => {
    const songWithId = { ...data, _id: id || "" };
    dispatch(editSongStart(songWithId));
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <Container
        maxWidth="md"
        sx={{ display: "flex", justifyContent: "center", mt: 10 }}
      >
        <CircularProgress size={80} />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Edit Song
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Update the details of your song below.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}
          >
            {/* Title */}
            <TextField
              label="Title"
              {...register("title", { required: "Title is required" })}
              error={!!errors.title}
              helperText={errors.title?.message}
              fullWidth
            />

            {/* Artist Name */}
            <TextField
              label="Artist Name"
              {...register("artistName", { required: "Artist Name is required" })}
              error={!!errors.artistName}
              helperText={errors.artistName?.message}
              fullWidth
            />

            {/* Duration and Year */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Duration (in seconds)"
                type="number"
                {...register("duration", {
                  required: "Duration is required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Duration must be a positive number." },
                })}
                error={!!errors.duration}
                helperText={errors.duration?.message}
                fullWidth
              />

              <TextField
                label="Year"
                type="number"
                {...register("year", {
                  valueAsNumber: true,
                  min: { value: 1800, message: "Year must be after 1800 G.C" },
                })}
                error={!!errors.year}
                helperText={errors.year?.message}
                fullWidth
              />
            </Box>

            {/* Song Art and Album */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField label="Song Art URL" {...register("songArt")} fullWidth />
              <TextField label="Album" {...register("album")} fullWidth />
            </Box>

            {/* Genre */}
            <TextField
              label="Genre"
              select
              {...register("genre", { required: "Genre is required" })}
              error={!!errors.genre}
              helperText={errors.genre?.message}
              fullWidth
            >
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </TextField>

            {/* Description */}
            <TextField
              label="Description"
              {...register("description", { required: "Description is required" })}
              error={!!errors.description}
              helperText={errors.description?.message}
              fullWidth
              multiline
              rows={4}
            />

            {/* Buttons */}
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
                startIcon={<Cancel />}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<Save />}
              >
                Update Song
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EditPage;
