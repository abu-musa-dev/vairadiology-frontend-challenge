import React, { useRef, useEffect, useState } from "react";

interface ImageAnnotatorProps {
  imageSrc: string;                // URL of the image to annotate
  polygons: number[][][];          // List of polygons (each polygon is an array of points)
  onAddPolygon: (points: number[][]) => void;     // Callback to add a new polygon
  onRemovePolygon: (polygonIndex: number) => void; // Callback to remove a polygon by index
}

const ImageAnnotator: React.FC<ImageAnnotatorProps> = ({
  imageSrc,
  polygons,
  onAddPolygon,
  onRemovePolygon,
}) => {
  // References to the canvas and image DOM elements
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // State to store the canvas size (in pixels)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // Points of the polygon currently being drawn
  const [currentPolygon, setCurrentPolygon] = useState<number[][]>([]);

  // Index of the currently selected polygon (for deletion)
  const [selectedPolygonIndex, setSelectedPolygonIndex] = useState<number | null>(null);

  // Set canvas size to the natural size of the loaded image
  useEffect(() => {
    if (imageRef.current) {
      const img = imageRef.current;
      setCanvasSize({ width: img.naturalWidth, height: img.naturalHeight });
    }
    setCurrentPolygon([]);           // Clear current drawing on image change
    setSelectedPolygonIndex(null);   // Clear any selected polygon
  }, [imageSrc]);

  // Draw the image and polygons on the canvas whenever related state changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the base image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Draw existing polygons
    polygons.forEach((polygon, index) => {
      ctx.beginPath();
      polygon.forEach(([x, y], i) => {
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();

      // Highlight selected polygon in red, others in blue
      if (index === selectedPolygonIndex) {
        ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
      } else {
        ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 1;
      }
      ctx.fill();
      ctx.stroke();
    });

    // Draw the polygon currently being created
    if (currentPolygon.length > 0) {
      ctx.beginPath();
      currentPolygon.forEach(([x, y], i) => {
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = "green";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw small circles at each vertex point
      currentPolygon.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "green";
        ctx.fill();
      });
    }
  }, [polygons, currentPolygon, selectedPolygonIndex, canvasSize]);

  // Helper function to convert mouse event coordinates to canvas coordinates
  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();

    // Calculate scale ratio between canvas CSS size and actual pixel size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // Map mouse position to canvas coordinate system
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    return { x, y };
  };

  // Handle canvas click to add points or clear selection
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedPolygonIndex !== null) {
      // If a polygon is selected, deselect it on click
      setSelectedPolygonIndex(null);
      return;
    }

    const pos = getMousePos(e);
    if (!pos) return;

    // Add clicked point to the current polygon in progress
    setCurrentPolygon((prev) => [...prev, [pos.x, pos.y]]);
  };

  // Handle double-click to select a polygon if clicked inside it
  const handleCanvasDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);
    if (!pos) return;

    // Find polygon containing the clicked point using ray-casting algorithm
    const foundIndex = polygons.findIndex((polygon) =>
      pointInPolygon([pos.x, pos.y], polygon)
    );

    if (foundIndex !== -1) {
      setSelectedPolygonIndex(foundIndex);
      setCurrentPolygon([]); // Clear any polygon currently being drawn
    } else {
      setSelectedPolygonIndex(null);
    }
  };

  // Ray-casting algorithm to determine if a point lies inside a polygon
  function pointInPolygon(point: number[], vs: number[][]) {
    const [x, y] = point;
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      const xi = vs[i][0],
        yi = vs[i][1];
      const xj = vs[j][0],
        yj = vs[j][1];

      const intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  // Complete the current polygon drawing and add it to polygons
  const finishPolygon = () => {
    if (currentPolygon.length < 3) {
      alert("Polygon must have at least 3 points");
      return;
    }
    onAddPolygon(currentPolygon);
    setCurrentPolygon([]);
  };

  // Delete the currently selected polygon
  const deleteSelectedPolygon = () => {
    if (selectedPolygonIndex !== null) {
      onRemovePolygon(selectedPolygonIndex);
      setSelectedPolygonIndex(null);
    }
  };

  // Clear the current polygon drawing in progress
  const clearCurrentDrawing = () => {
    setCurrentPolygon([]);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white max-w-full overflow-auto">
      {/* Hidden image used to determine natural size */}
      <img
        ref={imageRef}
        src={imageSrc}
        alt="Annotate"
        className="hidden"
        draggable={false}
        onLoad={() => {
          if (imageRef.current) {
            setCanvasSize({
              width: imageRef.current.naturalWidth,
              height: imageRef.current.naturalHeight,
            });
          }
        }}
      />

      {/* Canvas element where image and polygons are drawn */}
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="border border-gray-300 rounded cursor-crosshair max-w-full"
        onClick={handleCanvasClick}
        onDoubleClick={handleCanvasDoubleClick}
      />

      {/* Action buttons for finishing, deleting, and clearing polygons */}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={finishPolygon}
          disabled={currentPolygon.length < 3}
          className={`px-4 py-2 rounded ${
            currentPolygon.length < 3
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          Finish Polygon
        </button>

        <button
          onClick={deleteSelectedPolygon}
          disabled={selectedPolygonIndex === null}
          className={`px-4 py-2 rounded ${
            selectedPolygonIndex === null
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
        >
          Delete Selected Polygon
        </button>

        <button
          onClick={clearCurrentDrawing}
          disabled={currentPolygon.length === 0}
          className="px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-500 text-white"
        >
          Clear Current Drawing
        </button>
      </div>
    </div>
  );
};

export default ImageAnnotator;