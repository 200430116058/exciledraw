"use client";
import { Excalidraw } from "@excalidraw/excalidraw";
import { useEffect, useRef, useState } from "react";

const ExcalidrawWrapper = ({ drawStates, setDrawStates, selectedDraw , TestData }) => {
  const prevElementsRef = useRef(drawStates[selectedDraw]);
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  useEffect(() => {
    // Save the previous state elements and files
    prevElementsRef.current = drawStates[selectedDraw];
  }, [selectedDraw, drawStates]);


  useEffect(()=>{

   const textContent = JSON.stringify(drawStates, null, 2); 
   const blob = new Blob([textContent], { type: "text/plain" }); // Create a Blob
    const fileUrl = URL.createObjectURL(blob); // Generate a URL for the Blob
    localStorage.setItem("drawStatesFileUrl", fileUrl);

    // Cleanup URL when component unmounts or drawStates change
    return () => {
      URL.revokeObjectURL(fileUrl); // Release memory by revoking the Blob URL
    };
  } , [drawStates])
  const handleChange = (elements) => {
    if (excalidrawAPI) {
      const currentElements = excalidrawAPI.getSceneElements();
      const currentFiles = excalidrawAPI.getFiles();

      
      const newState = {
        elements: currentElements,
        files: currentFiles,  // Store both elements and files
      };

    
      if (
        JSON.stringify(newState.elements) !== JSON.stringify(prevElementsRef.current.elements) ||
        JSON.stringify(newState.files) !== JSON.stringify(prevElementsRef.current.files)
      ) {
        setDrawStates((prev) => ({
          ...prev,
          [selectedDraw]: newState, // Save both elements and files in the state
        }));
      }
    }
  };
  console.log("DrawSta" , drawStates)

  return (
    <div style={{ height: "500px", width: "500px" }}>
      <Excalidraw
        key={selectedDraw} // Remount the component when selectedDraw changes
        initialData={{
          elements: drawStates[selectedDraw]?.elements || [], // Load elements for the selected instance
          files: drawStates[selectedDraw]?.files || [], // Include files for images
        }}
        onChange={(elements) => handleChange(elements)} // Handle changes to the Excalidraw elements
        excalidrawAPI={(api) => setExcalidrawAPI(api)} // Set the Excalidraw API reference
      />
    </div>
  );
};

export default ExcalidrawWrapper;
