/*
 * The entry point for the renderer processes (the React app)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import "typeface-roboto";
import "typeface-oswald";

// Grab a reference to the element from the div 
const appContainer = document.getElementById("app");

// insert the result of App.render() into the container. 
ReactDOM.render(<App />, appContainer);