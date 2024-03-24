import React, { useEffect } from 'react';

const App = () => {
  const sendMessageToFlutter = () => {
    const dataToSend = { message: 'Hello from React!' }; // Example data
    window.flutterChannel.postMessage(JSON.stringify(dataToSend));
    console.log("Send Data to Flutter: ", dataToSend)
  };

  useEffect(() => {
    sendMessageToFlutter(); // Send data on component mount (or trigger based on your logic)
  }, []);

  return (
    <div>
      {/* Your React app content here */}
      <button onClick={sendMessageToFlutter}>Send Data to Flutter</button>
    </div>
  );
};

export default App;
