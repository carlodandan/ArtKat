import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Lazy load the page components
const Home = React.lazy(() => import('./components/Home'));
const Profile = React.lazy(() => import('./components/Profile'));
const Artwork = React.lazy(() => import('./components/Artwork'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="loading-page">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/artwork" element={<Artwork />} />
            <Route path="/artwork/all" element={<Artwork />} />
            <Route path="/artwork/personal" element={<Artwork />} />
            <Route path="/artwork/webtoon" element={<Artwork />} />
            <Route path="/artwork/others" element={<Artwork />} />
            <Route path="/artwork/others/visual-breakdown" element={<Artwork />} />
            <Route path="/artwork/others/character-design" element={<Artwork />} />
            <Route path="/artwork/others/art-process" element={<Artwork />} />
            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;