// React component sending data to Flutter WebView
import React from 'react';

function App() {
  // Define the Toaster object


  const sendDataToFlutter = () => {
    // Data to send to Flutter WebView
    // const data = {
    //   message: 'Hello from React!',
    //   someValue: 42,
    // };

    // // Send data to Flutter WebView
    // window.Toaster.postMessage(data, '*');
    var Toaster = {
      postMessage: function(message) {
        // Implementation of postMessage method
        console.log(message);
      }
    };
    
    // Now you can use the Toaster object
    Toaster.postMessage("Hello, world!");
  };

  return (
    <div>
      <button onClick={sendDataToFlutter}>Send Data to Flutter</button>
    </div>
  );
}

export default App;
