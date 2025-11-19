import React, { useState, useEffect, useMemo, useCallback } from 'react';
import webtoonData from '../data/webtoon.json';
import personalData from '../data/personal.json';
import othersData from '../data/others.json';

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

  const handleLineartClick = useCallback((imageSrc, type = 'lineart') => {
    // Generate full image path from crop image path
    const fileName = imageSrc.split('/').pop();
    const baseName = fileName.replace(/\.[^/.]+$/, ""); // Remove file extension
    const fullImagePath = `/img/others/process/full/${baseName}.webp`;
    
    setSelectedItem({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Sample`,
      image: fullImagePath,
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
            <img 
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
        <img 
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

  // Function to generate overlay images for lineart items
  const generateOverlayImages = (baseImageSrc) => {
    // Extract the base name from the image path and remove the file extension
    const fileName = baseImageSrc.split('/').pop();
    const baseName = fileName.replace(/\.[^/.]+$/, ""); // Remove file extension
    
    return {
      lineart: `/img/others/process/crop/${baseName}_lineart.webp`,
      flat: `/img/others/process/crop/${baseName}_flat.webp`,
      rendered: `/img/others/process/crop/${baseName}_rendered.webp`
    };
  };

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
            Art Process
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
              {othersData.lineart.images.map((image, index) => {
                const overlayImages = generateOverlayImages(image);
                
                return (
                  <div key={index} className="lineart-artwork">
                    <div className="art-process-grid">
                      {/* Lineart */}
                      <div 
                        className="art-process-column"
                        onClick={() => handleLineartClick(overlayImages.lineart, 'lineart')}
                      >
                        <div className="art-process-image-container">
                          <img 
                            src={overlayImages.lineart} 
                            alt="Lineart version"
                            className="art-process-image"
                          />
                          <div className="art-process-hover-overlay">
                            <span className="art-process-hover-text">Lineart</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Flat Colors */}
                      <div 
                        className="art-process-column"
                        onClick={() => handleLineartClick(overlayImages.flat, 'flat')}
                      >
                        <div className="art-process-image-container">
                          <img 
                            src={overlayImages.flat} 
                            alt="Flat color version"
                            className="art-process-image"
                          />
                          <div className="art-process-hover-overlay">
                            <span className="art-process-hover-text">Flat Colors</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Rendered */}
                      <div 
                        className="art-process-column"
                        onClick={() => handleLineartClick(overlayImages.rendered, 'rendered')}
                      >
                        <div className="art-process-image-container">
                          <img 
                            src={overlayImages.rendered} 
                            alt="Rendered version"
                            className="art-process-image"
                          />
                          <div className="art-process-hover-overlay">
                            <span className="art-process-hover-text">Final Render</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
                  <img 
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
    const hasButton = (selectedItem.category === 'webtoon' || selectedItem.category.includes('personal')) && selectedItem.url;

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
                {/* Title Section */}
                <div className="detail-header">
                  <h2 className="detail-title">{selectedItem.title}</h2>
                </div>

                {/* Scrollable Content Section */}
                <div className="detail-scrollable">
                  {/* Summary/Description */}
                  {selectedItem.description && (
                    <div className="detail-summary">
                      <h3 className="detail-subtitle">Summary</h3>
                      <div className="detail-description-container">
                        <p className="detail-description">{selectedItem.description}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Genres for Webtoon */}
                  {selectedItem.genres && selectedItem.genres.length > 0 && (
                    <div className="detail-genres-section">
                      <h3 className="detail-subtitle">Genres</h3>
                      <div className="detail-genres">
                        {selectedItem.genres.map((genre, index) => (
                          <span key={index} className="genre-tag">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Categories for non-webtoon, non-personal items */}
                  {selectedItem.category !== 'webtoon' && !selectedItem.category.includes('personal') && (
                    <div className="detail-categories-section">
                      <h3 className="detail-subtitle">Categories</h3>
                      <div className="detail-meta">
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
                    </div>
                  )}
                </div>

                {/* Fixed Button Section */}
                {hasButton && (
                  <div className="detail-actions-fixed">
                    <a 
                      href={selectedItem.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn--primary"
                    >
                      {selectedItem.category === 'webtoon' ? 'Read on WEBTOON' : 'Read on WEBTOON'}
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