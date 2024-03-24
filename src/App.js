// React component sending data to Flutter WebView
import React from 'react';

function App() {
  const sendDataToFlutter = () => {
    // Data to send to Flutter WebView
    const data = {
      message: 'Hello from React!',
      someValue: 42,
    };

    // Send data to Flutter WebView
    window.Toaster.postMessage(data, '*');
  };

  return (
    <div>
      <button onClick={sendDataToFlutter}>Send Data to Flutter</button>
    </div>
  );
}

export default App;
