import React, { useState, useEffect } from "react";
import ImageAnnotator from "../components/annotate/ImageAnnotator";

// Simple Loader spinner component
const Loader: React.FC = () => (
  <div role="status" aria-live="polite" className="text-center py-10">
    <svg
      className="animate-spin h-8 w-8 text-blue-600 mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
    <span className="sr-only">Loading images...</span>
  </div>
);

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [annotations, setAnnotations] = useState<AnnotationsType>({});
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    localStorage.setItem("annotations", JSON.stringify(annotations));
  }, [annotations]);

  // Simulate image loading delay
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300); // fake loading 300ms
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const currentImage = images[currentIndex];

  const handleAddPolygon = (points: number[][]) => {
    setAnnotations((prev) => ({
      ...prev,
      [currentImage]: [...(prev[currentImage] || []), points],
    }));
  };

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
      <h1
        className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center"
        tabIndex={0}
        aria-label="Image Annotation Tool Heading"
      >
        Image Annotation Tool
      </h1>

      {/* Thumbnail slider */}
      <div
        className="flex overflow-x-auto space-x-2 p-2 mb-6 border rounded bg-gray-100 dark:bg-gray-800"
        role="list"
        aria-label="Image thumbnails list"
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail image ${index + 1}`}
            className={`w-24 h-20 object-cover rounded cursor-pointer border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              currentIndex === index
                ? "border-blue-500 scale-105"
                : "border-transparent hover:scale-105"
            }`}
            onClick={() => setCurrentIndex(index)}
            draggable={false}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setCurrentIndex(index);
            }}
            role="listitem"
            aria-current={currentIndex === index ? "true" : undefined}
          />
        ))}
      </div>

      {/* Show loader while image is "loading" */}
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg border p-2 sm:p-4 md:p-6">
          <div className="relative w-full overflow-hidden">
            <ImageAnnotator
              imageSrc={currentImage}
              polygons={annotations[currentImage] || []}
              onAddPolygon={handleAddPolygon}
              onRemovePolygon={handleRemovePolygon}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Annotate;
