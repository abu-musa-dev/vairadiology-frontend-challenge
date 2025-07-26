import React, { useState, useEffect } from "react";
import ImageSlider from "../components/annotate/ImageSlider";
import ImageAnnotator from "../components/annotate/ImageAnnotator";

const images = [
  "/images/20872.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
  "/images/image4.jpg",
  "/images/image5.jpg",
  // আরও ইমেজ যোগ করো
];

type AnnotationsType = Record<string, number[][][]>;

const Annotate: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [annotations, setAnnotations] = useState<AnnotationsType>({});

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
      return {
        ...prev,
        [currentImage]: updatedPolygons,
      };
    });
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center">
        Image Annotation Tool
      </h1>

      {/* Image Slider */}
      <div className="w-full max-w-3xl mx-auto mb-6">
        <ImageSlider
          images={images}
          currentIndex={currentIndex}
          setIndex={setCurrentIndex}
        />
      </div>

      {/* Image Annotator */}
      <div className="bg-white shadow-md rounded-lg border p-2 sm:p-4 md:p-6">
        <div className="relative w-full overflow-hidden">
          <ImageAnnotator
            imageSrc={currentImage}
            polygons={annotations[currentImage] || []}
            onAddPolygon={handleAddPolygon}
            onRemovePolygon={handleRemovePolygon}
          />
        </div>
      </div>
    </div>
  );
};

export default Annotate;
