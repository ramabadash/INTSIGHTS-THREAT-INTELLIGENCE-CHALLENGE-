import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { store } from './app/store';
/* ----- COMPONENTS ----- */
import App from './components/App';
/* ----- STYLE ----- */
import './index.css';

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
