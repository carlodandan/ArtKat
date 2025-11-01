import React, { useState, useEffect } from 'react';
import webtoonData from '../data/webtoon.json';
import personalData from '../data/personal.json';
import ProtectedImage from './ProtectedImage';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [displayedItems, setDisplayedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const allItems = [
    ...personalData,
    ...webtoonData.map(webtoon => ({
      ...webtoon,
      category: 'webtoon'
    }))
  ];

  // Function to trim description to 3 lines
  const trimDescription = (description, maxLines = 3) => {
    return description;
  };

  useEffect(() => {
    filterItems(activeFilter);
  }, [activeFilter]);

  const filterItems = (filter) => {
    if (filter === 'all') {
      setDisplayedItems(allItems);
    } else {
      setDisplayedItems(allItems.filter(item => item.category === filter));
    }
  };

  const getCategoryHeader = () => {
    switch(activeFilter) {
      case 'personal':
        return 'List of personal art illustrations.';
      case 'webtoon':
        return 'List of webtoon titles where I contributed as an assistant artist (flats and/or lineart)';
      default:
        return null;
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowDetail(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeDetail = () => {
    setShowDetail(false);
    setSelectedItem(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const renderPortfolioItem = (item) => {
    if (item.category === 'webtoon') {
      const platformClass = item.platform === 'originals' ? 'platform-originals' : 'platform-canvas';
      const platformText = item.platform === 'originals' ? 'WEBTOON Originals' : 'WEBTOON Canvas';
      
      return (
        <div 
          key={item.title} 
          className="portfolio-item webtoon" 
          data-category="webtoon"
          onClick={() => handleItemClick(item)}
        >
          <div className="webtoon-link">
            <ProtectedImage 
              src={item.poster} 
              alt={item.title} 
              className="portfolio-item__img webtoon-thumbnail" 
            />
            <div className="portfolio-item__info">
              <h4>{item.title}</h4>
              <p className="webtoon-description">{trimDescription(item.description)}</p>
              <div className="webtoon-meta">
                <span className={`platform-badge ${platformClass}`}>{platformText}</span>
                <span className="portfolio-item__category">webtoon</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div 
        key={item.title} 
        className={`portfolio-item ${item.category}`} 
        data-category={item.category}
        onClick={() => handleItemClick(item)}
      >
        <ProtectedImage 
          src={item.image} 
          alt={item.title} 
          className="portfolio-item__img" 
        />
        <div className="portfolio-item__info">
          <h4>{item.title}</h4>
          <p className="portfolio-description">{trimDescription(item.description)}</p>
          <span className="portfolio-item__category">{item.category}</span>
        </div>
      </div>
    );
  };

  const renderDetailCard = () => {
    if (!selectedItem) return null;

    return (
      <div className="detail-overlay" onClick={closeDetail}>
        <div className="detail-card" onClick={(e) => e.stopPropagation()}>
          <button className="detail-close" onClick={closeDetail}>
            ×
          </button>
          
          <div className="detail-content">
            <div className="detail-image">
              <img 
                src={selectedItem.poster || selectedItem.image} 
                alt={selectedItem.title} 
                className={selectedItem.category === 'webtoon' ? 'webtoon-detail-image' : ''}
              />
            </div>
            
            <div className="detail-info">
              <h2 className="detail-title">{selectedItem.title}</h2>
              <div className="detail-description-container">
                <p className="detail-description">{selectedItem.description}</p>
              </div>
              
              <div className="detail-meta">
                <span className={`detail-category ${selectedItem.category}`}>
                  {selectedItem.category}
                </span>
                
                {selectedItem.platform && (
                  <span className={`platform-badge ${selectedItem.platform === 'originals' ? 'platform-originals' : 'platform-canvas'}`}>
                    {selectedItem.platform === 'originals' ? 'WEBTOON Originals' : 'WEBTOON Canvas'}
                  </span>
                )}
              </div>
              
              {selectedItem.category === 'webtoon' && selectedItem.url && (
                <div className="detail-actions">
                  <a 
                    href={selectedItem.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn--primary"
                  >
                    Read on WEBTOON
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="portfolio" className="portfolio section">
      <div className="container">
        <h2 className="section__title">Portfolio</h2>
        
        <div className="portfolio__filters">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
            data-filter="all"
          >
            All
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveFilter('personal')}
            data-filter="personal"
          >
            Personal
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'webtoon' ? 'active' : ''}`}
            onClick={() => setActiveFilter('webtoon')}
            data-filter="webtoon"
          >
            Webtoon
          </button>
        </div>
        
        <div className="portfolio__grid">
          {activeFilter !== 'all' && (
            <div className="category-header">
              <em>{getCategoryHeader()}</em>
            </div>
          )}
          {displayedItems.map(renderPortfolioItem)}
        </div>
      </div>

      {showDetail && renderDetailCard()}
    </section>
  );
};

export default Portfolio;