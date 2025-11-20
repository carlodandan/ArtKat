import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
/**
 * Author: carlodandan (https://github.com/carlodandan)
 */
const Hero = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const WEB3FORMS_ACCESS_KEY = '5f728e22-02d0-4ee7-b037-0fcf4f4a7cb5';

  const goToArtwork = () => {
    navigate('/artwork');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: formData.name,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('Message sent successfully! I\'ll get back to you soon. Please avoid sending multiple e-mails using this. 🎨');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsModalOpen(false);
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Web3Forms Error:', error);
      alert('Failed to send message. Please try again or contact me directly through social media.');
    } finally {
      setIsSubmitting(false);
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
          <button className="btn btn--primary" onClick={goToArtwork}>
            View My Work
          </button>
          
          {/* Social media buttons section */}
          <div className="hero__socials">
            <p className="hero__socials-text">You can visit and contact me in my socials and email.</p>
            <div className="hero__social-buttons">
              <a 
                href="https://web.facebook.com/keyti.artkat" 
                className="btn btn--social btn--facebook" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a 
                href="https://instagram.com/keyti_sar" 
                className="btn btn--social btn--instagram" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <button 
                className="btn btn--social btn--email"
                onClick={() => setIsModalOpen(true)}
              >
                Email
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Send me a message</h2>
              <button 
                className="modal-close"
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  placeholder="Your name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject:</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  placeholder="What is this regarding?"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  required
                  disabled={isSubmitting}
                  placeholder="Tell me about your project, commission request, or just say hello! ✨"
                ></textarea>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn--secondary"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn--primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading-spinner"></span>
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;