import React from 'react';
import TabList from '../TabList';
import TabDisplay from '../TabDisplay';
import './TaskDisplay.css';
import Calendar from 'react-calendar'

const View = ({}) => (

    <div id="taskdisplay">
        <TabList />
        <TabDisplay />
        <Calendar></Calendar>
    </div>

);

export default View;
