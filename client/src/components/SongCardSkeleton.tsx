import React from "react";
import ContentLoader from "react-content-loader";
const SongCardSkeleton: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={450}
      height={160}
      viewBox="0 0 450 160"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className="m-4 rounded-lg"
    >
      <rect x="10" y="10" rx="5" ry="5" width="100" height="100" />
      <rect x="130" y="45" rx="3" ry="3" width="150" height="15" />
      <rect x="130" y="15" rx="3" ry="3" width="200" height="20" />
      <rect x="10" y="120" rx="5" ry="5" width="380" height="30" />
    </ContentLoader>
  );
};

export default SongCardSkeleton;
