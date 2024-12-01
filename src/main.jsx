// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import { Provider } from 'react-redux'; // Import the Provider from react-redux
import { store } from './store/store'; // Named import of store
import App from './App'; // Import your App component
import './index.css'; // Ensure global styles are applied
import './tailwind.css';


const root = ReactDOM.createRoot(document.getElementById('root')); // React 18 syntax
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
