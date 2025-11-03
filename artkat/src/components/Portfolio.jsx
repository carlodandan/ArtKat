import React, { useState, useEffect, useMemo, useCallback } from 'react';
import webtoonData from '../data/webtoon.json';
import personalData from '../data/personal.json';
import othersData from '../data/others.json';
import ProtectedImage from './ProtectedImage';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [displayedItems, setDisplayedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [activeOthersTab, setActiveOthersTab] = useState('lineart');

  // Memoize allItems to prevent recalculation on every render
  const allItems = useMemo(() => [
    ...personalData,
    ...webtoonData.map(webtoon => ({
      ...webtoon,
      category: 'webtoon'
    }))
  ], []);

  // Function to trim description to 3 lines
  const trimDescription = (description, maxLines = 3) => {
    return description;
  };

  useEffect(() => {
    filterItems(activeFilter);
  }, [activeFilter]);

  // Memoize filterItems function
  const filterItems = useCallback((filter) => {
  if (filter === 'all') {
    setDisplayedItems(allItems);
  } else if (filter === 'others') {
    setDisplayedItems([]);
  } else if (filter === 'personal') {
    // For personal filter, check if category includes 'personal'
    setDisplayedItems(allItems.filter(item => 
      item.category.includes('personal')
    ));
  } else {
    // For other filters (like webtoon), use exact match
    setDisplayedItems(allItems.filter(item => item.category === filter));
  }
}, [allItems]);

  // Memoize category header
  const categoryHeader = useMemo(() => {
    switch(activeFilter) {
      case 'personal':
        return 'List of personal art illustrations.';
      case 'webtoon':
        return 'List of webtoon titles where I contributed as an assistant artist.';
      case 'others':
        return 'Collection of linearts and character design sheets';
      default:
        return null;
    }
  }, [activeFilter]);

  const handleItemClick = useCallback((item) => {
    setSelectedItem(item);
    setShowDetail(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleLineartClick = useCallback((imageSrc) => {
    setSelectedItem({
      title: "Lineart Sample",
      image: imageSrc,
      category: 'lineart'
    });
    setShowDetail(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeDetail = useCallback(() => {
    setShowDetail(false);
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  }, []);

  // Memoize portfolio item renderer
  const renderPortfolioItem = useCallback((item) => {
    if (item.category === 'webtoon') {
      const platformClass = item.platform === 'originals' ? 'platform-originals' : 'platform-canvas';
      const platformText = item.platform === 'originals' ? 'Originals' : 'Canvas';
      
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
              {/* Add genres display */}
              {item.genres && item.genres.length > 0 && (
                <div className="webtoon-genres">
                  {item.genres.map((genre, index) => (
                    <span key={index} className="genre-tag">
                      {genre}
                    </span>
                  ))}
                </div>
              )}
              <div className="webtoon-meta">
                <span className={`platform-badge ${platformClass}`}>{platformText}</span>
                <span className="portfolio-item__category">webtoon</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Split categories by comma for personal items with multiple tags
    const categories = item.category.split(',').map(cat => cat.trim());

    return (
      <div 
        key={item.title} 
        className={`portfolio-item ${categories[0]}`} 
        data-category={categories[0]}
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
          <span className="portfolio-item__category">
            {categories.join(', ')}
          </span>
        </div>
      </div>
    );
  }, [handleItemClick]);

  // Memoize others tabs renderer
  const renderOthersTabs = useMemo(() => {
    if (activeFilter !== 'others') return null;

    return (
      <div className="others-container">
        {/* Tab Navigation */}
        <div className="others-tabs">
          <button 
            className={`others-tab ${activeOthersTab === 'lineart' ? 'active' : ''}`}
            onClick={() => setActiveOthersTab('lineart')}
          >
            Lineart Samples
          </button>
          <button 
            className={`others-tab ${activeOthersTab === 'character_design' ? 'active' : ''}`}
            onClick={() => setActiveOthersTab('character_design')}
          >
            Character Design
          </button>
        </div>

        {/* Tab Content */}
        <div className="others-tab-content">
          {activeOthersTab === 'lineart' && (
            <div className="lineart-grid">
              {othersData.lineart.images.map((image, index) => (
                <div 
                  key={index} 
                  className="lineart-item"
                  onClick={() => handleLineartClick(image)}
                >
                  <ProtectedImage 
                    src={image} 
                    alt={`Lineart Sample ${index + 1}`}
                    className="lineart-image" 
                  />
                </div>
              ))}
            </div>
          )}

          {activeOthersTab === 'character_design' && (
            <div className="character-design-grid">
              {/* Add header for character design section */}
              <div className="category-header">
                <em className="charDesign">Character design sheet from an unpublished anthology Webtoon series by NOSLEEPAREWE Studio.</em>
              </div>
              {othersData.character_design.items.map((item, index) => (
                <div 
                  key={index} 
                  className="portfolio-item character-design"
                  onClick={() => handleItemClick({...item, category: 'character_design'})}
                >
                  <ProtectedImage 
                    src={item.image} 
                    alt={item.title} 
                    className="portfolio-item__img" 
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }, [activeFilter, activeOthersTab, handleItemClick, handleLineartClick]);

  // Memoize detail card renderer
  const renderDetailCard = useMemo(() => {
    if (!selectedItem) return null;

    const isLineart = selectedItem.category === 'lineart';
    const isCharacterDesign = selectedItem.category === 'character_design';

    return (
      <div className="detail-overlay" onClick={closeDetail}>
        <div className="detail-card" onClick={(e) => e.stopPropagation()}>
          <button className="detail-close" onClick={closeDetail}>
            ×
          </button>
          
          <div className={`detail-content ${isLineart || isCharacterDesign ? 'lineart-detail' : ''}`}>
            <div className="detail-image">
              <img 
                src={selectedItem.poster || selectedItem.image} 
                alt={selectedItem.title} 
                className={isLineart || isCharacterDesign ? 'lineart-full-image' : (selectedItem.category === 'webtoon' ? 'webtoon-detail-image' : '')}
              />
            </div>
            
            {/* Hide info panel for lineart AND character design */}
            {!isLineart && !isCharacterDesign && (
              <div className="detail-info">
                <h2 className="detail-title">{selectedItem.title}</h2>
                
                {selectedItem.description && (
                  <div className="detail-description-container">
                    <p className="detail-description">{selectedItem.description}</p>
                  </div>
                )}
                
                {/* Add genres display in detail view */}
                {selectedItem.genres && selectedItem.genres.length > 0 && (
                  <div className="detail-genres">
                    <strong>Genres: </strong>
                    {selectedItem.genres.map((genre, index) => (
                      <span key={index} className="genre-tag">
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Remove category and platform badges for webtoon AND personal items */}
                {selectedItem.category !== 'webtoon' && !selectedItem.category.includes('personal') && (
                  <div className="detail-meta">
                    {/* Split categories by comma and render all */}
                    {selectedItem.category.split(',').map((cat, index) => {
                      const trimmedCat = cat.trim();
                      return (
                        <span key={index} className={`detail-category ${trimmedCat}`}>
                          {trimmedCat}
                        </span>
                      );
                    })}
                    
                    {selectedItem.platform && (
                      <span className={`platform-badge ${selectedItem.platform === 'originals' ? 'platform-originals' : 'platform-canvas'}`}>
                        {selectedItem.platform === 'originals' ? 'Originals' : 'Canvas'}
                      </span>
                    )}
                  </div>
                )}
                
                {/* Webtoon button for webtoon items */}
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
                
                {/* Webtoon button for personal items that have URL */}
                {selectedItem.category.includes('personal') && selectedItem.url && (
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
            )}
          </div>
        </div>
      </div>
    );
  }, [selectedItem, closeDetail]);

  // Memoize portfolio grid content
  const portfolioGridContent = useMemo(() => {
    return (
      <div className="portfolio__grid">
        {activeFilter !== 'all' && activeFilter !== 'others' && (
          <div className="category-header">
            <em>{categoryHeader}</em>
          </div>
        )}
        {activeFilter !== 'others' && displayedItems.map(renderPortfolioItem)}
        {renderOthersTabs}
      </div>
    );
  }, [activeFilter, categoryHeader, displayedItems, renderPortfolioItem, renderOthersTabs]);

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
          <button 
            className={`filter-btn ${activeFilter === 'others' ? 'active' : ''}`}
            onClick={() => setActiveFilter('others')}
            data-filter="others"
          >
            Others
          </button>
        </div>
        
        {portfolioGridContent}
      </div>

      {showDetail && renderDetailCard}
    </section>
  );
};

export default Portfolio;
/**
 * Author: carlodandan (https://github.com/carlodandan)
 */