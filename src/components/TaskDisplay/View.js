import React from 'react';
import TabList from '../TabList';
import TabDisplay from '../TabDisplay';
import './TaskDisplay.css';

import 'react-big-calendar/lib/css/react-big-calendar.css'

const View = props => {

  return (
    <div id="taskdisplay">
      <TabList />
      <TabDisplay />

    </div>)}

export default View;
