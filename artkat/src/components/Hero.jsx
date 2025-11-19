import React from 'react';
/**
 * Author: carlodandan (https://github.com/carlodandan)
 */
const Hero = () => {
  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
          <button className="btn btn--primary" onClick={scrollToPortfolio}>
            View My Work
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;