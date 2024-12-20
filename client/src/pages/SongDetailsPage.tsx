import React, { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { FaMusic, FaRegCalendarAlt, FaUserAlt, FaCompactDisc } from "react-icons/fa"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchSongByIdStart } from "../lib/services/song/songSlice"; 
import { RootState } from "../lib/store"; 

const SongDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const dispatch = useDispatch();

  const { song, loading, fetchSongByIdError } = useSelector(
    (state: RootState) => state.songReducer
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchSongByIdStart(id));
    }
  }, [id, dispatch]);

  if (loading) {
    // Show loading state while data is being fetched
    return <div>Loading...</div>; 
  }

  if (fetchSongByIdError) {
    // Show error if there's an issue
    return <div>Error: {fetchSongByIdError}</div>; 
  }

  if (!song) {
    // In case the song is not available
    return <div>No song found</div>; 
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto max-w-4xl">
        <NavLink to="/" className="text-blue-600 hover:underline flex items-center space-x-2 mb-6">
          <span>←</span>
          <span>Back to Home</span>
        </NavLink>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-extrabold text-gray-800">{song.title}</h1>
          <div className="mt-4 flex flex-wrap gap-8">
            <div className="flex items-center space-x-2 text-gray-700">
              <FaUserAlt className="text-xl text-blue-600" />
              <p className="font-semibold">{song.artistName}</p>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <FaCompactDisc className="text-xl text-green-600" />
              <p>{song.album}</p>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <FaMusic className="text-xl text-orange-600" />
              <p>{song.genre}</p>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <FaRegCalendarAlt className="text-xl text-red-600" />
              <p>{song.year}</p>
            </div>
          </div>
          <p className="text-lg text-gray-600 mt-6">{song.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SongDetailsPage;
