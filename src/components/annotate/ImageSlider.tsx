import React from 'react';

const ImageSlider = ({
  images,
  currentIndex,
  setIndex,
}: {
  images: string[];
  currentIndex: number;
  setIndex: (i: number) => void;
}) => {
  return (
    <div className="flex overflow-x-auto space-x-2 py-2">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`image-${i}`}
          className={`w-24 h-24 object-cover cursor-pointer border-2 ${
            i === currentIndex ? 'border-blue-500' : 'border-transparent'
          }`}
          onClick={() => setIndex(i)}
        />
      ))}
    </div>
  );
};

export default ImageSlider;
