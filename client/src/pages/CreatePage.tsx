import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { createSongStart } from "../lib/services/song/songSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../lib/store";
import { Song } from "../types";

const genres = [
  "Afro Beats",
  "Pop",
  "Jazz",
  "Rock",
  "Hip Hop",
  "Cultural",
  "Tizita",
];

const CreatePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Song>();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, createSongError, createSongSuccess } = useAppSelector(
    (state) => state.songReducer
  );

  const [cancelDialogOpen, setCancelDialogOpen] = React.useState(false);

  const onSubmit: SubmitHandler<Song> = (data) => {
    dispatch(createSongStart(data));
  };

  useEffect(() => {
    if (createSongSuccess) {
      toast.success("Song Created Successfully!");
      navigate("/");
    }
  }, [createSongSuccess, navigate]);

  useEffect(() => {
    if (createSongError) {
      toast.error(`Error: ${createSongError}`);
    }
  }, [createSongError]);

  const handleCancel = () => {
    setCancelDialogOpen(true);
  };

  const handleCancelConfirm = () => {
    setCancelDialogOpen(false);
    navigate("/");
  };

  const handleCancelClose = () => {
    setCancelDialogOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Card sx={{ mt: 4, boxShadow: 3 }}>
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              🎶 Add a New Song
            </Typography>

            <TextField
              label="Title"
              {...register("title", { required: "Title is required" })}
              error={!!errors.title}
              helperText={errors.title?.message}
              fullWidth
            />

            <TextField
              label="Artist Name"
              {...register("artistName", { required: "Artist Name is required" })}
              error={!!errors.artistName}
              helperText={errors.artistName?.message}
              fullWidth
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Duration (in seconds)"
                type="number"
                {...register("duration", {
                  required: "Duration is required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Duration must be positive." },
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
                  min: { value: 1800, message: "Year must be above 1800 G.C" },
                })}
                error={!!errors.year}
                helperText={errors.year?.message}
                fullWidth
              />
            </Box>

            <TextField label="Song Art URL" {...register("songArt")} fullWidth />

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField label="Album" {...register("album")} fullWidth />
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
            </Box>

            <TextField
              label="Description"
              {...register("description", { required: "Description is required" })}
              error={!!errors.description}
              helperText={errors.description?.message}
              fullWidth
              multiline
              rows={4}
            />

            {loading ? (
              <CircularProgress sx={{ alignSelf: "center" }} />
            ) : (
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Create Song
                </Button>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={cancelDialogOpen} onClose={handleCancelClose}>
        <DialogTitle>Cancel Song Creation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClose} color="secondary">
            No
          </Button>
          <Button onClick={handleCancelConfirm} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CreatePage;
