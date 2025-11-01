import React, { Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';

// Lazy load the main content components
const Profile = React.lazy(() => import('./components/Profile'));
const Portfolio = React.lazy(() => import('./components/Portfolio'));
const Contact = React.lazy(() => import('./components/Contact'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="loading-section">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <Profile />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Portfolio />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;