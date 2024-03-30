import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react'; // QR code generation library
import * as QrScanner from 'jsqr'; // QR code scanning library

function App() {
  const [data, setData] = useState(''); // State for QR code data
  const [scannedData, setScannedData] = useState(''); // State for scanned data
  const [isConsistent, setIsConsistent] = useState(false); // State for data consistency
  const inputRef = useRef(null); // Ref for input field
  const scannerRef = useRef(null); // Ref for video element

  // Function to generate QR code
  const handleGenerate = () => {
    const enteredData = inputRef.current.value;
    setData(enteredData);
  };

  // Function to start QR code scanning
  const handleScan = async () => {
    try {
      const video = scannerRef.current;
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;

      video.onplay = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const interval = setInterval(() => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
          const code = QrScanner(imageData, canvas.width, canvas.height);
          if (code) {
            clearInterval(interval);
            setScannedData(code.data);
            video.srcObject.getTracks().forEach((track) => track.stop());
            compareData();
          }
        }, 100); // Check for QR code every 100 milliseconds
      };
    } catch (error) {
      console.error('Error accessing camera:', error);
      // Handle errors gracefully, e.g., display an error message
    }
  };

  // Function to compare generated and scanned data
  const compareData = () => {
    setIsConsistent(data === scannedData);
  };
  return (
    <div className="App">
      <h1>QR Code Generator & Scanner</h1>
      <div>
        <input type="text" ref={inputRef} placeholder="Enter data for QR code" />
        <button onClick={handleGenerate}>Generate QR Code</button>
      </div>
      <br/>
      {data && (
        <div style={{marginLeft:"50px"}}>
          <QRCode value={data} size={50} level="H" /> 
        </div>
      )}
      <div>
        <video ref={scannerRef} autoPlay muted width="300" height="200" />
        <button onClick={handleScan}>Scan QR Code</button>
      </div>
      {scannedData && (
        <div>
          <p>Scanned Data: {scannedData}</p>
          <p>{isConsistent ? 'Data is consistent!' : 'Data is not consistent.'}</p>
        </div>
      )}
    </div>
  );
}

export default App;
