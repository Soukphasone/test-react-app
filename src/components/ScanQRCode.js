import React, { useState, useRef, useEffect } from 'react';
import * as QrScanner from 'jsqr'; // QR code scanning library
import { useNavigate } from 'react-router-dom';
function ScanQR() {
    const [data, setData] = useState(''); // State for QR code data
    const [scannedData, setScannedData] = useState(''); // State for scanned data
    const [isConsistent, setIsConsistent] = useState(false); // State for data consistency
    const scannerRef = useRef(null); // Ref for video element
    const navigate = useNavigate();
    // Function to start QR code scanning
    useEffect(() => {
        handleScan();
    }, []);
    const handleScan = async () => {
        try {
            const video = scannerRef.current;
            // const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } }); // Specify rear camera
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
                        navigate(`/scan/confirm/${code.data}`); 
                    }
                  
                }, 100); // Check for QR code every 100 milliseconds
            };
        } catch (error) {
        }
    };
    const compareData = () => {
        setIsConsistent(data === scannedData);
    };
    return (
        <div className="App">
            <div>
                <div style={{ textAlign: "center", justifyContent: "center" }}>
                    <video ref={scannerRef} autoPlay muted width="500" height="500" />
                    {/* <div> <button onClick={handleScan}>Scan QR Code</button></div> */}
                    <br/>
                    <div> <a href="/">Back to GenerateQR</a></div>
                    {scannedData && (
                <div>
                    <p>Scanned Data: {scannedData}</p>
                    <p>{isConsistent ? 'Data is consistent!' : 'Data is not consistent.'}</p>
                </div>
            )}
                </div>
               
            </div>
           
        </div>
    );
}

export default ScanQR;
