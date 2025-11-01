import React from 'react';

const Header = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <nav className="nav container">
        <a href="#home" className="nav__logo" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
          ArtKat
        </a>
        <ul className="nav__list">
          <li><a href="#home" className="nav__link" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
          <li><a href="#profile" className="nav__link" onClick={(e) => { e.preventDefault(); scrollToSection('profile'); }}>Profile</a></li>
          <li><a href="#portfolio" className="nav__link" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}>Portfolio</a></li>
          <li><a href="#contact" className="nav__link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;