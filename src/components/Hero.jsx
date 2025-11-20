import React from 'react';
import { useNavigate } from 'react-router-dom';
/**
 * Author: carlodandan (https://github.com/carlodandan)
 */
const Hero = () => {
  const navigate = useNavigate();

  const goToArtwork = () => {
    navigate('/artwork');
  };

  return (
    <section id="home" className="hero">
      <div 
        className="hero__background"
        style={{
          backgroundImage: 'url("/splash.webp")'
        }}
      ></div>
      <div className="hero__overlay">
        <div className="hero__content container">
          <h1 className="hero__title">ArtKat</h1>
          <p className="hero__tagline">Digital Artist & Illustrator</p>
          <button className="btn btn--primary" onClick={goToArtwork}>
            View My Work
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;