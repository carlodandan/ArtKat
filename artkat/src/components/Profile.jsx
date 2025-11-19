/**
 * Author: carlodandan (https://github.com/carlodandan)
 */

import React from 'react';
import './Animation.css'

const Profile = () => {
  return (
    <section id="profile" className="profile section">
      <div className="container">
        <h2 className="section__title">Artist Profile</h2>
        
        <div className="profile__grid">
          <div className="profile__bio">
            <h3>Biography</h3>
            <p className="biography">
              ArtKat is a freelance digital artist based in the Philippines with expertise in character design, illustration, 
              and have experience in webtoon as an art assistant. Known for a distinctive artistic style that blends 
              traditional techniques with digital innovation.
            </p>
          </div>
          
          <div className="profile__timeline">
            <h3>Studio Affiliation</h3>
            <ul className="milestones">
              <li>
                  <a href="https://web.facebook.com/nosleeparewestartup" target="_blank" rel="noopener noreferrer" className="studio-link">
                      <strong>NOSLEEPAREWE Studio</strong>
                  </a>
              </li>
            </ul>
            <h3>Notable Milestones</h3>
            <ul className="milestones">
              <li>Flat Color Assistant for "I'm Dating a Psychopath"</li>
              <li>Lineart Assistant for "Getting It Straight!"</li>
              <li>Flat Color Assistant for "Two Suns Apart"</li>
            </ul>
          </div>
          
          <div className="profile__skills">
            <h3>Skills & Software</h3>
            <div className="skills__grid">
              <div className="skill-item">
                <img 
                  src="/csp.webp" 
                  alt="Clip Studio Paint" 
                  className="skill-icon skill-icon-circle"
                  width="24" 
                  height="24"
                />
                <span>Clip Studio Paint</span>
              </div>
            </div>
            <ul className="skills__list">
              <li>Character Designs</li>
              <li>Concept Illustrations</li>
              <li>Book Illustrations</li>
              <li>Webcomic Assistance</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;