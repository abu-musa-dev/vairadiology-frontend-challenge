import React from "react";

interface ImageSliderProps {
  images: string[];           // List of image URLs
  currentIndex: number;       // Currently selected image index
  setIndex: (index: number) => void;  // Function to update the current index
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  currentIndex,
  setIndex,
}) => {
  // Show previous image; loops to last image if current is first
  const prev = () =>
    setIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);

  // Show next image; loops to first image if current is last
  const next = () =>
    setIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);

  return (
    <div className="flex items-center justify-center space-x-6">
      {/* Previous button */}
      <button
        onClick={prev}
        aria-label="Previous Image"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Prev
      </button>

      {/* Current image display */}
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="max-h-72 rounded-lg shadow-md object-contain"
        draggable={false}  // Disable drag to avoid accidental dragging on desktop
      />

      {/* Next button */}
      <button
        onClick={next}
        aria-label="Next Image"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Next
      </button>
    </div>
  );
};

export default ImageSlider;