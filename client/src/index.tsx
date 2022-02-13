import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { store } from './app/store';
/* ----- COMPONENTS ----- */
import App from './components/App';
/* ----- STYLE ----- */
import './index.css';

export const BASE_URL = `http://localhost:8000`;

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <Router>
      <App />
    </Router>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);
