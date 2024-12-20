import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../lib/store";
import { fetchSongsStart } from "../lib/services/song/songSlice";

import SongCard from "../components/SongCard";
import SongCardSkeleton from "../components/SongCardSkeleton";


const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { songs, loading, fetchSongsError } = useAppSelector(
    (state) => state.songReducer
  );

  useEffect(() => {
    dispatch(fetchSongsStart());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        {/* Header Section */}
        <header className="flex justify-between items-center my-6 px-4">
          <h1 className="text-4xl font-extrabold text-gray-800">
            🎵 Discover Songs
          </h1>
          <NavLink to="/statistics" className="text-blue-500 hover:underline text-xl font-extrabold ">
         Statistics
          </NavLink>
       
          <NavLink to="/create">
            <button className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-lg flex items-center transition duration-300">
              <span className="mr-2">Add Song</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </NavLink>
        </header>

        {/* Main Content */}
        <main>
          {/* Error State */}
          {fetchSongsError && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
              <p>Error: {fetchSongsError}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <SongCardSkeleton key={index} />
              ))}
            </div>
          )}

          {/* Songs Display */}
          {!loading && songs && songs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
              {songs.map((data, index) => (
              <SongCard key={index} data={data} />
            ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && songs && songs.length === 0 && (
            <div className="text-center mt-16">
              <h2 className="text-3xl font-semibold text-gray-600">
                No Songs Available
              </h2>
              <p className="text-gray-500 mt-4">
                Start by adding your favorite songs to the library.
              </p>
              <NavLink to="/create">
                <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-300">
                  Add Your First Song
                </button>
              </NavLink>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
