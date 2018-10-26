// Defining the layout of the Frame
import React from 'react';
import TaskList from '../TaskList';
import TaskDisplay from '../TaskDisplay';
import './Frame.css';

const View = () => (

    <div id="frame"> 
        <TaskList></TaskList>
        <TaskDisplay></TaskDisplay>
    </div>

);

export default View;