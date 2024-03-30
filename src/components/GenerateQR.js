import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react'; // QR code generation library
function GenerateQR() {
  const [data, setData] = useState('');
  const inputRef = useRef(null); 
  const handleGenerate = () => {
    const enteredData = inputRef.current.value;
    setData(enteredData);
  };

  return (
    <div className="App">
      <h1>QR Code Generator & Scanner</h1>
      <div>
        <input type="text" ref={inputRef} placeholder="Enter data for QR code" />
        <button onClick={handleGenerate}>Generate QR Code</button>
        {data && (
        <div style={{margin:"20px 0 0 50px"}}>
          <QRCode value={data} size={100} level="H" /> 
          <br/>
        </div>
      )}
      </div>
      {/* <div> <button onClick={handleScan}>Scan QR Code</button></div> */}
      <h2><a href="/scan">Scan QR</a></h2>
    </div>
  );
}

export default GenerateQR;
