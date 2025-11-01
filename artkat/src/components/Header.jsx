import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close menu after clicking
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <nav className="nav container">
        <a href="#home" className="nav__logo" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
          Art<span>Kat</span>
        </a>
        
        {/* Desktop Navigation */}
        <ul className="nav__list">
          <li><a href="#home" className="nav__link" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
          <li><a href="#profile" className="nav__link" onClick={(e) => { e.preventDefault(); scrollToSection('profile'); }}>Profile</a></li>
          <li><a href="#portfolio" className="nav__link" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}>Portfolio</a></li>
          <li><a href="#contact" className="nav__link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
        </ul>

        {/* Mobile Burger Menu */}
        <button 
          className={`nav__toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Dropdown Menu */}
        <div className={`nav__dropdown ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav__dropdown-list">
            <li><a href="#home" className="nav__dropdown-link" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
            <li><a href="#profile" className="nav__dropdown-link" onClick={(e) => { e.preventDefault(); scrollToSection('profile'); }}>Profile</a></li>
            <li><a href="#portfolio" className="nav__dropdown-link" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}>Portfolio</a></li>
            <li><a href="#contact" className="nav__dropdown-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;