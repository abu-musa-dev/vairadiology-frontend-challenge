import React, { useState, useEffect } from "react";
import ImageSlider from "../components/annotate/ImageSlider";
import ImageAnnotator from "../components/annotate/ImageAnnotator";

// List of images stored in public/images folder
const images = [
  "/images/20872.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
  "/images/image4.jpg",
  "/images/image5.jpg",
];

// Type definition: each image path maps to an array of polygons, 
// each polygon is an array of points (x, y)
type AnnotationsType = Record<string, number[][][]>;

const Annotate: React.FC = () => {
  // Current index for the selected image
  const [currentIndex, setCurrentIndex] = useState(0);

  // Annotations data for each image
  const [annotations, setAnnotations] = useState<AnnotationsType>({});

  // Load annotations from localStorage when component mounts
  useEffect(() => {
    const stored = localStorage.getItem("annotations");
    if (stored) {
      try {
        setAnnotations(JSON.parse(stored));
      } catch {
        // If localStorage data is invalid, reset annotations
        setAnnotations({});
      }
    }
  }, []);

  // Save annotations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("annotations", JSON.stringify(annotations));
  }, [annotations]);

  // Current image based on index
  const currentImage = images[currentIndex];

  // Add a polygon to the current image
  const handleAddPolygon = (points: number[][]) => {
    setAnnotations((prev) => ({
      ...prev,
      [currentImage]: [...(prev[currentImage] || []), points],
    }));
  };

  // Remove a specific polygon by index
  const handleRemovePolygon = (polygonIndex: number) => {
    setAnnotations((prev) => {
      if (!prev[currentImage]) return prev;
      const updatedPolygons = prev[currentImage].filter(
        (_, i) => i !== polygonIndex
      );
      return {
        ...prev,
        [currentImage]: updatedPolygons,
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 flex flex-col items-center">
      {/* Page title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Image Annotation Tool
      </h1>

      {/* Image slider to navigate through images */}
      <div className="w-full max-w-3xl sm:max-w-4xl lg:max-w-5xl">
        <ImageSlider
          images={images}
          currentIndex={currentIndex}
          setIndex={setCurrentIndex}
        />
      </div>

      {/* Image annotator canvas */}
      <div className="mt-6 w-full max-w-3xl sm:max-w-4xl lg:max-w-5xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-3 sm:p-4 md:p-6">
        <ImageAnnotator
          imageSrc={currentImage}
          polygons={annotations[currentImage] || []}
          onAddPolygon={handleAddPolygon}
          onRemovePolygon={handleRemovePolygon}
        />
      </div>

      {/* Instruction text */}
      <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-4 px-2">
        Tap or click on the image to create polygons. Resize the window to test
        responsiveness.
      </p>
    </div>
  );
};

export default Annotate;
