import React from 'react';
import NewTabButton from './NewTabButton';
import "./TabList.css";


const View = (model) => (
    <input id="deleteButton"  value="Delete Task" onClick={model.deleteTask()}/>
);

export default View;