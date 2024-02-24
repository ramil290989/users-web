import React from 'react';
import ReactDOM from 'react-dom/client';
import Init from './Init.jsx';
import reportWebVitals from './reportWebVitals.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Init />
  </React.StrictMode>,
);

reportWebVitals();
