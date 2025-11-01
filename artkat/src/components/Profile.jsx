import React from 'react';

const Profile = () => {
  return (
    <section id="profile" className="profile section">
      <div className="container">
        <h2 className="section__title">Artist Profile</h2>
        
        <div className="profile__grid">
          <div className="profile__bio">
            <h3>Biography</h3>
            <p>
              ArtKat is a freelance digital artist based in the Philippines with expertise in character design, illustration, 
              and have experience in webtoon as an art assistant. Known for a distinctive artistic style that blends 
              traditional techniques with digital innovation.
            </p>
          </div>
          
          <div className="profile__timeline">
            <h3>Studio Affiliation</h3>
            <ul className="milestones">
              <li><strong>NOSLEEPAREWE Studio</strong></li>
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Clip Studio Paint</span>
              </div>
            </div>
            <ul className="skills__list">
              <li>Character Designs</li>
              <li>Character Illustrations</li>
              <li>Webtoon Creation</li>
              <li>Webtoon Lineart/Color Assists</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;