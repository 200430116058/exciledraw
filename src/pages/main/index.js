import dynamic from 'next/dynamic';
import useSWR from "swr";
import styles from '../../styles/main.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ExcalidrawWrapper = dynamic(
  async () => (await import('../../Components/wrapper')).default,
  {
    ssr: false
  }
);

export default function Page() {
  // html2canvas(element, { scale: 2 }).then((canvas) => {
  //   // Get original image dimensions
  //   const originalWidth = canvas.width;
  //   const originalHeight = canvas.height;

  //   // Calculate A3 aspect ratio (1.414)
  //   const a3AspectRatio = 1.414;

  //   // Calculate the new dimensions for A3
  //   let newWidth, newHeight;
    
  //   // Check if width or height needs to be adjusted
  //   if (originalWidth / originalHeight > a3AspectRatio) {
  //     newWidth = originalWidth;
  //     newHeight = originalWidth / a3AspectRatio;
  //   } else {
  //     newHeight = originalHeight;
  //     newWidth = originalHeight * a3AspectRatio;
  //   }

  //   // Create a new canvas to resize the image to A3 aspect ratio
  //   const resizedCanvas = document.createElement("canvas");
  //   const context = resizedCanvas.getContext("2d");
  //   resizedCanvas.width = newWidth;
  //   resizedCanvas.height = newHeight;

  //   // Draw the original image onto the new canvas with the new dimensions
  //   context.drawImage(canvas, 0, 0, originalWidth, originalHeight, 0, 0, newWidth, newHeight);

  //   // Convert resized canvas to image URL and download
  //   const link = document.createElement("a");
  //   link.download = "screenshot-a3.png";
  //   link.href = resizedCanvas.toDataURL("image/png");
  //   link.click();
  // });
  const [selectedDraw, setSelectedDraw] = useState(1);
  const [drawStates, setDrawStates] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
  });
  const [TestData , setTestData] = useState(null)
  const [fileUrl, setFileUrl] = useState(null); // State to store file URL

  const fetcher = (...args) => fetch(...args).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch the file");
    }
    return res.text(); // Use .text() for plain text or .json() for JSON
  });

  // Retrieve file URL from localStorage and update state
  useEffect(() => {
    const fileContent = localStorage.getItem("drawStatesFileUrl");
    if (fileContent) {
      setFileUrl(fileContent); // Set the file URL from localStorage
    }
  }, []);
  const dynamicFileUrl = 'https://raw.githubusercontent.com/200430116058/exciledraw/master/public/FIles/drawStates.json';

  // Construct the full URL with the dynamic file URL as a query parameter
  const apiUrl = `/api/proxyDrawData?fileUrl=${encodeURIComponent(dynamicFileUrl)}`;

  // Fetch the file content only if the fileUrl is available
  const { data, error } = useSWR(apiUrl, fetcher, {
 
    revalidateOnFocus: false, // Optional: Avoid refetching on focus
    shouldRetryOnError: false, // Optional: Avoid retrying the request on failure
  });

  

  const handleSave = ()=>{
    const textContent = JSON.stringify(drawStates, null, 2); 

    setDrawStates(textContent)

    localStorage.setItem("textContent" ,  textContent)
    localStorage.setItem("drawStates", textContent);

    // Create a Blob object with the text content (JSON)
    const blob = new Blob([textContent], { type: "application/json" });

    // Generate a URL for the Blob
    const fileUrl = URL.createObjectURL(blob);

    // Store the Blob URL in localStorage for future use (optional)
    localStorage.setItem("drawStatesFileUrl", fileUrl);

    // Optional: Automatically prompt the user to download the file
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "drawStates.json"; // File name
    link.click(); // Simulate download
  }
  useEffect(() => {
    if (data) {
      try {
        console.log("Fetched Data:", data);
  
        // Assuming the fetched data is a stringified JSON
        const parsedData = JSON.parse(data); // Parse JSON string into an object
  
       // Log the parsed data
  
        // Ensure the parsed data has all the required sections
        if (parsedData && parsedData["1"] && parsedData["2"] && parsedData["3"] && parsedData["4"]) {
          // Set the entire state for all sections
          console.log("Parsed Data:", parsedData['1']); 
          setDrawStates(parsedData); // Update all sections in the drawStates state
          setTestData(parsedData);
        } else {
          console.error("Fetched data format is incorrect");
        }
      } catch (error) {
        console.error("Error parsing fetched data:", error);
      }
    }
  }, [data]); // Dependency on data to trigger effect when data is fetched
   // Dependency on data to trigger effect when data is fetched
  
// useEffect(()=>{


//   const textContent = localStorage.getItem("textContent");
//   const parsedData = JSON.parse(textContent);
//   console.log("Parss",parsedData )
//   if (parsedData && parsedData["1"] && parsedData["2"] && parsedData["3"] && parsedData["4"]) {
//             // Set the entire state for all sections
//             setDrawStates(parsedData); // Update all sections in the drawStates state
           
//           } else {
//             console.error("Fetched data format is incorrect");
//           }

// } , [])
 

  const sidebarItems = [
    { id: 1, label: "Excalidraw 1" },
    { id: 2, label: "Excalidraw 2" },
    { id: 3, label: "Excalidraw 3" },
    { id: 4, label: "Excalidraw 4" },
  ];

  const handleSwitch = (id) => {
    setSelectedDraw(id);
  };

  return (
    <div className={styles.main}>

<button onClick={()=>handleSave()}>Save</button>
      <div className={styles.sidebar}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {sidebarItems.map((item) => (
            <li
              key={item.id}
              style={{
                margin: "10px 0",
                cursor: "pointer",
                fontWeight: item.id === selectedDraw ? "bold" : "normal",
              }}
              onClick={() => handleSwitch(item.id)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.draw}>
        {/* Pass the fetched data (or default states) to ExcalidrawWrapper */}
        <ExcalidrawWrapper
          setDrawStates={setDrawStates}
          drawStates={drawStates}
          selectedDraw={selectedDraw}
          TestData = {TestData}
        />
      </div>
    
    </div>
  );
}
