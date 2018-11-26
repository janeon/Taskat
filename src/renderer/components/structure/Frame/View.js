// Defining the layout of the Frame
import React from 'react';
import TaskList from '../TaskList';
import TaskDisplay from '../TaskDisplay';
import './Frame.css';

const View = ({model}) => (
    <div id="frame">
        <div className="tasklist">
        <TaskList model={model}></TaskList>
        </div>

        <TaskDisplay model={model}></TaskDisplay>
    </div>
);

export default View;
