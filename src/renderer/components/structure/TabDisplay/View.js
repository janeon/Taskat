import React from 'react';
import ExTab from '../../tabs/ExTab';

// This begins as an empty container, but we will have a function that fills it 
// on tab clicks.  

const View = ({taskKey, deleteTaskOnClick}) => (
    <div className="displayContainer">
        <ExTab taskKey={taskKey} deleteTaskOnClick={deleteTaskOnClick}/>
    </div>
);

export default View;
