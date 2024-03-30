import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScanQR from './components/ScanQRCode';
import GenerateQR from './components/GenerateQR';
import {Confirm} from './components/Confirmbill';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GenerateQR />} /> {/* Home route */}
        <Route path="/scan" element={<ScanQR />} /> {/* QR code scanning route */}
        <Route path="/scan/confirm/:sign" element={<Confirm />} />
      </Routes>
    </Router>
  );
}

export default App;
