import React, { useState } from 'react';
import "./ImageGallery.scss";

function ImageGallery({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const getUrl = (imageUrl) => {
    return process.env.REACT_APP_BASE_URL + imageUrl;
  }

  return (
    <div className="image-gallery">
      
      <button onClick={goToPreviousImage}>&lt;</button>
      <img src={getUrl(images[currentImageIndex].image_url)} alt="Product" />
      <button onClick={goToNextImage}>&gt;</button>
    </div>
  );
}

export default ImageGallery;