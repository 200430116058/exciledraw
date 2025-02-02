"use client";
import { Excalidraw, convertToExcalidrawElements } from "@excalidraw/excalidraw";



const ExcalidrawWrapper = () => {
  console.info(convertToExcalidrawElements([{
    type: "rectangle",
    id: "rect-1",
    width: 186.47265625,
    height: 141.9765625,
  },]));
  return (
    <div style={{height:"500px", width:"500px"}}>
  <Excalidraw
   // Remount the component when selectedDraw changes
  initialData={{
    elements: [
      {
        type: "text", // Text element
        version: 1,
        versionNonce: 361174001,
        isDeleted: false,
        id: "initialTextBox", // Unique ID
        fillStyle: "solid", // Solid fill style
        strokeStyle: "solid", // Solid border style
        strokeWidth: 2, // Border thickness
        roughness: 0, // Smooth border
        opacity: 100,
        angle: 0,
        x: 0, // x-position
        y: 0, // y-position
        strokeColor: "#000000", // Border color
        backgroundColor: "#ffffff", // Background color
        width: 200, // Fixed width
        height: 100, // Fixed height
        containerWidth: 200, // Enforce fixed width for text wrapping
        seed: 123456789,
        groupIds: [],
        boundElementIds: null,
        text: "Your text here", // Initial text content
        fontSize: 20,
        fontFamily: 1,
        textAlign: "center",
        verticalAlign: "middle",
        baseline: 18,
      },
    ],
   // Auto-scroll to content
  }}
  onChange={(elements) => {
    const updatedElements = elements.map((element) => {
      if (element.id === "initialTextBox" && element.type === "text") {
        // Enforce fixed width for text wrapping
        return {
          ...element,
          containerWidth: 200,
          width: 200,
        };
      }
      return element;
    });

     // Pass updated elements to the state handler
  }}
   // Set Excalidraw API reference
/>


    </div>
  );
};
export default ExcalidrawWrapper;