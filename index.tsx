import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* Fix: Removed the 'future' prop from BrowserRouter as it is no longer a valid prop in recent versions of react-router-dom, resolving the TypeScript error. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);