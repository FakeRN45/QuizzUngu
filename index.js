import React from 'react';
import ReactDOM from 'react-dom/client'; // Gunakan ReactDOM dari 'react-dom/client'
import './style/index.css';
import App from './App';

// Buat root dengan createRoot()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);