import React, { Suspense } from 'react';
const Portfolio = React.lazy(() => import('./Portfolio'));

const LoadingFallback = () => (
  <div className="loading-section">
    <div className="loading-spinner"></div>
    <p>Loading Artwork...</p>
  </div>
);

const Artwork = () => {
  return (
    <div className="artwork-page">
      <Suspense fallback={<LoadingFallback />}>
        <Portfolio />
      </Suspense>
    </div>
  );
};

export default Artwork;