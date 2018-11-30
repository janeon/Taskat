// Defining the layout of the Frame
import React from 'react';
import TaskList from '../TaskList';
import TaskDisplay from '../TaskDisplay';
import DeleteButton from '../DeleteButton';
import './Frame.css';

const View = ({model}) => (
    <div id="frame">
        <TaskList model={model}/>
        <DeleteButton model={model}/>
        <TaskDisplay model={model}/>
    </div>

);

export default View;
