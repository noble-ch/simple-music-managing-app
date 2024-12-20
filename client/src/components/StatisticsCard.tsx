import React from "react";
import { FaMusic, FaUsers, FaCompactDisc, FaRegFileAudio } from "react-icons/fa"; 
import { SongStatistics } from "../types";

interface StatisticCardProps {
  statistics: SongStatistics;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ statistics }) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* Total Stats */}
      <div className="bg-white p-6 rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-2xl">
        <div className="flex items-center space-x-4">
          <FaMusic className="text-3xl text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-800">Total Stats</h3>
        </div>
        <ul className="mt-4 space-y-2">
          <li className="flex justify-between text-gray-700">
            Total Songs: <span className="font-semibold">{statistics.totalSongs}</span>
          </li>
          <li className="flex justify-between text-gray-700">
            Total Artists: <span className="font-semibold">{statistics.totalArtists}</span>
          </li>
          <li className="flex justify-between text-gray-700">
            Total Albums: <span className="font-semibold">{statistics.totalAlbums}</span>
          </li>
          <li className="flex justify-between text-gray-700">
            Total Genres: <span className="font-semibold">{statistics.genreDistribution.length}</span>
          </li>
        </ul>
      </div>

      {/* Genre Stats */}
      <div className="bg-white p-6 rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-2xl">
        <div className="flex items-center space-x-4">
          <FaRegFileAudio className="text-3xl text-green-600" />
          <h3 className="text-xl font-semibold text-gray-800">Songs by Genre</h3>
        </div>
        <ul className="mt-4 space-y-2">
          {statistics.genreDistribution.map((item) => (
            <li key={item._id} className="flex justify-between text-gray-700">
              {item._id}: <span className="font-semibold">{item.count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Artist Stats */}
      <div className="bg-white p-6 rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-2xl">
        <div className="flex items-center space-x-4">
          <FaUsers className="text-3xl text-yellow-600" />
          <h3 className="text-xl font-semibold text-gray-800">Songs & Albums by Artist</h3>
        </div>
        <ul className="mt-4 space-y-2">
          {statistics.artistCounts.map((item) => (
            <li key={item._id} className="flex justify-between text-gray-700">
              {item._id}: <span className="font-semibold">{item.songCount} Songs</span>, <span className="font-semibold">{item.albumCount} Albums</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Album Stats */}
      <div className="bg-white p-6 rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-2xl">
        <div className="flex items-center space-x-4">
          <FaCompactDisc className="text-3xl text-red-600" />
          <h3 className="text-xl font-semibold text-gray-800">Songs by Album</h3>
        </div>
        <ul className="mt-4 space-y-2">
          {statistics.albumCounts.map((item) => (
            <li key={item.album} className="flex justify-between text-gray-700">
              {item.album}: <span className="font-semibold">{item.songCount} Songs</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StatisticCard;
