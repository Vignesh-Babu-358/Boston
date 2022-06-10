import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Auth from './auth'
import Receipt from './receipt';
import reportWebVitals from './reportWebVitals';

const route = (
  <Router>
    <div>
      <Route exact path="/" component={Auth} />
      <Route path="/cred" component={App} />
    </div>
  </Router>
)

ReactDOM.render(route, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
