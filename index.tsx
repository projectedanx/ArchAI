
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * The root DOM element where the React application mounts.
 * @type {HTMLElement | null}
 */
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

/**
 * Initializes the React root rendering environment.
 * @type {ReactDOM.Root}
 */
const root = ReactDOM.createRoot(rootElement);
/**
 * Renders the main App component within React.StrictMode.
 */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);