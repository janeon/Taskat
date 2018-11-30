import React from 'react';
import "./TabList.css";


const View = (model) => (
    <input id="deleteButton"  value="Delete Task" onClick={model.deleteTask()}/>
);

export default View;