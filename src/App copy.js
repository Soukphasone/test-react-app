import React, { useState, useEffect, useRef } from 'react';

function ReactApp() {
  const [dataToSend, setDataToSend] = useState('Hello from React!');
  const webViewRef = useRef(null);

  useEffect(() => {
    const injectDataToWebView = async () => {
      if (webViewRef.current) {
        try {
          await webViewRef.current.contentWindow.postMessage(dataToSend, '*'); // Allow any origin for communication
          console.log('Data sent to Flutter WebView:', dataToSend);
        } catch (error) {
          console.error('Error sending data:', error);
        }
      }
    };

    injectDataToWebView();
  }, [dataToSend]);

  const handleDataChange = (event) => {
    setDataToSend(event.target.value);
  };

  return (
    <div>
      <input type="text" value={dataToSend} onChange={handleDataChange} />
      <iframe ref={webViewRef}/>
    </div>
  );
}

export default ReactApp;
