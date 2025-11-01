import React from 'react';

const ProtectedImage = ({ src, alt, className, ...props }) => {
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e) => {
    e.preventDefault();
  };

  const handleKeyDown = (e) => {
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+C, etc.
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && e.key === 'I') ||
      (e.ctrlKey && e.shiftKey && e.key === 'C') ||
      (e.ctrlKey && e.key === 'u')
    ) {
      e.preventDefault();
    }
  };

  React.useEffect(() => {
    // Add global keydown listener
    document.addEventListener('keydown', handleKeyDown);
    
    // Disable right-click globally
    document.addEventListener('contextmenu', handleContextMenu);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      {...props}
    />
  );
};

export default ProtectedImage;