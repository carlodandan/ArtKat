import { useEffect } from 'react';

const useScrollAnimation = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-fade-in, .portfolio-item, .profile__grid, .contact__links');
      
      elements.forEach((element, index) => {
        // Set custom property for staggered animation
        if (element.classList.contains('portfolio-item')) {
          element.style.setProperty('--item-index', index);
        }
        
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        // Trigger when element enters viewport
        if (elementTop < windowHeight - 100 && elementBottom > 0) {
          element.classList.add('visible');
        }
      });
    };

    // Initial check
    handleScroll();
    
    // Add event listener with throttle
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', throttledScroll);
    };
  }, []);
};

export default useScrollAnimation;