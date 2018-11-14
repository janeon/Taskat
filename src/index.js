import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';

// Grab a reference to the element from the div 
const appContainer = document.getElementById("appContainer")

// insert the result of App.render() into the container. 
ReactDOM.render(<App />, appContainer);