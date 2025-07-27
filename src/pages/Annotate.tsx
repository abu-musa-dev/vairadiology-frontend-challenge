import React, { useState, useEffect } from "react";
import ImageAnnotator from "../components/annotate/ImageAnnotator";

// Array of image URLs stored in the public/images folder
const images = [
  "/images/x-ray-2.jpg",
  "/images/x-ray.jpeg",
  "/images/x-ray.jpg",
  "/images/xray (1).jpeg",
  "/images/xray (1).jpg",
  "/images/xray (2).jpg",
  "/images/xray (3).jpg",
  "/images/x-ray-10.webp",
  "/images/x-ray11.webp",
  "/images/xray-12.jpg",
  "/images/xray13.webp",
  "/images/xray-14.jpg",
];

type AnnotationsType = Record<string, number[][][]>;

const Annotate: React.FC = () => {
  // Holds the index of the currently selected image
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Stores annotations for each image, keyed by image URL
  const [annotations, setAnnotations] = useState<AnnotationsType>({});

  // Load saved annotations from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem("annotations");
    if (stored) {
      try {
        setAnnotations(JSON.parse(stored));
      } catch {
        setAnnotations({});
      }
    }
  }, []);

  // Save annotations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("annotations", JSON.stringify(annotations));
  }, [annotations]);

  // The URL of the current image
  const currentImage = images[currentIndex];

  // Add a new polygon annotation to the current image
  const handleAddPolygon = (points: number[][]) => {
    setAnnotations((prev) => ({
      ...prev,
      [currentImage]: [...(prev[currentImage] || []), points],
    }));
  };

  // Remove a polygon annotation by its index for the current image
  const handleRemovePolygon = (polygonIndex: number) => {
    setAnnotations((prev) => {
      if (!prev[currentImage]) return prev;
      const updatedPolygons = prev[currentImage].filter(
        (_, i) => i !== polygonIndex
      );
      return { ...prev, [currentImage]: updatedPolygons };
    });
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      {/* Page title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center">
        Image Annotation Tool
      </h1>

      {/* Thumbnail slider for image selection */}
      <div className="flex overflow-x-auto space-x-2 p-2 mb-6 border rounded bg-gray-100 dark:bg-gray-800">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className={`w-24 h-20 object-cover rounded cursor-pointer border-2 ${
              currentIndex === index ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => setCurrentIndex(index)} // Change current image on thumbnail click
            draggable={false} // Disable drag to prevent accidental dragging
          />
        ))}
      </div>

      {/* Image annotator component */}
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg border p-2 sm:p-4 md:p-6">
        <div className="relative w-full overflow-hidden">
          <ImageAnnotator
            imageSrc={currentImage} // Current image to annotate
            polygons={annotations[currentImage] || []} // Annotations (polygons) for current image
            onAddPolygon={handleAddPolygon} // Callback to add new polygon
            onRemovePolygon={handleRemovePolygon} // Callback to remove polygon
          />
        </div>
      </div>
    </div>
  );
};

export default Annotate;
