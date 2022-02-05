import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Constants } from './utils/constants';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById(Constants.rootElement)
);