import React, { useState } from 'react';

const App = () => {
  const [dataToSend, setDataToSend] = useState('');

  const sendDataToFlutter = () => {
    // Assume 'flutterBridge' is the reference to the bridge object provided by the WebView.
    // You need to call a method 'sendDataToFlutter' on this object with data as a parameter.
    // This 'sendDataToFlutter' method should be implemented in the Flutter side to receive data.
    window.flutterBridge.sendDataToFlutter(dataToSend);
  };

  return (
    <div>
      <input
        type="text"
        value={dataToSend}
        onChange={(e) => setDataToSend(e.target.value)}
        placeholder="Type something..."
      />
      <button onClick={sendDataToFlutter}>Send Data to Flutter</button>
    </div>
  );
};

export default App;
