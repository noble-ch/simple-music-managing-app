import React, { useEffect } from "react";
import { useAppSelector } from "../lib/store"; 
import { useDispatch } from "react-redux"; 
import { fetchSongStatisticsStart } from "../lib/services/song/songSlice";
import StatisticCard from "../components/StatisticsCard";
import { CircularProgress, Typography, Box, Alert } from "@mui/material";  

const StatisticsPage: React.FC = () => {
  const dispatch = useDispatch(); 
  const { songStatistics, fetchSongStatisticsSuccess, fetchSongStatisticsError } = useAppSelector(
    (state) => state.songReducer
  );

  useEffect(() => {
    if (!songStatistics) {
      dispatch(fetchSongStatisticsStart());
    }
  }, [dispatch, songStatistics]);

  if (fetchSongStatisticsError) {
    return (
      <Box className="statistics-page" sx={{ padding: "20px", textAlign: "center" }}>
        <Alert severity="error">Error fetching song statistics: {fetchSongStatisticsError}</Alert>
      </Box>
    );
  }

  if (!fetchSongStatisticsSuccess || !songStatistics) {
    return (
      <Box className="statistics-page" sx={{ padding: "20px", textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: "10px" }}>
          Loading song statistics...
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="statistics-page" sx={{ padding: "40px", display: "flex", justifyContent: "center" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
        Song Statistics
      </Typography>
      <StatisticCard statistics={songStatistics} />
    </Box>

    
  );
};

export default StatisticsPage;
