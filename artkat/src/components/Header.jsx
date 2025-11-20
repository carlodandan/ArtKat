import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    // Cleanup function
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/profile', label: 'Profile' },
    { path: '/artwork', label: 'Artwork' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header className="header">
      <nav className="nav container">
        <Link to="/" className="nav__logo" onClick={closeMenu}>
          Art<span>Kat</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="nav__menu">
          <ul className="nav__list">
            {navLinks.map((link) => (
              <li key={link.path} className="nav__item">
                <Link 
                  to={link.path} 
                  className={`nav__link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Burger Button */}
        <button 
          className={`burger-menu ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
        </button>

        {/* Mobile Side Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu__overlay" onClick={closeMenu}></div>
          <div className="mobile-menu__content">
            <div className="mobile-menu__header">
              <span className="mobile-menu__title">Menu</span>
            </div>
            
            <ul className="mobile-menu__list">
              {navLinks.map((link) => (
                <li key={link.path} className="mobile-menu__item">
                  <Link 
                    to={link.path} 
                    className={`mobile-menu__link ${location.pathname === link.path ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;