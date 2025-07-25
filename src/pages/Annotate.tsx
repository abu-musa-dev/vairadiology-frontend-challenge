import React, { useState } from 'react';
import ImageSlider from '../components/annotate/ImageSlider';
import ImageAnnotator from '../components/annotate/ImageAnnotator';

const images = [
  '/images/image1.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
  // ... আরো 10-15 ছবি থাকতে পারে public/images ফোল্ডারে
];

const Annotate: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Image Annotation Tool</h1>
      <ImageSlider images={images} currentIndex={currentIndex} setIndex={setCurrentIndex} />
      <ImageAnnotator imageSrc={images[currentIndex]} />
    </div>
  );
};

export default Annotate;
