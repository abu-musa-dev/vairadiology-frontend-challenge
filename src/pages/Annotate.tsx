import React, { useState, useEffect } from "react";
import ImageAnnotator from "../components/annotate/ImageAnnotator";

// Array of 12 image URLs located in the public folder
const images = [
  "../../public/images/x-ray-2.jpg",
  "../../public/images/x-ray.jpeg",
  "../../public/images/x-ray.jpg",
  "../../public/images/xray (1).jpeg",
  "../../public/images/xray (1).jpg",
  "../../public/images/xray (2).jpg",
  "../../public/images/xray (3).jpg",
  "../../public/images/x-ray-10.webp",
  "../../public/images/x-ray11.webp",
  "../../public/images/xray-12.jpg",
  "../../public/images/xray13.webp",
  "../../public/images/xray-14.jpg",
];

// Type for annotations: a record where keys are image URLs and values are arrays of polygons (each polygon is an array of points)
type AnnotationsType = Record<string, number[][][]>;

const Annotate: React.FC = () => {
  // currentIndex holds the index of the currently selected image
  const [currentIndex, setCurrentIndex] = useState(0);
  // annotations stores polygon data for each image
  const [annotations, setAnnotations] = useState<AnnotationsType>({});

  // On component mount, load annotations from localStorage if available
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

  // The URL of the currently selected image
  const currentImage = images[currentIndex];

  // Adds a new polygon to the current image's annotations
  const handleAddPolygon = (points: number[][]) => {
    setAnnotations((prev) => ({
      ...prev,
      [currentImage]: [...(prev[currentImage] || []), points],
    }));
  };

  // Removes a polygon by index from the current image's annotations
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
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center">
        Image Annotation Tool
      </h1>

      {/* Thumbnail slider - lets users select images by clicking thumbnails */}
      <div className="flex overflow-x-auto space-x-2 p-2 mb-6 border rounded bg-gray-100 dark:bg-gray-800">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className={`w-24 h-20 object-cover rounded cursor-pointer border-2 ${
              currentIndex === index ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => setCurrentIndex(index)} // Select image on thumbnail click
          />
        ))}
      </div>

      {/* Image annotator container */}
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg border p-2 sm:p-4 md:p-6">
        <div className="relative w-full overflow-hidden">
          <ImageAnnotator
            imageSrc={currentImage} // Current image source
            polygons={annotations[currentImage] || []} // Polygons to draw for current image
            onAddPolygon={handleAddPolygon} // Callback to add polygon
            onRemovePolygon={handleRemovePolygon} // Callback to remove polygon
          />
        </div>
      </div>
    </div>
  );
};

export default Annotate;
