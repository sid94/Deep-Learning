import React from 'react';
import ReactDOM from 'react-dom';
import TweetWidget from './TweetWidget';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './styles/style.css'

ReactDOM.render(
  <TweetWidget/>,
  document.getElementById('root')
);